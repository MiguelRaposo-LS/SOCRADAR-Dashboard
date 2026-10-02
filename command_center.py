"""Réplica do «XSIAM Command Center», o dashboard pré-definido da consola.

Não se exporta (é do sistema). A captura das chamadas da consola
(dashboards/XSIAM_Command_Center_structure.json, 2026-09-30) disse que blocos
tem e com que números, e cada bloco foi conferido contra ela na mesma janela:

- Total Open Cases por severidade: bate (59 612 vs 59 614).
- Ingestão de eventos e de dados: bate (0,6–0,7%).
- Casos 24h (+18%), Issues (−8%) e Prevented Events (−8%) não batem: a
  consola usa definições que não se conseguiram reproduzir (e o bloco dos
  casos só foi pedido com cache). Aqui cada bloco diz a sua definição.

Não interfere com o painel principal: thread própria, só consultas baratas
(~0,02 de quota a cada 15 min), e os alertas vêm da recolha que o painel já faz.
"""
from __future__ import annotations

import logging
import re
import threading
import time
from pathlib import Path

import aggregate as agg
from cortex_client import CortexError

log = logging.getLogger(__name__)

REFRESH_S = 15 * 60
RETRY_S = 60
# Logótipos das fontes de dados: ficheiros oficiais postos à mão nesta pasta,
# com o nome «<fornecedor>-<produto>.svg|png» em minúsculas (ex.:
# panw-ngfw.svg). Sem ficheiro, a página mostra um círculo com a inicial.
ICONS_DIR = Path(__file__).resolve().parent / "public" / "assets" / "icones-fontes"
ICON_EXT = (".svg", ".png", ".webp", ".jpg", ".jpeg")
# Fontes que aparecem só com o nome (destacado), sem logótipo nem inicial —
# escolha do Miguel (2026-10-01): os logótipos destas não ficavam bem.
NAME_ONLY = {"ip-flow-ip-flow", "silverfort-admin-console"}

# Palavras que querem dizer o mesmo nos nomes do XSIAM e nos dos ficheiros.
SYNONYMS = {"msft": "microsoft"}


def _words(text: str) -> set[str]:
    """Palavras de um nome, normalizadas: «msft» = «microsoft», e sem os
    sufixos «icon»/«logo» colados («ipicon» → «ip»)."""
    out = set()
    # «MicrosoftAzure» → «Microsoft Azure»: separa também pelas maiúsculas,
    # mas só depois de 2+ minúsculas — «vCenter» fica inteiro (separado dava
    # «v center» e deixava de bater com o vCenter do XSIAM).
    text = re.sub(r"(?<=[a-z]{2})(?=[A-Z])", " ", text)
    for w in re.split(r"[^a-z0-9]+", text.lower()):
        for suf in ("icon", "logo"):
            if w.endswith(suf) and len(w) > len(suf):
                w = w[: -len(suf)]
        if w:
            out.add(SYNONYMS.get(w, w))
    return out


def source_slug(vendor, product) -> str:
    return re.sub(r"[^a-z0-9]+", "-", f"{vendor or ''} {product or ''}".lower()).strip("-")


def match_icon(slug: str, icons: dict) -> str | None:
    """O ficheiro exato «<fornecedor>-<produto>», ou o que tenha todas as
    palavras do nome dentro das da fonte («ngfw.svg» → «panw-ngfw»,
    «o365.svg» → «msft-o365-contacts»). Com vários, ganha o mais específico."""
    exact = {k.lower(): v for k, v in icons.items()}
    if slug in exact:
        return exact[slug]
    words = _words(slug)
    best = None
    for stem, path in icons.items():
        tokens = _words(stem)
        if tokens and tokens <= words and (best is None or len(tokens) > best[0]):
            best = (len(tokens), path)
    return best[1] if best else None


def icons_available() -> dict:
    """{slug: caminho público} dos logótipos que existem na pasta."""
    if not ICONS_DIR.is_dir():
        return {}
    # O nome guarda as maiúsculas: servem para separar palavras («MicrosoftAzure»).
    return {f.stem: f"assets/icones-fontes/{f.name}" for f in sorted(ICONS_DIR.iterdir())
            if f.suffix.lower() in ICON_EXT and f.is_file()}
SEV_KEYS = {"CRITICAL": "critical", "HIGH": "high", "MEDIUM": "medium", "LOW": "low"}


def _sev(rows, keep=lambda st: True) -> dict:
    out = {s: 0 for s in agg.SEVERITIES}
    for r in rows:
        k = SEV_KEYS.get(str(r["severity"]).upper())
        if k and keep(r["status"]):
            out[k] += r["n"]
    return out


def cases_block(rows: list[dict]) -> dict:
    """Casos criados nas últimas 24h, a partir de «comp count() by status, severity»."""
    is_open = lambda st: st in ("new", "under_investigation")
    return {
        "total": sum(r["n"] for r in rows),
        "automated": sum(r["n"] for r in rows if "auto" in r["status"]),
        "manual": sum(r["n"] for r in rows if "auto" not in r["status"]),
        "resolved": sum(r["n"] for r in rows if r["status"].startswith("resolved")),
        "open": sum(r["n"] for r in rows if is_open(r["status"])),
        "severity": _sev(rows),
        "open_severity": _sev(rows, is_open),
    }


def open_block(rows: list[dict]) -> dict:
    sev = _sev(rows, lambda st: st in ("new", "under_investigation"))
    return {"total": sum(sev.values()), "severity": sev}


def alerts_block(alerts: list[dict], now: int) -> dict:
    """Issues e eventos prevenidos das últimas 24h, da recolha do painel."""
    recent = [a for a in alerts if (a["created"] or 0) >= now - agg.DAY]
    return {"issues": len(recent), "prevented": sum(1 for a in recent if agg.is_blocked(a))}


class CommandCenter:
    def __init__(self, source, store):
        self.source = source
        self.store = store
        self.lock = threading.Lock()
        self.data: dict | None = None
        self.at: int | None = None
        self.error: str | None = None

    def refresh(self) -> bool:
        """Atualiza os blocos; devolve False se o XSIAM falhou."""
        now = int(time.time() * 1000)
        try:
            ing = self.source.ingestion(now - agg.DAY, now)
            prev = self.source.ingestion(now - 2 * agg.DAY, now - agg.DAY)
            delta = lambda a, b: round((a - b) / b * 100, 1) if b else None
            data = {
                "cases": cases_block(self.source.cases_by_status_severity(now - agg.DAY)),
                "open": open_block(self.source.open_by_severity_all()),
                "ingestion": {
                    "events": ing["events"], "bytes": ing["bytes"],
                    "events_delta_pct": delta(ing["events"], prev["events"]),
                    "bytes_delta_pct": delta(ing["bytes"], prev["bytes"]),
                    "hours": [{"t": h["hora"] * agg.HOUR, "events": h["events"], "bytes": h["bytes"]}
                              for h in ing["hours"]],
                },
                **self._sources(now),
            }
        except CortexError as exc:
            log.warning("Command Center: o XSIAM falhou (%s): %s", exc.kind, exc)
            with self.lock:
                self.error = str(exc)
            return False
        except Exception as exc:  # noqa: BLE001 — esta página nunca derruba o painel
            log.exception("Command Center: erro inesperado")
            with self.lock:
                self.error = type(exc).__name__
            return False
        with self.lock:
            self.data, self.at, self.error = data, now, None
        return True

    def _sources(self, now: int) -> dict:
        allsrc = self.source.data_sources(now - agg.DAY)
        return {"sources": allsrc[:10], "sources_total": len(allsrc)}

    def payload(self) -> dict:
        now = int(time.time() * 1000)
        _, alerts, _ = self.store.snapshot()
        with self.lock:
            out = {"at": self.at, "error": self.error, **(self.data or {})}
        out["alerts"] = alerts_block(alerts, now)
        icons = icons_available()
        for s in out.get("sources") or []:
            s["slug"] = source_slug(s.get("vendor"), s.get("product"))
            s["name_only"] = s["slug"] in NAME_ONLY
            s["icon"] = None if s["name_only"] else match_icon(s["slug"], icons)
        out["alerts_at"] = self.store.last_ok
        return out

    def run_forever(self) -> None:
        # Espera pela recolha inicial do painel: até lá os alertas estão vazios
        # e a página mostraria zeros.
        while self.store.stages != []:
            time.sleep(5)
        while True:
            # Depois de uma falha, outra vez daqui a 1 min, e não 15: o XSIAM
            # devolveu uma vez metade das linhas de uma consulta («13 de 26»,
            # 2026-10-02) e, logo a seguir a um arranque, a página ficava com
            # o erro até à atualização seguinte.
            time.sleep(REFRESH_S if self.refresh() else RETRY_S)
