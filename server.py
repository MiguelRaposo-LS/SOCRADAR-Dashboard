"""Azores Cyber 360 — servidor.

Existe para quatro coisas: guardar a chave do Cortex longe do browser, falar
com o XSIAM, dar ao ecrã endpoints simples, e servir os ficheiros estáticos.
Tudo, incluindo os estáticos, atrás de uma palavra-passe partilhada.

Corre num só processo (ver README): a sincronização é uma thread, e vários
workers seriam várias threads a gastar o limite de pedidos da API em dobro.
"""
from __future__ import annotations

import hmac
import logging
import os
import sys
import threading
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, Response, jsonify, request, send_from_directory

import aggregate as agg
from briefing import Briefing
from store import Store, now_ms
from xsiam_dashboards import DashboardRunner
from command_center import CommandCenter

log = logging.getLogger("azores-cyber-360")
PUBLIC = Path(__file__).resolve().parent / "public"


def _env_bool(name: str, default: bool) -> bool:
    v = os.environ.get(name)
    return default if v is None else v.strip().lower() not in ("0", "false", "no", "off", "")


def build_source():
    if _env_bool("DEMO_MODE", False):
        from demo import DemoSource
        log.warning("MODO DE DEMONSTRAÇÃO: os dados são inventados.")
        return DemoSource(), True
    from cortex_client import CortexClient
    missing = [k for k in ("CORTEX_API_URL", "CORTEX_API_KEY", "CORTEX_API_KEY_ID")
               if not os.environ.get(k)]
    if missing:
        raise SystemExit("Falta configurar: " + ", ".join(missing)
                         + ". Copia .env.example para .env, ou usa DEMO_MODE=1.")
    verify = _env_bool("CORTEX_TLS_VERIFY", True)
    if not verify:
        log.warning("Verificação TLS do XSIAM DESATIVADA.")
    return CortexClient(os.environ["CORTEX_API_URL"], os.environ["CORTEX_API_KEY"],
                        os.environ["CORTEX_API_KEY_ID"], os.environ.get("CORTEX_AUTH", "standard"),
                        verify_tls=verify), False


def create_app(source=None, demo: bool = False, start_sync: bool = True) -> Flask:
    password = os.environ.get("DASHBOARD_PASSWORD", "")
    if not password:
        # Sem palavra-passe o ecrã publicava casos, hosts e utilizadores do GRA
        # a quem estivesse na rede. Não se arranca assim.
        raise SystemExit("DASHBOARD_PASSWORD não está definida.")
    if source is None:
        source, demo = build_source()

    store = Store(source,
                  max_incident_pages=int(os.environ.get("MAX_INCIDENT_PAGES", 200)),
                  max_alert_pages=int(os.environ.get("MAX_ALERT_PAGES", 300)))
    brief = Briefing(os.environ.get("OLLAMA_URL") or "http://localhost:11434",
                     os.environ.get("OLLAMA_MODEL") or "llama3.2:3b",
                     timeout=int(os.environ.get("OLLAMA_TIMEOUT", 120)))
    top_n = int(os.environ.get("TOP_ALERTS", 10))

    app = Flask(__name__, static_folder=None)
    app.config["store"], app.config["briefing"] = store, brief

    # Um ecrã de parede sem ninguém ao lado não pode ficar parado na janela de
    # login depois de cada arranque, e o browser não aceita a palavra-passe no
    # URL (os fetch falham). Com DASHBOARD_LOCAL_NO_AUTH=1, o próprio PC
    # (127.0.0.1) entra sem palavra-passe; o resto da rede continua a
    # precisar dela. O waitress não usa X-Forwarded-For, por isso o endereço
    # é o da ligação — mas NÃO ligar isto com um proxy na mesma máquina: aí
    # todos os pedidos pareceriam locais.
    local_no_auth = _env_bool("DASHBOARD_LOCAL_NO_AUTH", False)
    if local_no_auth:
        log.warning("DASHBOARD_LOCAL_NO_AUTH ativo: pedidos de 127.0.0.1 entram sem palavra-passe.")

    @app.before_request
    def require_password():
        if local_no_auth and request.remote_addr in ("127.0.0.1", "::1"):
            return None
        auth = request.authorization
        given = (auth.password or "") if auth else ""
        if not hmac.compare_digest(given.encode(), password.encode()):
            return Response("Autenticação necessária.", 401,
                            {"WWW-Authenticate": 'Basic realm="Azores Cyber 360 - SOC RADAR", charset="UTF-8"'})

    @app.after_request
    def no_cache_api(resp):
        if request.path.startswith("/api/"):
            resp.headers["Cache-Control"] = "no-store"
        return resp

    def meta(payload: dict) -> dict:
        payload["demo"] = demo
        payload["server_time"] = now_ms()
        # Antes da primeira sincronização o estado está vazio, e vazio lê-se
        # como «0 casos críticos». O ecrã usa isto para mostrar «a aguardar».
        payload["synced"] = store.last_ok is not None
        return payload

    @app.get("/api/ping")
    def ping():
        return jsonify(meta({"ok": True}))

    @app.get("/api/status")
    def status():
        return jsonify(meta(store.status()))

    def metrics_meta(out: dict, m_at) -> dict:
        # As métricas XQL são de 15 em 15 min: o painel diz de quando são, e
        # «a carregar» enquanto a primeira consulta não chegou (em vez de zeros).
        out["metrics_at"] = m_at
        out["incomplete"] = m_at is None
        return out

    @app.get("/api/summary")
    def summary():
        inc, al, _ = store.snapshot()
        inc = agg.without_noise(inc)          # sem os casos só da firewall (aggregate.is_noise)
        m, m_at = store.metrics_snapshot()
        now = now_ms()
        resolved = m["resolved"] if m else None
        with store.lock:
            backlog = {"count": store.backlog, "at": store.backlog_at}
        # Os cartões contam os casos abertos criados hoje (meia-noite dos
        # Açores); o total da janela de 90 dias vai no texto pequeno. Pedido do
        # Miguel a 2026-09-30: os 90 dias liam-se como «agora».
        today0 = agg.local_midnight_ms(now_ms())
        return jsonify(meta({"severity": agg.severity_counts(inc, since=today0),
                             "open_window": sum(1 for i in inc if agg.is_open(i)),
                             "backlog": backlog,
                             "prevention": agg.prevention(resolved, al, now),
                             "mttr": agg.mttr(resolved),
                             "metrics_at": m_at,
                             "status": store.status(now)}))

    @app.get("/api/incidents")
    def incidents():
        rng = request.args.get("range", "7d")
        if rng not in agg.RANGES:
            return jsonify({"error": f"range tem de ser um de {list(agg.RANGES)}"}), 400
        m, m_at = store.metrics_snapshot()
        out = agg.volume(m["volume"] if m else [], rng, now_ms())
        out["truncated"] = False
        return jsonify(meta(metrics_meta(out, m_at)))

    @app.get("/api/cases")
    def cases():
        inc, al, extra = store.snapshot()
        with store.lock:
            denied = set(store.denied)
        return jsonify(meta({"cases": agg.case_rows(inc, extra, now_ms(), store.cases_limit, al, denied),
                             "open_total": len(agg.table_cases(inc, now_ms())),
                             "window_days": agg.CASES_WINDOW_MS // agg.DAY,
                             "truncated": store.status()["truncated"]["incidents"]}))

    @app.get("/api/mitre")
    def mitre():
        m, m_at = store.metrics_snapshot()
        out = agg.mitre(m["tactics"] if m else [], m["techniques"] if m else [], now_ms())
        out["truncated"] = False
        return jsonify(meta(metrics_meta(out, m_at)))

    @app.get("/api/top-alerts")
    def top_alerts():
        _, al, _ = store.snapshot()
        return jsonify(meta({"alerts": agg.top_alerts(al, now_ms(), top_n),
                             "truncated": store.status()["truncated"]["alerts"]}))

    @app.get("/api/radar")
    def radar():
        m, m_at = store.metrics_snapshot()
        return jsonify(meta(metrics_meta(agg.radar(m["tactics"] if m else [], now_ms()), m_at)))

    # Dashboards do XSIAM exportados da consola (ver xsiam_dashboards.py).
    dash_dir = Path(os.environ.get("XSIAM_DASHBOARDS_DIR") or Path(__file__).resolve().parent / "dashboards")
    runner = DashboardRunner(source, dash_dir)
    app.config["dashboards"] = runner

    cc = CommandCenter(source, store)
    app.config["command_center"] = cc

    @app.get("/api/command-center")
    def command_center():
        return jsonify(meta(cc.payload()))

    @app.get("/api/paineis")
    def paineis():
        return jsonify(meta({"dashboards": runner.listing(), "folder": dash_dir.name}))

    @app.get("/api/paineis/<did>")
    def painel(did):
        d = runner.dashboard(did)
        if d is None:
            return jsonify({"error": "dashboard não encontrado"}), 404
        return jsonify(meta(d))

    @app.get("/api/briefing")
    def briefing():
        # Só lê o último gerado: o Ollama nunca é chamado a partir de um pedido.
        return jsonify(meta(brief.payload()))

    @app.get("/")
    def index():
        return send_from_directory(PUBLIC, "index.html")

    @app.get("/<path:name>")
    def static_files(name):
        return send_from_directory(PUBLIC, name)

    if start_sync:
        interval = int(os.environ.get("SYNC_INTERVAL_SECONDS", 60))
        # O estado sobrevive a reinícios: sem isto, cada reinício deixava o
        # ecrã vazio ~2 min e sem briefing ~6 min (diagnóstico de 2026-09-30).
        state_dir = Path(os.environ.get("STATE_DIR") or Path(__file__).resolve().parent / "estado")
        state_file, brief_file = state_dir / "estado.json.gz", state_dir / "briefing.json"
        store.load(state_file)
        brief.load(brief_file)

        def persist():
            try:
                store.save(state_file)
                brief.save(brief_file)
            except Exception as exc:  # noqa: BLE001 — gravar nunca derruba a sincronização
                log.warning("Não foi possível gravar o estado (%s).", type(exc).__name__)

        import atexit
        import signal
        atexit.register(persist)
        # Parar o serviço tem de gravar o estado. O systemd manda SIGTERM; o
        # NSSM, no Windows, manda Ctrl+C (SIGINT) e, a seguir, Ctrl+Break.
        # Nenhum deles corre os atexit por si: converte-se cada um numa saída
        # normal. SIGINT explícito porque, se o processo o herdar ignorado
        # (arranque em segundo plano), o Python nem instala o seu.
        def _stop(*_):
            sys.exit(0)
        for name in ("SIGTERM", "SIGINT", "SIGBREAK"):
            if hasattr(signal, name):
                signal.signal(getattr(signal, name), _stop)

        def loop():
            import time
            last_save = 0.0
            while True:
                store.sync_once()
                if time.time() - last_save >= 300:
                    persist()
                    last_save = time.time()
                # Durante a recolha inicial as fases seguem-se logo umas às
                # outras; depois, uma vez por intervalo.
                time.sleep(1 if store.stages else interval)

        threading.Thread(target=loop, name="sync", daemon=True).start()

        def briefing_loop():
            # Uma thread à parte: um modelo local pode levar dezenas de
            # segundos, e a sincronização não pode ficar à espera dele.
            import time
            from datetime import datetime, timedelta

            def generate():
                inc, al, _ = store.snapshot()
                m, _ = store.metrics_snapshot()
                return brief.generate(inc, al, m, now_ms())

            # No arranque, sem esperar pela hora certa — senão o painel ficava
            # vazio até lá. Mas só com a recolha inicial completa: com os
            # alertas ainda a carregar, o modelo recebia «0 ameaças
            # bloqueadas», que é falso (visto a 2026-09-30).
            # E depois de uma sincronização deste processo: um estado retomado
            # do disco é de antes do reinício.
            while not (store.fresh and store.stages == [] and store.metrics_snapshot()[0]):
                time.sleep(5)
            ok = generate()
            while True:
                # À hora certa dos Açores (08:00, 09:00…), e não 60 min depois
                # da última: o «gerado às» fica sempre em horas redondas.
                now = datetime.now(agg.TZ)
                nxt = (now + timedelta(hours=1)).replace(minute=0, second=0, microsecond=0)
                # Depois de uma falha, outra vez daqui a 5 min, sem esperar
                # pela hora. No Windows o Ollama só arranca quando alguém
                # inicia sessão — depois do serviço —, e o briefing ficava
                # «por regras» até à hora seguinte.
                if not ok:
                    nxt = min(nxt, now + timedelta(minutes=5))
                time.sleep(max(1, (nxt - datetime.now(agg.TZ)).total_seconds()))
                ok = generate()

        threading.Thread(target=briefing_loop, name="briefing", daemon=True).start()

        reconcile_s = int(os.environ.get("RECONCILE_MINUTES", 30)) * 60

        def reconcile_loop():
            # À parte da sincronização de cada minuto: a lista completa e a
            # contagem do histórico levam ~2 min e não podem atrasá-la.
            import time
            while store.stages != []:
                time.sleep(5)
            while True:
                store.reconcile()
                store.reconcile_alerts()
                time.sleep(reconcile_s)

        threading.Thread(target=reconcile_loop, name="reconcile", daemon=True).start()
        threading.Thread(target=runner.run_forever, name="paineis", daemon=True).start()
        threading.Thread(target=cc.run_forever, name="command-center", daemon=True).start()
    return app


def main():
    load_dotenv()
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    app = create_app()
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", 8360))
    from waitress import serve
    log.info("Azores Cyber 360 - SOC RADAR em http://%s:%d", host, port)
    serve(app, host=host, port=port, threads=8)


if __name__ == "__main__":
    main()
