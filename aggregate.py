"""De incidentes e alertas em bruto para o que cada painel mostra.

Funções puras: recebem listas já normalizadas e o instante «agora», não fazem
chamadas. É aqui que vivem as definições (o que conta como aberto, como
contido, como MTTR) — um só sítio, para o ecrã não dizer duas coisas.
"""
from __future__ import annotations

import re
from collections import Counter
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

TZ = ZoneInfo("Atlantic/Azores")
MIN = 60_000
HOUR = 60 * MIN
DAY = 24 * HOUR

SEVERITIES = ("critical", "high", "medium", "low")
SEV_RANK = {"critical": 4, "high": 3, "medium": 2, "low": 1, "info": 0}
OPEN_STATUSES = {"new", "under_investigation"}
STATUS_PT = {"new": "Novo", "under_investigation": "Em investigação"}

# A matriz Enterprise, pela ordem em que o ATT&CK a desenha.
TACTICS = [
    ("TA0043", "Reconhecimento"), ("TA0042", "Desenvolvimento de recursos"),
    ("TA0001", "Acesso inicial"), ("TA0002", "Execução"), ("TA0003", "Persistência"),
    ("TA0004", "Escalada de privilégios"), ("TA0005", "Evasão de defesas"),
    ("TA0006", "Acesso a credenciais"), ("TA0007", "Descoberta"),
    ("TA0008", "Movimento lateral"), ("TA0009", "Recolha"),
    ("TA0011", "Comando e controlo"), ("TA0010", "Exfiltração"), ("TA0040", "Impacto"),
]
TACTIC_PT = dict(TACTICS)
# Os eixos do radar: fixos, para que a forma de hoje se compare com a de ontem.
# Um eixo que aparecesse e desaparecesse conforme os dados mudava o desenho sem
# que a ameaça mudasse.
RADAR_AXES = ["TA0001", "TA0002", "TA0003", "TA0005", "TA0006", "TA0008", "TA0011", "TA0040"]

WEEKDAYS_PT = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"]
RANGES = {"24h": 1, "7d": 7, "30d": 30, "90d": 90}


# --- normalização -----------------------------------------------------------

def norm_severity(value) -> str:
    """'high', 'High', 'SEV_040_HIGH' → 'high'. A API pública e as exportações
    internas do XSIAM não escrevem a severidade da mesma maneira."""
    s = str(value or "").lower()
    for sev in SEVERITIES:
        if sev in s:
            return sev
    return "info"


def _ms(value) -> int | None:
    try:
        v = int(value)
    except (TypeError, ValueError):
        return None
    return v if v > 0 else None


def _first(d: dict, *keys):
    for k in keys:
        v = d.get(k)
        if v not in (None, "", []):
            return v
    return None


def _clean_entity(value: str) -> str:
    # A API devolve hosts como «nome:agent_id»; o id não diz nada no ecrã.
    return str(value).split(":")[0].strip()


def _as_list(value) -> list:
    if value in (None, ""):
        return []
    return value if isinstance(value, list) else [value]


def norm_incident(raw: dict) -> dict:
    return {
        "id": str(_first(raw, "incident_id", "case_id")),
        "name": _first(raw, "incident_name", "description", "name") or "(sem nome)",
        # A severidade que um analista fixou à mão ganha à calculada.
        "severity": norm_severity(raw.get("manual_severity") or raw.get("severity")),
        "status": str(raw.get("status") or "").lower(),
        # A listagem de casos já traz o MITRE: é daqui que saem o painel ATT&CK
        # e o radar, sem ter de puxar dezenas de milhares de alertas.
        "tactics": [str(t) for t in _as_list(raw.get("mitre_tactics_ids_and_names"))],
        "techniques": [str(t) for t in _as_list(raw.get("mitre_techniques_ids_and_names"))],
        "created": _ms(raw.get("creation_time")),
        "modified": _ms(raw.get("modification_time")),
        "resolved": _ms(_first(raw, "resolved_timestamp", "resolved_time")),
        "hosts": [_clean_entity(h) for h in _as_list(raw.get("hosts")) if h],
        "users": [str(u) for u in _as_list(raw.get("users")) if u],
        "sources": [str(s) for s in _as_list(raw.get("incident_sources")) if s],
        "alert_count": raw.get("alert_count"),
        "url": raw.get("xdr_url"),
    }


def norm_alert(raw: dict) -> dict:
    return {
        "id": str(_first(raw, "alert_id", "internal_id", "external_id")),
        "name": _first(raw, "name", "alert_name") or "(sem nome)",
        "category": str(_first(raw, "category", "alert_category") or ""),
        "severity": norm_severity(raw.get("severity")),
        "action": str(_first(raw, "action_pretty", "action", "alert_action_status") or ""),
        "host": _first(raw, "host_name", "agent_hostname"),
        "user": _first(raw, "user_name", "actor_effective_username"),
        "tactics": [str(t) for t in _as_list(raw.get("mitre_tactic_id_and_name"))],
        "techniques": [str(t) for t in _as_list(raw.get("mitre_technique_id_and_name"))],
        "created": _ms(_first(raw, "detection_timestamp", "source_insert_ts", "local_insert_ts",
                              "creation_time")),
        "case_id": _first(raw, "case_id", "incident_id"),
        "source": _first(raw, "source", "alert_source"),
        "local_ip": _first(raw, "local_ip", "action_local_ip"),
        "remote_ip": _first(raw, "remote_ip", "action_remote_ip"),
        "file": _first(raw, "action_file_path", "action_file_name", "file_path"),
    }


_MITRE_RE = re.compile(r"^\s*(T[A]?\d{4}(?:\.\d{3})?)\s*-\s*(.+)$")


def parse_mitre(text: str) -> tuple[str, str]:
    """'T1059.001 - Command and Scripting Interpreter: PowerShell' → (id, nome)."""
    m = _MITRE_RE.match(text or "")
    return (m.group(1), m.group(2).strip()) if m else ("", (text or "").strip())


# --- tempo ------------------------------------------------------------------

def local_midnight_ms(now_ms: int, days_back: int = 0) -> int:
    d = datetime.fromtimestamp(now_ms / 1000, TZ).date() - timedelta(days=days_back)
    return int(datetime(d.year, d.month, d.day, tzinfo=TZ).timestamp() * 1000)


# --- cabeçalho --------------------------------------------------------------

def is_open(inc: dict) -> bool:
    return inc["status"] in OPEN_STATUSES


def is_resolved(inc: dict) -> bool:
    return inc["status"].startswith("resolved")


def is_auto_resolved(inc: dict) -> bool:
    return is_resolved(inc) and "auto" in inc["status"]


def is_blocked(alert: dict) -> bool:
    a = alert["action"].upper()
    return "BLOCK" in a or "PREVENT" in a


# No tenant do GRA (2026-09-29) a categoria mais comum era «Spyware Detected
# via Anti-Spyware profile» (NGFW), não «Malware». Só com MALWARE o contador
# ficava a zero com milhares de bloqueios por dia.
MALWARE_WORDS = ("MALWARE", "SPYWARE", "VIRUS", "WILDFIRE", "RANSOM", "TROJAN")


def is_malware(alert: dict) -> bool:
    cat = alert["category"].upper()
    return any(w in cat for w in MALWARE_WORDS)


def severity_counts(incidents: list[dict], since: int | None = None) -> dict:
    """Casos abertos por severidade; só os criados desde `since`, se for dado."""
    c = Counter(i["severity"] for i in incidents
                if is_open(i) and (since is None or (i["created"] or 0) >= since))
    return {s: c.get(s, 0) for s in SEVERITIES}


def prevention(resolved: list[dict] | None, alerts: list[dict], now: int) -> dict:
    """`resolved` são as linhas de CortexClient.resolved_stats (24h, por
    estado); None enquanto a primeira consulta XQL não chegou."""
    since = now - DAY
    return {
        "auto_contained": None if resolved is None else
        sum(r["n"] for r in resolved if "auto" in r["status"]),
        "threats_blocked": sum(1 for a in alerts if (a["created"] or 0) >= since
                               and is_blocked(a) and is_malware(a)),
        "period": "últimas 24h",
    }


def mttr(resolved: list[dict] | None) -> dict:
    """Mean Time To Resolve: da criação do caso à resolução, casos resolvidos
    nas últimas 24h.

    Ficam de fora os resolvidos automaticamente e os duplicados. No GRA os
    automáticos foram ~5 000 num dia com média de ~10 min (2026-09-29): com
    eles, o MTTR descrevia o playbook, não a equipa.
    """
    rows = [r for r in (resolved or []) if "auto" not in r["status"]
            and "duplicate" not in r["status"] and r["avg_min"] is not None]
    n = sum(r["n"] for r in rows)
    minutes = round(sum(r["n"] * r["avg_min"] for r in rows) / n) if n else None
    return {"minutes": minutes, "n": n, "approx": False,
            "definition": "Mean Time To Resolve", "period": "últimas 24h",
            "ready": resolved is not None}


# --- volume -----------------------------------------------------------------

def volume(hours: list[dict], range_key: str, now: int) -> dict:
    """`hours` são as linhas de CortexClient.volume_hours: casos criados por
    hora UTC (época em horas) e severidade."""
    if range_key not in RANGES:
        raise ValueError(range_key)
    buckets = []
    if range_key == "24h":
        now_dt = datetime.fromtimestamp(now / 1000, TZ).replace(minute=0, second=0, microsecond=0)
        for k in range(23, -1, -1):
            start_dt = now_dt - timedelta(hours=k)
            start = int(start_dt.timestamp() * 1000)
            buckets.append({"start": start, "end": start + HOUR,
                            "label": "agora (parcial)" if k == 0 else f"{start_dt:%H}h",
                            "partial": k == 0})
    else:
        n = RANGES[range_key]
        for k in range(n - 1, -1, -1):
            start = local_midnight_ms(now, k)
            end = local_midnight_ms(now, k - 1) if k else now + 1
            d = datetime.fromtimestamp(start / 1000, TZ)
            buckets.append({"start": start, "end": end,
                            "label": "hoje (parcial)" if k == 0 else f"{WEEKDAYS_PT[d.weekday()]} {d.day}",
                            "date": d.date().isoformat(), "partial": k == 0})
    for b in buckets:
        for s in SEVERITIES:
            b[s] = 0
    lo = buckets[0]["start"]
    for h in hours:
        t, sev = h["hora"] * HOUR, norm_severity(h["severity"])
        if t < lo or sev not in SEVERITIES:
            continue
        for b in buckets:
            if b["start"] <= t < b["end"]:
                b[sev] += h["n"]
                break
    return {"range": range_key, "buckets": buckets}


# --- tabelas ----------------------------------------------------------------

def _priority_key(inc: dict):
    return (SEV_RANK.get(inc["severity"], 0), inc["created"] or 0)


# Casos detetados só pela firewall (PAN NGFW) saem do cabeçalho, da tabela e
# do briefing: são quase todos ruído — assinaturas disparadas por máquinas
# internas — e tapavam os que pedem atenção (pedido do Miguel, 2026-10-02;
# eram 5 de 16 na tabela). Um caso com outra fonte além da firewall fica:
# está corroborado. As «ameaças bloqueadas», o volume e o radar não mudam.
NOISE_SOURCES = {"pan ngfw"}


def is_noise(inc: dict) -> bool:
    srcs = {str(s).strip().lower() for s in inc.get("sources") or [] if s}
    return bool(srcs) and srcs <= NOISE_SOURCES


def without_noise(incidents: list[dict]) -> list[dict]:
    return [i for i in incidents if not is_noise(i)]


def is_noise_alert(alert: dict) -> bool:
    return str(alert.get("source") or "").strip().lower() in NOISE_SOURCES


def open_by_priority(incidents: list[dict]) -> list[dict]:
    return sorted((i for i in incidents if is_open(i)), key=_priority_key, reverse=True)


# A tabela «Casos» mostra só os abertos criados nos últimos 3 dias (pedido do
# Miguel, 2026-10-01): com os 90 dias da recolha, os mais graves eram casos de
# semanas atrás e os de hoje não chegavam ao ecrã. Os contadores e o briefing
# continuam com os 90 dias.
CASES_WINDOW_MS = 3 * DAY


def table_cases(incidents: list[dict], now: int) -> list[dict]:
    """Os casos da tabela, pela ordem em que aparecem: abertos, dos últimos
    3 dias, mais graves e mais recentes primeiro."""
    return [i for i in open_by_priority(without_noise(incidents))
            if (i["created"] or 0) >= now - CASES_WINDOW_MS]


def _entity(values: list[str]) -> str | None:
    if not values:
        return None
    return values[0] + (f" +{len(values) - 1}" if len(values) > 1 else "")


def case_rows(incidents: list[dict], extra: dict, now: int, limit: int,
              recent_alerts: list[dict] | None = None, denied: set | None = None) -> list[dict]:
    """Os casos abertos, mais graves e mais recentes primeiro.

    `extra` é {incident_id: resposta de get_incident_extra_data}. Um caso sem
    extra ainda aparece — com o que a listagem sabe — em vez de desaparecer
    enquanto espera pela sua vez de ser enriquecido.
    """
    by_case: dict[str, list[dict]] = {}
    for a in recent_alerts or []:
        if a["case_id"] not in (None, ""):
            by_case.setdefault(str(a["case_id"]), []).append(a)
    rows = []
    for inc in table_cases(incidents, now)[:limit]:
        data = extra.get(inc["id"]) or {}
        alerts = [norm_alert(a) for a in ((data.get("alerts") or {}).get("data") or [])
                  if isinstance(a, dict)]
        # O extra_data veio sem alertas para um caso que tinha um (visto a
        # 2026-09-29). Os alertas das últimas 24h que apontam para o caso
        # tapam esse buraco.
        if not alerts:
            alerts = by_case.get(inc["id"], [])
        techniques = Counter(t for a in alerts for t in a["techniques"]) \
            or Counter(inc["techniques"])
        tech_id, tech_name = parse_mitre(techniques.most_common(1)[0][0]) if techniques else ("", "")
        hosts = inc["hosts"] or sorted({a["host"] for a in alerts if a["host"]})
        users = inc["users"] or sorted({a["user"] for a in alerts if a["user"]})
        detection = (inc["sources"] or [a["source"] for a in alerts if a["source"]] or [None])[0]

        net = (data.get("network_artifacts") or {}).get("data") or []
        files = (data.get("file_artifacts") or {}).get("data") or []
        ips = sorted({ip for a in alerts for ip in (a["local_ip"], a["remote_ip"]) if ip}
                     | {n.get("network_remote_ip") for n in net if n.get("network_remote_ip")})
        rows.append({
            "id": inc["id"], "name": inc["name"], "severity": inc["severity"],
            "host": _entity(hosts), "user": _entity(users), "detection": detection,
            "technique_id": tech_id, "technique": tech_name,
            "created": inc["created"], "status": STATUS_PT.get(inc["status"], inc["status"]),
            # Um caso cujo detalhe a chave não pode abrir (403) não fica «a
            # carregar…» para sempre: mostra-se «—» onde falta.
            "enriched": bool(data) or bool(inc["techniques"]) or inc["id"] in (denied or ()),
            "details": {
                "ips": [str(i) for i in ips][:10],
                "files": sorted({str(f.get("file_name") or f.get("file_path"))
                                 for f in files if f.get("file_name") or f.get("file_path")}
                                | {str(a["file"]) for a in alerts if a["file"]})[:10],
                "destinations": sorted({str(n.get("network_domain") or n.get("network_remote_ip"))
                                        for n in net
                                        if n.get("network_domain") or n.get("network_remote_ip")})[:10],
                "issue_ids": [a["id"] for a in alerts][:20],
                "url": inc["url"],
            },
        })
    return rows


def top_alerts(alerts: list[dict], now: int, n: int) -> list[dict]:
    """Os alertas mais graves e recentes das últimas 24h, com as repetições
    juntas numa linha. No GRA (2026-09-29) as 8 linhas do topo eram todas o
    mesmo alerta de vulnerabilidade no mesmo host: o painel não mostrava nada
    de novo. Fica a ocorrência mais recente, com `count` e o id dela."""
    since = now - DAY
    recent = [a for a in alerts if (a["created"] or 0) >= since and a["severity"] in SEVERITIES]
    recent.sort(key=lambda a: (SEV_RANK[a["severity"]], a["created"] or 0), reverse=True)
    groups: dict[tuple, dict] = {}
    for a in recent:
        key = (a["severity"], a["name"], (a["host"] or "").lower(), a["user"])
        if key in groups:
            groups[key]["count"] += 1
            continue
        if len(groups) >= n:
            continue
        tid, tname = parse_mitre(a["techniques"][0]) if a["techniques"] else ("", "")
        groups[key] = {"id": a["id"], "name": a["name"], "severity": a["severity"],
                       "host": a["host"], "user": a["user"], "technique_id": tid,
                       "technique": tname, "created": a["created"], "case_id": a["case_id"],
                       "count": 1}
    return list(groups.values())


# --- MITRE ------------------------------------------------------------------

def _tactic_counts(tactic_hours: list[dict], lo: int, hi: int) -> Counter:
    c = Counter()
    for r in tactic_hours:
        if lo <= r["hora"] * HOUR < hi:
            tid = parse_mitre(r["tactic"])[0]
            if tid:
                c[tid] += r["n"]
    return c


def mitre(tactic_hours: list[dict], techniques: list[dict], now: int, days: int = 7) -> dict:
    """Casos (não alertas) por tática e as técnicas mais frequentes. Um caso
    com duas táticas conta nas duas."""
    tactics = _tactic_counts(tactic_hours, now - days * DAY, now + HOUR)
    return {
        "period": f"casos · últimos {days} dias",
        "tactics": [{"id": tid, "name": name, "count": tactics.get(tid, 0)} for tid, name in TACTICS],
        "techniques": [{"id": parse_mitre(t["technique"])[0], "name": parse_mitre(t["technique"])[1],
                        "count": t["n"]} for t in techniques],
    }


def radar(tactic_hours: list[dict], now: int) -> dict:
    """Hoje (desde a meia-noite dos Açores) contra a média diária dos 7 dias
    completos anteriores, por tática."""
    today0, yday0, week0 = (local_midnight_ms(now), local_midnight_ms(now, 1),
                            local_midnight_ms(now, 7))
    today = _tactic_counts(tactic_hours, today0, now + HOUR)
    yday = _tactic_counts(tactic_hours, yday0, today0)
    week = _tactic_counts(tactic_hours, week0, today0)
    # «week» (o total dos 7 dias) vai junto: com ele o ecrã faz a média e a
    # variação sem o arredondamento do «avg7d».
    axes = [{"id": tid, "name": TACTIC_PT[tid], "today": today[tid],
             "avg7d": round(week[tid] / 7, 1), "week": week[tid], "yesterday": yday[tid]}
            for tid in RADAR_AXES]
    lead = max(axes, key=lambda x: x["today"])
    highlight = None
    if lead["today"] > 0:
        change = (round((lead["today"] - lead["yesterday"]) / lead["yesterday"] * 100)
                  if lead["yesterday"] else None)
        highlight = {"id": lead["id"], "name": lead["name"], "today": lead["today"],
                     "yesterday": lead["yesterday"], "change_pct": change}
    return {"axes": axes, "highlight": highlight}
