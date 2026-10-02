"""Uma fonte falsa com a forma das respostas da API do XSIAM.

Serve para montar o ecrã sem tenant e para os testes. Passa pelo mesmo
caminho que os dados reais (normalização, agregação), por isso o que funciona
aqui funciona lá — com a ressalva de que os nomes dos campos foram escritos a
partir da documentação e de uma exportação de alerta, não de um tenant vivo.

Quando está ativa, o ecrã diz «DADOS DE DEMONSTRAÇÃO» em letra grande: um
monitor de parede com números inventados, sem aviso, era pior do que nenhum.
"""
from __future__ import annotations

import random
import time

DAY = 86_400_000

HOSTS = ["pdl-ws-0142", "ang-ws-0033", "srv-ad-01", "srv-exch-02", "hor-ws-0210",
         "esx-lab-01", "srv-web-07", "pdl-ws-0098", "srv-sql-03", "sjo-ws-0017"]
USERS = ["GRA\\ana.melo", "GRA\\joao.furtado", "GRA\\svc_backup", "GRA\\rita.sousa",
         "GRA\\pedro.ávila", "GRA\\administrator", "GRA\\carla.medeiros"]
SOURCES = ["XDR Agent", "Correlation", "Firewall", "Identity Analytics", "XDR Analytics BIOC"]
TECHNIQUES = [
    ("TA0001 - Initial Access", "T1566.001 - Phishing: Spearphishing Attachment", "Anexo malicioso em e-mail"),
    ("TA0001 - Initial Access", "T1190 - Exploit Public-Facing Application", "Exploração de aplicação web"),
    ("TA0002 - Execution", "T1059.001 - Command and Scripting Interpreter: PowerShell", "Execução de PowerShell ofuscado"),
    ("TA0002 - Execution", "T1204.002 - User Execution: Malicious File", "Ficheiro malicioso executado"),
    ("TA0003 - Persistence", "T1053.005 - Scheduled Task/Job: Scheduled Task", "Tarefa agendada suspeita"),
    ("TA0004 - Privilege Escalation", "T1068 - Exploitation for Privilege Escalation", "Escalada de privilégios local"),
    ("TA0005 - Defense Evasion", "T1562.001 - Impair Defenses: Disable or Modify Tools", "Desativação do agente EDR"),
    ("TA0006 - Credential Access", "T1110.003 - Brute Force: Password Spraying", "Password spraying contra o AD"),
    ("TA0006 - Credential Access", "T1003.001 - OS Credential Dumping: LSASS Memory", "Dump de credenciais LSASS"),
    ("TA0007 - Discovery", "T1087.002 - Account Discovery: Domain Account", "Enumeração de contas do domínio"),
    ("TA0008 - Lateral Movement", "T1021.002 - Remote Services: SMB/Windows Admin Shares", "Movimento lateral via SMB"),
    ("TA0011 - Command and Control", "T1071.001 - Application Layer Protocol: Web Protocols", "Ligação a domínio de C2 conhecido"),
    ("TA0010 - Exfiltration", "T1041 - Exfiltration Over C2 Channel", "Saída anómala de dados"),
    ("TA0040 - Impact", "T1485 - Data Destruction", "VM apagada no ESXi"),
    ("TA0043 - Reconnaissance", "T1595.002 - Active Scanning: Vulnerability Scanning", "Varrimento de vulnerabilidades"),
]
CATEGORIES = ["Malware", "Credential Access", "Execution", "Lateral Movement", "Tampering"]
SEV = ["critical", "high", "high", "medium", "medium", "medium", "low", "low", "low", "low"]
RESOLVED = ["resolved_true_positive", "resolved_false_positive", "resolved_auto",
            "resolved_known_issue", "resolved_duplicate", "resolved_other"]


class DemoSource:
    def __init__(self, seed: int = 7, now_ms: int | None = None):
        self._rnd = random.Random(seed)
        self._now = now_ms
        self._incidents: list[dict] = []
        self._alerts: list[dict] = []
        self._extra: dict[str, dict] = {}
        self._next_inc = 4100
        self._next_alert = 26_300_000
        start = self.now() - 90 * DAY
        t = start
        while t < self.now():
            t += int(self._rnd.expovariate(1 / (DAY / 14)))  # ~14 casos por dia
            if t < self.now():
                self._new_incident(t)
        self._last_tick = self.now()

    def now(self) -> int:
        return self._now if self._now is not None else int(time.time() * 1000)

    def _new_incident(self, t: int) -> None:
        r = self._rnd
        iid = str(self._next_inc)
        self._next_inc += 1
        sev = r.choice(SEV)
        age = self.now() - t
        # Quanto mais antigo, mais provável estar resolvido.
        resolved = r.random() < min(0.97, age / (2 * DAY))
        status = r.choice(RESOLVED) if resolved else r.choice(["new", "new", "under_investigation"])
        res_t = min(self.now(), t + int(r.uniform(3, 240) * 60_000)) if resolved else None
        host, user = r.choice(HOSTS), r.choice(USERS)
        n_alerts = r.randint(1, 4)
        alerts = []
        for _ in range(n_alerts):
            tactic, tech, name = r.choice(TECHNIQUES)
            aid = str(self._next_alert)
            self._next_alert += 1
            cat = r.choice(CATEGORIES)
            blocked = r.random() < (0.7 if cat == "Malware" else 0.2)
            at = t + r.randint(0, 600_000)
            alert = {
                "alert_id": aid, "name": name,
                "category": "Malware" if "Ficheiro" in name or "Anexo" in name else cat,
                "severity": sev if r.random() < 0.7 else r.choice(SEV),
                "action": "BLOCKED" if blocked else "DETECTED",
                "action_pretty": "Prevented (Blocked)" if blocked else "Detected",
                "host_name": host, "user_name": user,
                "mitre_tactic_id_and_name": [tactic], "mitre_technique_id_and_name": [tech],
                "detection_timestamp": at, "local_insert_ts": at, "case_id": int(iid),
                "source": r.choice(SOURCES),
                "local_ip": f"10.{r.randint(10, 60)}.{r.randint(0, 255)}.{r.randint(2, 250)}",
                "remote_ip": f"{r.randint(20, 220)}.{r.randint(0, 255)}.{r.randint(0, 255)}.{r.randint(1, 254)}",
                "action_file_path": r.choice([None, "C:\\Users\\Public\\upd.ps1",
                                              "C:\\Windows\\Temp\\svc.exe"]),
            }
            alerts.append(alert)
        self._alerts.extend(alerts)
        self._incidents.append({
            "incident_id": iid, "incident_name": alerts[0]["name"], "severity": sev,
            "status": status, "creation_time": t, "modification_time": res_t or t,
            "resolved_timestamp": res_t, "hosts": [f"{host}:{r.getrandbits(64):016x}"],
            "users": [user], "incident_sources": [alerts[0]["source"]],
            "alert_count": n_alerts, "xdr_url": None,
            "mitre_tactics_ids_and_names": sorted({t for a in alerts for t in a["mitre_tactic_id_and_name"]}),
            "mitre_techniques_ids_and_names": sorted({t for a in alerts for t in a["mitre_technique_id_and_name"]}),
        })
        self._extra[iid] = {
            "incident": self._incidents[-1],
            "alerts": {"total_count": n_alerts, "data": alerts},
            "network_artifacts": {"data": [{"network_remote_ip": a["remote_ip"],
                                            "network_domain": r.choice([None, "cdn-update.top",
                                                                        "login-microsoft.co"])}
                                           for a in alerts]},
            "file_artifacts": {"data": [{"file_name": a["action_file_path"].split("\\")[-1]}
                                        for a in alerts if a["action_file_path"]]},
        }

    def _tick(self) -> None:
        """Faz o tempo andar: chegam casos novos e alguns abertos são fechados."""
        now = self.now()
        t = self._last_tick
        while True:
            t += int(self._rnd.expovariate(1 / (DAY / 14)))
            if t >= now:
                break
            self._new_incident(t)
        for inc in self._incidents:
            if inc["status"] in ("new", "under_investigation") and self._rnd.random() < 0.01:
                inc["status"] = self._rnd.choice(RESOLVED)
                inc["resolved_timestamp"] = inc["modification_time"] = now
        self._last_tick = now

    # A mesma interface que CortexClient.
    def incidents_created_between(self, since_ms, until_ms, max_pages):
        self._tick()
        return [i for i in self._incidents if since_ms <= i["creation_time"] <= until_ms], False

    def incidents_modified_since(self, since_ms, max_pages):
        self._tick()
        return [i for i in self._incidents if i["modification_time"] >= since_ms], False

    def open_incidents(self, max_pages, since_ms=None):
        return [i for i in self._incidents if i["status"] in ("new", "under_investigation")
                and (since_ms is None or i["creation_time"] >= since_ms)], False

    def xql(self, query, relative_ms, limit=None):
        """Para a página dos dashboards exportados em modo demo: linhas
        inventadas com a forma de um «comp count() by …»."""
        r = random.Random(hash(query) & 0xFFFF)
        cats = ["Execução", "Persistência", "Movimento lateral", "Exfiltração", "Acesso inicial"]
        return [{"categoria": c, "n": r.randint(3, 120)} for c in cats]

    # Command Center em modo demo: as mesmas formas que o CortexClient devolve.
    def cases_by_status_severity(self, since_ms):
        c = {}
        for i in self._incidents:
            if i["creation_time"] >= since_ms:
                k = (i["status"], i["severity"].upper())
                c[k] = c.get(k, 0) + 1
        return [{"status": st, "severity": sv, "n": n} for (st, sv), n in c.items()]

    def open_by_severity_all(self):
        return self.cases_by_status_severity(0)

    def ingestion(self, since_ms, until_ms=None):
        r = random.Random(since_ms // 3_600_000)
        until_ms = until_ms or self.now()
        hours = [{"hora": h, "events": r.uniform(2.2e7, 3.4e7), "bytes": r.uniform(1.5e10, 2.3e10)}
                 for h in range(since_ms // 3_600_000, until_ms // 3_600_000)]
        return {"events": sum(h["events"] for h in hours), "bytes": sum(h["bytes"] for h in hours), "hours": hours}

    def data_sources(self, since_ms, top=10):
        r = random.Random(7)
        names = [("PANW", "NGFW"), ("VMware", "vCenter"), ("Microsoft", "Windows"), ("F5", "BIG-IP"),
                 ("Silverfort", "Admin"), ("Cisco", "IP Flow"), ("Microsoft", "NPS")]
        return sorted(({"vendor": v, "product": p, "events": r.uniform(1e6, 3e8), "bytes": r.uniform(1e8, 2e11)}
                       for v, p in names), key=lambda x: -x["events"])

    def count_open_before(self, until_ms):
        return sum(1 for i in self._incidents if i["status"] in ("new", "under_investigation")
                   and i["creation_time"] < until_ms)

    def alerts_inserted_since(self, since_ms, max_pages):
        return [a for a in self._alerts if a["local_insert_ts"] >= since_ms], False

    def alerts_created_since(self, since_ms, max_pages):
        return [a for a in self._alerts if a["detection_timestamp"] >= since_ms], False

    def incident_extra_data(self, incident_id, alerts_limit=50):
        return self._extra.get(str(incident_id), {})

    # As mesmas quatro métricas que o CortexClient pede por XQL, calculadas
    # sobre os casos inventados — com a forma exata das linhas do XQL.
    def volume_hours(self, since_ms):
        self._tick()
        c = {}
        for i in self._incidents:
            if i["creation_time"] >= since_ms:
                k = (i["creation_time"] // 3_600_000, i["severity"].upper())
                c[k] = c.get(k, 0) + 1
        return [{"hora": h, "severity": s, "n": n} for (h, s), n in c.items()]

    def trend_hours(self, since_ms):
        # Como volume_hours, sem os casos só da firewall (cortex_client.trend_hours).
        c = {}
        for i in self._incidents:
            if i["creation_time"] >= since_ms and set(i.get("incident_sources") or []) != {"PAN NGFW"}:
                k = (i["creation_time"] // 3_600_000, i["severity"].upper())
                c[k] = c.get(k, 0) + 1
        return [{"hora": h, "severity": s, "n": n} for (h, s), n in c.items()]

    def tactic_hours(self, since_ms):
        c = {}
        for i in self._incidents:
            if i["creation_time"] >= since_ms:
                for t in i["mitre_tactics_ids_and_names"]:
                    k = (i["creation_time"] // 3_600_000, t)
                    c[k] = c.get(k, 0) + 1
        return [{"hora": h, "tactic": t, "n": n} for (h, t), n in c.items()]

    def top_techniques(self, since_ms, top=10):
        c = {}
        for i in self._incidents:
            if i["creation_time"] >= since_ms:
                for t in i["mitre_techniques_ids_and_names"]:
                    c[t] = c.get(t, 0) + 1
        return [{"technique": t, "n": n} for t, n in sorted(c.items(), key=lambda x: -x[1])[:top]]

    def resolved_stats(self, since_ms):
        c = {}
        for i in self._incidents:
            r = i.get("resolved_timestamp")
            if r and r >= since_ms:
                n, tot = c.get(i["status"], (0, 0.0))
                c[i["status"]] = (n + 1, tot + (r - i["creation_time"]) / 60_000)
        return [{"status": s, "n": n, "avg_min": tot / n} for s, (n, tot) in c.items()]
