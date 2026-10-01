"""Dashboards do XSIAM, exportados da consola, mostrados numa segunda página.

A API de dashboards do XSIAM exige o papel Instance Administrator (a chave do
painel responde 403 / lista vazia — medido a 2026-09-30), e dar esse papel a
uma chave guardada no PC da TV não é aceitável. Por isso: exporta-se o
dashboard na consola (Dashboards → ⋯ → Export) para a pasta `dashboards/`,
e aqui corre-se a consulta XQL de cada widget com a chave de sempre.

O formato segue a documentação da API (dashboards_data + widgets_data, igual
ao que o get devolve); **ainda não foi visto um export real** — acertar com o
primeiro ficheiro.

Só os widgets XQL têm consulta; os pré-definidos do XSIAM não se podem
reproduzir e aparecem como «não suportado». Cada widget gasta quota XQL a
cada atualização (15 em 15 min).
"""
from __future__ import annotations

import json
import logging
import re
import threading
import time
from pathlib import Path

from cortex_client import CortexError

log = logging.getLogger(__name__)

REFRESH_S = 15 * 60
MAX_ROWS = 200          # por widget, para a página não receber tabelas enormes
DEFAULT_WINDOW_MS = 24 * 3600 * 1000


def _slug(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "dashboard"


def _time_frame_ms(tf) -> int:
    """{"relativeTime": ms} ou {"from": ms, "to": ms}; sem nada, 24 h."""
    if isinstance(tf, dict):
        if tf.get("relativeTime"):
            return int(tf["relativeTime"])
        if tf.get("from") and tf.get("to"):
            return max(60_000, int(tf["to"]) - int(tf["from"]))
    if isinstance(tf, (int, float)) and tf > 0:
        return int(tf)
    return DEFAULT_WINDOW_MS


def _keys_in(obj) -> list[str]:
    """Todas as strings dentro do layout, pela ordem — é onde estão as chaves
    dos widgets, seja qual for a forma exata do layout."""
    out = []
    if isinstance(obj, dict):
        for v in obj.values():
            out += _keys_in(v)
    elif isinstance(obj, list):
        for v in obj:
            out += _keys_in(v)
    elif isinstance(obj, str):
        out.append(obj)
    return out


def load_export(path: Path) -> list[dict]:
    """Um ficheiro exportado → lista de dashboards com os seus widgets."""
    raw = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(raw, dict) and "reply" in raw:
        raw = raw["reply"]
    dashboards = raw.get("dashboards_data") or []
    widgets = {w.get("widget_key"): w for w in (raw.get("widgets_data") or []) if w.get("widget_key")}
    out = []
    for d in dashboards:
        order = [k for k in _keys_in(d.get("layout")) if k in widgets]
        order = list(dict.fromkeys(order)) or list(widgets)  # sem layout legível: ordem do ficheiro
        ws = []
        for k in order:
            w = widgets[k]
            phrase = ((w.get("data") or {}).get("phrase") or "").strip()
            ws.append({"key": k, "title": w.get("title") or k, "description": w.get("description"),
                       "phrase": phrase, "window_ms": _time_frame_ms(w.get("time_frame")),
                       "view": w.get("viewOptions") or {}})
        name = d.get("name") or path.stem
        out.append({"id": _slug(name), "name": name, "description": d.get("description"),
                    "file": path.name, "widgets": ws})
    return out


def load_dir(folder: Path) -> list[dict]:
    dashboards, seen = [], set()
    for f in sorted(folder.glob("*.json")):
        try:
            for d in load_export(f):
                while d["id"] in seen:
                    d["id"] += "-2"
                seen.add(d["id"])
                dashboards.append(d)
        except Exception as exc:  # noqa: BLE001 — um ficheiro mau não derruba os outros
            log.warning("Dashboard exportado ilegível (%s): %s", f.name, type(exc).__name__)
    return dashboards


class DashboardRunner:
    def __init__(self, source, folder: Path):
        self.source = source
        self.folder = folder
        self.lock = threading.Lock()
        self.dashboards: list[dict] = []
        self.results: dict[tuple[str, str], dict] = {}

    def reload(self) -> None:
        ds = load_dir(self.folder) if self.folder.is_dir() else []
        with self.lock:
            self.dashboards = ds
        if ds:
            log.info("Dashboards exportados: %s.", ", ".join(f"{d['name']} ({len(d['widgets'])} widgets)" for d in ds))

    def refresh(self) -> None:
        with self.lock:
            ds = list(self.dashboards)
        for d in ds:
            for w in d["widgets"]:
                res = {"at": int(time.time() * 1000), "rows": None, "error": None}
                if not w["phrase"]:
                    res["error"] = "widget sem consulta XQL (pré-definido do XSIAM): não suportado"
                else:
                    try:
                        rows = self.source.xql(w["phrase"], w["window_ms"])
                        res["rows"], res["total"] = rows[:MAX_ROWS], len(rows)
                    except CortexError as exc:
                        res["error"] = str(exc)
                        log.warning("Widget «%s» (%s) falhou: %s", w["title"], d["name"], exc)
                with self.lock:
                    self.results[(d["id"], w["key"])] = res

    def listing(self) -> list[dict]:
        with self.lock:
            return [{"id": d["id"], "name": d["name"], "description": d["description"],
                     "widgets": len(d["widgets"])} for d in self.dashboards]

    def dashboard(self, did: str) -> dict | None:
        with self.lock:
            d = next((x for x in self.dashboards if x["id"] == did), None)
            if d is None:
                return None
            return {"id": d["id"], "name": d["name"], "description": d["description"],
                    "widgets": [{"key": w["key"], "title": w["title"], "description": w["description"],
                                 "view": w["view"], "window_ms": w["window_ms"],
                                 **self.results.get((d["id"], w["key"]), {"rows": None, "error": None, "at": None})}
                                for w in d["widgets"]]}

    def run_forever(self) -> None:
        while True:
            self.reload()
            self.refresh()
            time.sleep(REFRESH_S)
