"""O estado em memória e a sincronização com o XSIAM.

Em vez de cada endpoint chamar o Cortex com a sua cache de 60s, há uma só
thread que sincroniza e os endpoints leem daqui.

O desenho vem do que o tenant do GRA mostrou a 2026-09-29 (medido por
bissecção de offsets e XQL — o `total_count` da API vinha até 7× abaixo):
~5 mil casos criados por dia, ~5,4 mil abertos, ~18 mil alertas por dia, e
8–18 s por página de 100. Por isso há duas fontes:

- **API paginada**, só para o que tem de ser linha a linha: os casos abertos
  (contadores, tabela, briefing) e os alertas das últimas 24h (alertas mais
  críticos, ameaças bloqueadas). Lida por inteiro no arranque, depois só o
  que mudou, com sobreposição. Um caso que deixa de estar aberto sai.
- **XQL agregado ao dataset `incidents`**, de 15 em 15 min, para o que é
  contagem sobre dezenas de milhares de casos: volume, MITRE, radar, MTTR,
  auto contido. Cada consulta custou ~0,006 unidades de quota.
"""
from __future__ import annotations

import gzip
import json
import logging
import os
import threading
import time
from pathlib import Path

import aggregate as agg
from cortex_client import CortexError

log = logging.getLogger(__name__)

INCIDENT_DAYS = 90       # o maior intervalo do gráfico de volume
ALERT_WINDOW_MS = 25 * agg.HOUR  # 24h + margem para a última hora
OVERLAP_MS = 10 * agg.MIN
STALE_MS = 10 * agg.MIN  # mais do que isto sem sincronizar = degradado
METRICS_INTERVAL_MS = 15 * agg.MIN
# «Casos abertos» é a carga de trabalho atual: só os abertos criados nos
# últimos 90 dias. A 2026-09-30, 59 008 dos 59 612 abertos eram mais antigos
# (94% já no dia anterior) — contados à parte, como histórico por resolver.
OPEN_WINDOW_MS = 90 * agg.DAY
# Um estado guardado mais velho do que isto não se retoma: o incremental a
# partir dele seria maior do que uma recolha completa.
RESUME_MAX_AGE_MS = 24 * agg.HOUR
# De quanto em quanto tempo se voltam a pedir todos os alertas de 24h (corrige
# o que o incremental tenha perdido; ~7 min de pedidos, na thread da
# reconciliação).
ALERTS_FULL_MS = 6 * agg.HOUR


def now_ms() -> int:
    return int(time.time() * 1000)


class Store:
    def __init__(self, source, *, max_incident_pages=200, max_alert_pages=300,
                 extra_per_cycle=5, cases_limit=60, metrics_interval_ms=METRICS_INTERVAL_MS):
        self.source = source
        self.max_incident_pages = max_incident_pages
        self.max_alert_pages = max_alert_pages
        self.extra_per_cycle = extra_per_cycle
        self.cases_limit = cases_limit
        self.metrics_interval_ms = metrics_interval_ms

        self.lock = threading.Lock()
        self.incidents: dict[str, dict] = {}   # só os abertos
        self.alerts: dict[str, dict] = {}      # só as últimas 24h
        self.extra: dict[str, tuple[int | None, dict]] = {}
        # Casos cujo extra_data o XSIAM recusou (403), com o modified de então:
        # não se volta a pedir até o caso mudar.
        self.denied: dict[str, int | None] = {}
        self.truncated = {"incidents": False, "alerts": False}
        self.last_ok: int | None = None
        self.watermark: int | None = None
        self.stages: list | None = None
        self.last_error: dict | None = None
        self.warnings: list[str] = []
        self.syncing = False
        # Já sincronizou desde que o processo arrancou? Um estado retomado do
        # disco tem last_ok, mas é de antes do reinício.
        self.fresh = False

        # Casos abertos criados antes da janela (o histórico acumulado): só a
        # contagem, feita pela reconciliação.
        self.backlog: int | None = None
        self.backlog_at: int | None = None
        self.last_reconcile: int | None = None
        self.last_alerts_full: int | None = None

        self.metrics: dict | None = None
        self.metrics_at: int | None = None
        self.metrics_error: str | None = None
        self.metrics_tried: int | None = None

    def _plan(self, t0: int) -> list:
        return [
            ("casos abertos", lambda: self._load_open(
                self.source.open_incidents(self.max_incident_pages, since_ms=t0 - OPEN_WINDOW_MS))),
            ("alertas de 24h", lambda: self._load_alerts(t0 - ALERT_WINDOW_MS)),
        ]

    # --- sincronização ------------------------------------------------------

    def sync_once(self) -> None:
        started = now_ms()
        self.syncing = True
        try:
            if self.stages is None:
                self.stages = self._plan(started)
                self.watermark = started
            elif self.last_ok is not None:
                self._incremental(started)
            if self.stages:
                name, run = self.stages[0]
                t = time.time()
                run()
                self.stages.pop(0)
                log.info("Recolha inicial: %s em %.0f s.", name, time.time() - t)
            warnings = self._enrich()
            if self.stages:
                warnings.insert(0, f"A carregar: {self.stages[0][0]}…")
            with self.lock:
                self.last_ok = now_ms()
                self.last_error = None
                self.warnings = warnings
                self.fresh = True
        except CortexError as exc:
            # Os dados antigos ficam: um ecrã com números de há 5 minutos e o
            # estado a amarelo é melhor do que um ecrã vazio a dizer «0».
            log.error("Sincronização falhou (%s): %s", exc.kind, exc)
            with self.lock:
                self.last_error = {"kind": exc.kind, "message": str(exc), "at": now_ms()}
        except Exception as exc:  # noqa: BLE001 — a thread não pode morrer
            log.exception("Erro inesperado na sincronização")
            with self.lock:
                self.last_error = {"kind": "interno", "message": type(exc).__name__, "at": now_ms()}
        finally:
            self.syncing = False
        if self.last_ok is not None:
            self.refresh_metrics()

    def refresh_metrics(self, force: bool = False) -> None:
        """As consultas XQL, se já passou o intervalo. Uma falha aqui não mexe
        no estado da API: os contadores e as tabelas continuam certos, e os
        painéis de métricas dizem de quando são."""
        now = now_ms()
        # Sem nenhuma métrica ainda, uma falha tenta de novo em 2 min em vez
        # de deixar os painéis «a carregar» um quarto de hora.
        wait = self.metrics_interval_ms if self.metrics else min(self.metrics_interval_ms, 2 * agg.MIN)
        if not force and self.metrics_tried and now - self.metrics_tried < wait:
            return
        self.metrics_tried = now
        try:
            t = time.time()
            m = {
                "volume": self.source.volume_hours(now - INCIDENT_DAYS * agg.DAY),
                "tactics": self.source.tactic_hours(agg.local_midnight_ms(now, 8)),
                "techniques": self.source.top_techniques(now - 7 * agg.DAY, 10),
                "resolved": self.source.resolved_stats(now - agg.DAY),
            }
            with self.lock:
                self.metrics, self.metrics_at, self.metrics_error = m, now, None
            log.info("Métricas XQL em %.0f s (quota restante: %s).", time.time() - t,
                     getattr(self.source, "last_quota", None))
        except CortexError as exc:
            log.error("Métricas XQL falharam: %s", exc)
            with self.lock:
                self.metrics_error = str(exc)
        except Exception as exc:  # noqa: BLE001
            log.exception("Erro inesperado nas métricas XQL")
            with self.lock:
                self.metrics_error = type(exc).__name__

    def reconcile(self) -> None:
        """Pede a lista completa de casos abertos da janela e alinha a cache.

        A sincronização incremental só vê casos que *mudaram*: um caso fundido
        noutro ou apagado nunca volta a aparecer e ficava aberto para sempre (a
        2026-09-30 eram 17 fantasmas, que sobreviviam a reinícios). Aqui, o
        que está na cache e não vem na lista sai, e fica no log.
        Aproveita-se para contar o histórico (abertos com mais de 90 dias).
        """
        t = now_ms()
        try:
            raws, truncated = self.source.open_incidents(self.max_incident_pages, since_ms=t - OPEN_WINDOW_MS)
        except CortexError as exc:
            log.error("Reconciliação falhou (%s): %s", exc.kind, exc)
            return
        fresh = {}
        for raw in raws:
            inc = agg.norm_incident(raw)
            if agg.is_open(inc):
                fresh[inc["id"]] = inc
        with self.lock:
            if truncated:
                # Com a lista cortada não se sabe o que é fantasma: não se tira nada.
                log.warning("Reconciliação: lista de abertos truncada no teto; nada removido.")
                self.incidents.update(fresh)
            else:
                ghosts = sorted(set(self.incidents) - set(fresh))
                added = len(set(fresh) - set(self.incidents))
                self.incidents = fresh
                self._prune(t)
                if ghosts:
                    log.warning("Reconciliação: %d caso(s) fantasma removido(s) (já não estão abertos "
                                "no XSIAM): %s", len(ghosts), ", ".join(ghosts[:20]) + (" …" if len(ghosts) > 20 else ""))
                else:
                    log.info("Reconciliação: sem casos fantasma (%d abertos na janela, %d novos).", len(fresh), added)
            self.truncated["incidents"] = truncated
            self.last_reconcile = t
            # As recusas (403) também envelhecem: a 2026-09-30 a chave passou a
            # ver todos os casos, mas os já marcados só voltavam a ser pedidos
            # se o caso mudasse. A cada reconciliação voltam a ser tentados.
            self.denied.clear()
        try:
            n = self.source.count_open_before(t - OPEN_WINDOW_MS)
        except CortexError as exc:
            log.error("Contagem do histórico de abertos falhou (%s): %s", exc.kind, exc)
            return
        with self.lock:
            self.backlog, self.backlog_at = n, now_ms()
        log.info("Histórico: %d caso(s) abertos com mais de 90 dias.", n)

    def reconcile_alerts(self, force: bool = False) -> None:
        """Volta a pedir todos os alertas de 24h e alinha a cache com eles.

        Mantém os que chegaram pelo incremental enquanto isto corria. O log diz
        quantos faltavam: se for muitos com frequência, o incremental está a
        perder alertas outra vez.
        """
        t = now_ms()
        if not force and self.last_alerts_full and t - self.last_alerts_full < ALERTS_FULL_MS:
            return
        try:
            raws, truncated = self.source.alerts_created_since(t - ALERT_WINDOW_MS, self.max_alert_pages)
        except CortexError as exc:
            log.error("Recolha completa dos alertas falhou (%s): %s", exc.kind, exc)
            return
        fresh = {a["id"]: a for a in map(agg.norm_alert, raws)}
        with self.lock:
            missing = len(set(fresh) - set(self.alerts))
            recent = {k: v for k, v in self.alerts.items()
                      if k not in fresh and (v["created"] or 0) >= t - OVERLAP_MS}
            self.alerts = {**fresh, **recent}
            self.truncated["alerts"] = truncated
            self.last_alerts_full = t
            total = len(self.alerts)
        (log.warning if missing > total * 0.05 else log.info)(
            "Recolha completa dos alertas: %d em 24h, %d que a cache não tinha.", total, missing)

    def _load_open(self, result) -> None:
        raws, truncated = result
        with self.lock:
            for raw in raws:
                inc = agg.norm_incident(raw)
                self.incidents[inc["id"]] = inc
            self.truncated["incidents"] = truncated

    def _load_changed(self, raws: list[dict]) -> None:
        with self.lock:
            for raw in raws:
                inc = agg.norm_incident(raw)
                # Aberto e dentro da janela; um caso antigo que mudou (mas
                # continua aberto) pertence ao histórico, não à carga atual.
                if agg.is_open(inc) and (inc["created"] or 0) >= now_ms() - OPEN_WINDOW_MS:
                    self.incidents[inc["id"]] = inc
                else:
                    # ~5 mil casos fecham por dia; guardá-los era encher a
                    # memória com o que as métricas XQL já contam.
                    self.incidents.pop(inc["id"], None)

    def _load_alerts(self, since: int) -> None:
        raws, truncated = self.source.alerts_created_since(since, self.max_alert_pages)
        with self.lock:
            for a in map(agg.norm_alert, raws):
                self.alerts[a["id"]] = a
            self.truncated["alerts"] |= truncated

    def _incremental(self, started: int) -> None:
        since = self.watermark - OVERLAP_MS
        changed, _ = self.source.incidents_modified_since(since, self.max_incident_pages)
        self._load_changed(changed)
        raws, truncated = self.source.alerts_inserted_since(since, self.max_alert_pages)
        with self.lock:
            for a in map(agg.norm_alert, raws):
                self.alerts[a["id"]] = a
            self.truncated["alerts"] |= truncated
        with self.lock:
            self.watermark = started
            self._prune(started)

    def _prune(self, now: int) -> None:
        # Um caso que passa dos 90 dias sai da janela (a reconciliação seguinte
        # já o conta no histórico).
        inc_floor = now - OPEN_WINDOW_MS
        self.incidents = {k: v for k, v in self.incidents.items() if (v["created"] or 0) >= inc_floor}
        al_floor = now - ALERT_WINDOW_MS
        self.alerts = {k: v for k, v in self.alerts.items() if (v["created"] or 0) >= al_floor}
        self.extra = {k: v for k, v in self.extra.items() if k in self.incidents}
        self.denied = {k: v for k, v in self.denied.items() if k in self.incidents}

    def _enrich(self) -> list[str]:
        """get_incident_extra_data para os casos que a tabela mostra, só quando
        o caso mudou desde a última vez, e no máximo `extra_per_cycle` por ciclo
        para não rebentar o limite de pedidos da API."""
        with self.lock:
            # Os mesmos que a tabela mostra (agg.table_cases): enriquecer outros gastava
            # pedidos em casos que não aparecem.
            wanted = agg.table_cases(list(self.incidents.values()), now_ms())[:self.cases_limit]
            todo = [i for i in wanted
                    if (i["id"] not in self.extra or self.extra[i["id"]][0] != i["modified"])
                    and self.denied.get(i["id"], object()) != i["modified"]]
        failures = 0
        newly_denied: list[str] = []
        for inc in todo[:self.extra_per_cycle]:
            try:
                data = self.source.incident_extra_data(inc["id"])
            except CortexError as exc:
                if exc.kind in ("auth", "rede"):
                    raise
                if exc.kind == "proibido":
                    with self.lock:
                        self.denied[inc["id"]] = inc["modified"]
                    newly_denied.append(inc["id"])
                else:
                    failures += 1
                continue
            with self.lock:
                self.extra[inc["id"]] = (inc["modified"], data)
                self.denied.pop(inc["id"], None)
        warnings = []
        # Um 403 aqui não vai para o ecrã (é ruído numa parede), mas também não
        # se cala: fica no log, com os casos. Se continuar a aparecer, a chave
        # precisa de mais uma permissão no Cortex. Regista-se só quando o caso
        # é recusado pela 1.ª vez (ou de novo depois de mudar), não a cada ciclo.
        if newly_denied:
            with self.lock:
                total = len(self.denied)
            log.warning("get_incident_extra_data recusado (403: a chave não tem permissão) "
                        "para o(s) caso(s) %s — %d caso(s) sem detalhe no total.",
                        ", ".join(newly_denied), total)
        if failures:
            warnings.append(f"{failures} caso(s) sem detalhe: o XSIAM falhou get_incident_extra_data.")
        if len(todo) > self.extra_per_cycle:
            warnings.append(f"{len(todo) - self.extra_per_cycle} caso(s) ainda por detalhar.")
        return warnings

    def run_forever(self, interval_s: int) -> None:
        while True:
            self.sync_once()
            time.sleep(interval_s)

    # --- persistência ------------------------------------------------------
    #
    # O estado vivia só em memória: cada reinício do processo (uma atualização,
    # um reboot, ou os reinícios de 2026-09-30 para aplicar alterações) deixava
    # os painéis vazios ~2 min e o briefing ~6 min, enquanto a recolha inicial
    # recomeçava do zero. Agora grava-se num ficheiro e, no arranque, retoma-se
    # a partir dele: mostra-se logo o que havia e a sincronização continua em
    # modo incremental a partir da última marca.
    #
    # O ficheiro tem nomes de casos, hosts e utilizadores: fica com 0600 e
    # fora do git.

    def save(self, path: Path) -> None:
        with self.lock:
            if self.last_ok is None:
                return  # nada de útil para guardar ainda
            state = {
                "version": 1, "saved_at": now_ms(),
                "incidents": self.incidents, "alerts": self.alerts,
                "extra": {k: list(v) for k, v in self.extra.items()},
                "denied": self.denied, "truncated": self.truncated,
                "last_ok": self.last_ok, "watermark": self.watermark,
                "metrics": self.metrics, "metrics_at": self.metrics_at,
                "backlog": self.backlog, "backlog_at": self.backlog_at,
                "last_alerts_full": self.last_alerts_full,
                "bootstrapped": self.stages == [],
            }
            data = json.dumps(state, ensure_ascii=False).encode()
        path.parent.mkdir(parents=True, exist_ok=True)
        tmp = path.with_suffix(".tmp")
        # Escreve-se ao lado e troca-se: um corte a meio não deixa um ficheiro
        # partido no lugar do bom.
        fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        with os.fdopen(fd, "wb") as f:
            f.write(gzip.compress(data, compresslevel=5))
        os.replace(tmp, path)

    def load(self, path: Path) -> bool:
        """Retoma um estado guardado. Devolve False (e começa do zero) se não
        houver ficheiro, se estiver ilegível, ou se for de há mais de 24 h."""
        try:
            state = json.loads(gzip.decompress(path.read_bytes()))
        except FileNotFoundError:
            return False
        except Exception as exc:  # noqa: BLE001 — um ficheiro mau não impede o arranque
            log.warning("Estado guardado ilegível (%s); começa-se do zero.", type(exc).__name__)
            return False
        age = now_ms() - (state.get("watermark") or 0)
        if state.get("version") != 1 or not state.get("bootstrapped") or age > RESUME_MAX_AGE_MS:
            log.info("Estado guardado não se retoma (versão, incompleto ou com %d h).", age // agg.HOUR)
            return False
        with self.lock:
            self.incidents = state["incidents"]
            self.alerts = state["alerts"]
            self.extra = {k: tuple(v) for k, v in state["extra"].items()}
            self.denied = state["denied"]
            self.truncated = state["truncated"]
            self.last_ok = state["last_ok"]
            self.watermark = state["watermark"]
            self.metrics = state["metrics"]
            self.metrics_at = state["metrics_at"]
            # Sem registo de uma recolha completa (estados de antes desta
            # correção) → a primeira reconciliação faz uma.
            self.last_alerts_full = state.get("last_alerts_full")
            self.backlog = state.get("backlog")
            self.backlog_at = state.get("backlog_at")
            # Estados gravados antes da janela de 90 dias tinham o histórico
            # todo misturado nos abertos.
            self._prune(now_ms())
            self.stages = []  # recolha inicial já feita: segue em incremental
        log.info("Estado retomado de há %d min: %d casos abertos, %d alertas.",
                 age // agg.MIN, len(self.incidents), len(self.alerts))
        if self.denied:
            # Estes não se voltam a pedir (não mudaram), por isso sem esta linha
            # o problema da permissão sumia do log a cada reinício.
            log.warning("get_incident_extra_data continua recusado (403: a chave não tem permissão) "
                        "para %d caso(s): %s.", len(self.denied), ", ".join(sorted(self.denied)))
        return True

    # --- leitura ------------------------------------------------------------

    def snapshot(self) -> tuple[list[dict], list[dict], dict]:
        with self.lock:
            return (list(self.incidents.values()), list(self.alerts.values()),
                    {k: v[1] for k, v in self.extra.items()})

    def metrics_snapshot(self) -> tuple[dict | None, int | None]:
        with self.lock:
            return self.metrics, self.metrics_at

    def status(self, now: int | None = None) -> dict:
        now = now or now_ms()
        with self.lock:
            last_ok, err = self.last_ok, self.last_error
            truncated, warnings = dict(self.truncated), list(self.warnings)
            m_at, m_err = self.metrics_at, self.metrics_error
        age = None if last_ok is None else now - last_ok
        if m_err:
            warnings.append(f"Métricas (XQL) {'de há ' + str((now - m_at) // agg.MIN) + ' min' if m_at else 'por carregar'}: {m_err}")
        if last_ok is None:
            state = "a_sincronizar" if self.syncing and not err else "sem_ligacao"
        elif err and age > STALE_MS:
            state = "sem_ligacao"
        elif err or age > STALE_MS:
            state = "degradado"
        else:
            state = "operacional"
        return {"state": state, "last_ok": last_ok, "server_time": now,
                "error": err, "truncated": truncated, "warnings": warnings,
                "metrics_at": m_at,
                "backlog": self.backlog, "backlog_at": self.backlog_at,
                "open_window_days": OPEN_WINDOW_MS // agg.DAY,
                "stale_after_ms": STALE_MS}
