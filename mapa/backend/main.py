"""Mapa de ataques — Azores Cyber 360.

Adaptado de https://github.com/zethw0w/ddos-attack-map (MIT). Do original
fica o globo 3D e o WebSocket. Saiu o que enviava IPs para fora (AbuseIPDB,
Cloudflare Radar), o que inventava dados (localização e pontuação simuladas,
ataques aleatórios no frontend) e os modelos .joblib (pickles de terceiros,
que executam código ao carregar). Os ataques vêm da Cloudflare, pelo XSIAM
(ver feed.py).

Escuta só em 127.0.0.1, como o Azores Cyber 360: abre-o a TV, mais ninguém.
O original escutava em toda a rede, sem autenticação, e exportava todos os
IPs em CSV.
"""
from __future__ import annotations

import asyncio
import logging
import os
import time
from collections import Counter, deque
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles

from feed import JANELA_MS, Feed
from xsiam import XsiamClient, XsiamError

RAIZ = Path(__file__).resolve().parent.parent
DIST = RAIZ / "frontend" / "app" / "dist"
log = logging.getLogger("mapa")

HISTORICO = 300          # ataques mandados a quem abre a página
RESUMO_MIN = 60          # o resumo cobre a última hora


class Estado:
    """O que o servidor sabe agora: ataques recentes, resumo por minuto e
    as ligações abertas."""

    def __init__(self):
        self.recentes: deque[dict] = deque(maxlen=HISTORICO)
        self.minutos: deque[dict] = deque(maxlen=RESUMO_MIN)   # um resumo por minuto lido
        self.clientes: set[WebSocket] = set()
        self.erro: str | None = None
        self.ultimo_ok: int | None = None

    def juntar_minuto(self, janela: tuple[int, int], ataques: list[dict]) -> None:
        sev, paises, hosts = Counter(), Counter(), Counter()
        for a in ataques:
            sev[a["severity"]] += a["count"]
            paises[a["source"]["country"] or "??"] += a["count"]
            hosts[a["target"]["city"] or "?"] += a["count"]
        self.minutos.append({"de": janela[0], "ate": janela[1], "sev": sev, "paises": paises,
                             "hosts": hosts, "ips": {a["source"]["ip"] for a in ataques}})

    def resumo(self) -> dict:
        sev, paises, hosts, ips = Counter(), Counter(), Counter(), set()
        for m in self.minutos:
            sev.update(m["sev"])
            paises.update(m["paises"])
            hosts.update(m["hosts"])
            ips |= m["ips"]
        return {
            "de": self.minutos[0]["de"] if self.minutos else None,
            "ate": self.minutos[-1]["ate"] if self.minutos else None,
            "minutos": len(self.minutos),
            "total": sum(sev.values()),
            "ips": len(ips),
            "n_paises": len(paises),
            "severidade": {k: sev.get(k, 0) for k in ("critical", "high", "medium", "low")},
            "paises": paises.most_common(8),
            "hosts": hosts.most_common(5),
        }

    def estado(self) -> dict:
        return {"ok": self.erro is None and self.ultimo_ok is not None, "erro": self.erro,
                "ultimo_ok": self.ultimo_ok}

    async def enviar(self, msg: dict) -> None:
        mortos = []
        for ws in list(self.clientes):
            try:
                await ws.send_json(msg)
            except Exception:  # noqa: BLE001 — uma ligação caída não pára as outras
                mortos.append(ws)
        for ws in mortos:
            self.clientes.discard(ws)


async def ler_xsiam(feed: Feed, est: Estado, fila: asyncio.Queue) -> None:
    """Lê um minuto de cada vez, logo que esteja completo."""
    while True:
        try:
            res = await asyncio.to_thread(feed.ler)
        except XsiamError as exc:
            log.warning("XSIAM: %s", exc)
            est.erro = str(exc)
            await est.enviar({"type": "estado", "data": est.estado()})
            await asyncio.sleep(30)
            continue
        except Exception as exc:  # noqa: BLE001 — o mapa nunca morre por um erro
            log.exception("Erro inesperado a ler o XSIAM")
            est.erro = type(exc).__name__
            await est.enviar({"type": "estado", "data": est.estado()})
            await asyncio.sleep(30)
            continue
        if res is None:
            await asyncio.sleep(5)
            continue
        janela, ataques = res
        est.erro, est.ultimo_ok = None, int(time.time() * 1000)
        est.juntar_minuto(janela, ataques)
        quota = getattr(feed.client, "last_quota", None)
        log.info("Minuto %s UTC: %d ataque(s)%s.", time.strftime("%H:%M", time.gmtime(janela[0] / 1000)),
                 len(ataques), f", quota restante {quota:.2f}" if isinstance(quota, (int, float)) else "")
        await est.enviar({"type": "stats", "data": est.resumo()})
        await est.enviar({"type": "estado", "data": est.estado()})
        await fila.put((janela, ataques))


async def reproduzir(est: Estado, fila: asyncio.Queue) -> None:
    """Manda cada ataque à hora a que aconteceu, dentro do seu minuto, para o
    mapa ter o ritmo real. Com minutos em atraso na fila, toca-os mais
    depressa para apanhar o presente."""
    while True:
        janela, ataques = await fila.get()
        dur = JANELA_MS / 1000 / (1 + fila.qsize())
        inicio = time.monotonic()
        for a in ataques:
            alvo = inicio + (a["t"] - janela[0]) / JANELA_MS * dur
            espera = alvo - time.monotonic()
            if espera > 0:
                await asyncio.sleep(espera)
            est.recentes.append(a)
            await est.enviar({"type": "attack", "data": a})
        resto = inicio + dur - time.monotonic()
        if resto > 0 and fila.empty():
            await asyncio.sleep(resto)


def criar_app(cliente=None) -> FastAPI:
    load_dotenv(RAIZ / ".env")
    if cliente is None:
        falta = [k for k in ("CORTEX_API_URL", "CORTEX_API_KEY", "CORTEX_API_KEY_ID") if not os.environ.get(k)]
        if falta:
            raise SystemExit("Falta configurar no .env: " + ", ".join(falta))
        cliente = XsiamClient(os.environ["CORTEX_API_URL"], os.environ["CORTEX_API_KEY"],
                              os.environ["CORTEX_API_KEY_ID"], os.environ.get("CORTEX_AUTH", "standard"),
                              verify_tls=os.environ.get("CORTEX_TLS_VERIFY", "true").lower() != "false")
    est, feed = Estado(), Feed(cliente)

    @asynccontextmanager
    async def ciclo(app: FastAPI):
        fila: asyncio.Queue = asyncio.Queue()
        tarefas = [asyncio.create_task(ler_xsiam(feed, est, fila)),
                   asyncio.create_task(reproduzir(est, fila))]
        yield
        for t in tarefas:
            t.cancel()

    # Sem /docs nem /openapi.json: não há API para outros usarem.
    app = FastAPI(title="Mapa de ataques", lifespan=ciclo, docs_url=None, redoc_url=None, openapi_url=None)
    app.state.estado, app.state.feed = est, feed

    @app.get("/api/estado")
    async def estado():
        return JSONResponse({**est.estado(), "resumo": est.resumo()})

    @app.websocket("/ws/attacks")
    async def ws_ataques(ws: WebSocket):
        await ws.accept()
        est.clientes.add(ws)
        try:
            await ws.send_json({"type": "estado", "data": est.estado()})
            await ws.send_json({"type": "stats", "data": est.resumo()})
            await ws.send_json({"type": "history", "data": list(est.recentes)})
            while True:
                await ws.receive_text()   # o browser não manda nada; só se espera o fecho
        except WebSocketDisconnect:
            pass
        finally:
            est.clientes.discard(ws)

    if DIST.is_dir():
        app.mount("/", StaticFiles(directory=DIST, html=True), name="frontend")
    else:
        @app.get("/")
        async def sem_frontend():
            return PlainTextResponse("Falta construir o frontend: cd frontend/app && npm ci && npm run build",
                                     status_code=503)
    return app


def main():
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    import uvicorn
    app = criar_app()
    host = os.environ.get("MAPA_HOST", "127.0.0.1")
    port = int(os.environ.get("MAPA_PORT", 8001))
    log.info("Mapa de ataques em http://%s:%d", host, port)
    uvicorn.run(app, host=host, port=port, log_level="warning")


if __name__ == "__main__":
    main()
