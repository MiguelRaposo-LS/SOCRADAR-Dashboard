"""O «Briefing»: 4-6 linhas com o que exige ação primeiro, geradas por um
modelo local no Ollama, uma vez por hora.

- Os factos saem dos mesmos números que o resto do ecrã já calculou; o
  briefing não pede nada ao Cortex.
- Gera-se à hora certa (08:00, 09:00…) e uma vez logo no arranque, numa
  thread própria (ver server.py). O pedido do browser só lê o último.
- Se o Ollama falhar, fica o briefing anterior e o problema vai para o log.
  Só quando ainda não há nenhum é que se monta um texto por regras — um
  painel vazio numa parede de SOC diz menos do que um texto simples.
- Um número no texto que não esteja nos factos faz o texto ser descartado:
  um modelo de 3B pode inventar contagens, e aqui ninguém o apanharia.
"""
from __future__ import annotations

import logging
import re
import threading
from datetime import datetime

import requests

import aggregate as agg

log = logging.getLogger(__name__)

SYSTEM_PROMPT = (
    "És um assistente de SOC. Resume os dados abaixo em 4 a 6 linhas curtas, "
    "em português, começando pelo ponto que exige ação mais urgente. "
    "Não inventes números fora dos que te são dados. Não uses saudações, "
    "não escrevas introduções nem conclusões, só os pontos."
)

SEV_PT = {"critical": "crítico", "high": "alto", "medium": "médio", "low": "baixo"}


def _age(ms: int | None, now: int) -> str:
    if not ms:
        return "?"
    m = (now - ms) // agg.MIN
    return f"{m} min" if m < 60 else (f"{m // 60} h" if m < 2880 else f"{m // 1440} dias")


def facts(incidents, alerts, metrics, now) -> dict:
    """Os números que o ecrã está a mostrar agora, com as mesmas funções.
    Sem o que vem só da firewall (aggregate.is_noise), como o ecrã; as
    ameaças bloqueadas continuam a contar com ela, como no cabeçalho."""
    incidents = agg.without_noise(incidents)
    open_ = agg.open_by_priority(incidents)
    hosts: dict[str, int] = {}
    for i in open_:
        for h in i["hosts"]:
            hosts[h] = hosts.get(h, 0) + 1
    mitre = agg.mitre(metrics["tactics"], metrics["techniques"], now)
    return {
        "abertos": agg.severity_counts(incidents),
        "prevencao": agg.prevention(metrics["resolved"], alerts, now),
        "mttr": agg.mttr(metrics["resolved"]),
        "casos": [{"id": i["id"], "nome": i["name"], "severidade": i["severity"],
                   "estado": agg.STATUS_PT.get(i["status"], i["status"]),
                   "hosts": i["hosts"][:3], "idade": _age(i["created"], now)}
                  for i in open_ if i["severity"] in ("critical", "high")][:6],
        "hosts_varios": [(h, n) for h, n in sorted(hosts.items(), key=lambda x: -x[1]) if n > 1][:3],
        "alertas": agg.top_alerts([a for a in alerts if not agg.is_noise_alert(a)], now, 5),
        "taticas": sorted((t for t in mitre["tactics"] if t["count"]), key=lambda t: -t["count"])[:4],
        "tecnicas": mitre["techniques"][:3],
        "radar": agg.radar(metrics["tactics"], now)["highlight"],
    }


def format_facts(f: dict) -> str:
    """Os factos em texto simples, uma linha cada — mais fácil para um modelo
    pequeno do que JSON, e é daqui que sai a lista de números permitidos."""
    a, p, m = f["abertos"], f["prevencao"], f["mttr"]
    out = [f"Casos abertos: {a['critical']} críticos, {a['high']} altos, "
           f"{a['medium']} médios, {a['low']} baixos."]
    if p["auto_contained"] is not None:
        out.append(f"Últimas 24h: {p['auto_contained']} casos resolvidos automaticamente, "
                   f"{p['threats_blocked']} ameaças bloqueadas.")
    if m["minutes"] is not None:
        out.append(f"Tempo médio de resolução (24h): {m['minutes']} minutos, em {m['n']} casos.")
    if f["casos"]:
        out.append("Casos graves abertos, do mais urgente para o menos:")
        for c in f["casos"]:
            out.append(f"- caso {c['id']}, {SEV_PT[c['severidade']]}, {c['estado'].lower()}, "
                       f"«{c['nome']}», hosts: {', '.join(c['hosts']) or 'desconhecido'}, "
                       f"aberto há {c['idade']}.")
    for h, n in f["hosts_varios"]:
        out.append(f"O host {h} tem {n} casos abertos em simultâneo.")
    if f["alertas"]:
        out.append("Alertas mais graves das últimas 24h:")
        for al in f["alertas"]:
            rep = f", repetido {al['count']} vezes" if al["count"] > 1 else ""
            out.append(f"- {SEV_PT[al['severity']]}: «{al['name']}» em {al['host'] or 'host desconhecido'}{rep}.")
    if f["taticas"]:
        out.append("Táticas MITRE mais frequentes nos casos dos últimos 7 dias: "
                   + ", ".join(f"{t['name']} ({t['count']})" for t in f["taticas"]) + ".")
    if f["tecnicas"]:
        out.append("Técnicas mais frequentes: "
                   + ", ".join(f"{t['id']} {t['name']} ({t['count']})" for t in f["tecnicas"]) + ".")
    r = f["radar"]
    if r:
        out.append(f"Tática mais ativa hoje: {r['name']}, {r['today']} casos (ontem: {r['yesterday']}).")
    return "\n".join(out)


def rule_based(f: dict) -> list[str]:
    """Só para quando ainda não há nenhum briefing do modelo."""
    lines = []
    sev = f["abertos"]
    crit = [c for c in f["casos"] if c["severidade"] == "critical"]
    if crit:
        c = crit[0]
        lines.append(f"{sev['critical']} caso(s) crítico(s) aberto(s) — começar por #{c['id']} "
                     f"«{c['nome']}» em {', '.join(c['hosts']) or 'host desconhecido'} (há {c['idade']}).")
    untouched = [c for c in f["casos"] if c["estado"] == "Novo"]
    if untouched:
        lines.append("Casos graves ainda sem análise iniciada: "
                     + ", ".join(f"#{c['id']}" for c in untouched[:4]) + ".")
    if f["hosts_varios"]:
        h, n = f["hosts_varios"][0]
        lines.append(f"{h} tem {n} casos abertos em simultâneo — verificar se é o mesmo ataque.")
    r = f["radar"]
    if r:
        lines.append(f"Tática mais ativa hoje: {r['name']}, {r['today']} casos (ontem: {r['yesterday']}).")
    if sev["high"]:
        lines.append(f"{sev['high']} caso(s) de severidade alta em aberto.")
    return lines[:6] or ["Sem casos críticos ou altos em aberto."]


# Números com separador de milhares («5 447», «5.447») contam como um só.
_NUM = re.compile(r"\d{1,3}(?:[ .  ]\d{3})+(?!\d)|\d+(?:,\d+)?")


def _numbers(text: str) -> set[str]:
    return {re.sub(r"[ .  ]", "", n) for n in _NUM.findall(text)}


def invented_numbers(answer: str, source: str) -> set[str]:
    """Números do texto do modelo que não aparecem nos factos. A numeração da
    lista («1.», «2)») não conta. Números pequenos não têm exceção: o
    llama3.2:3b escreveu «4 novos casos abertos» sem isso estar nos dados
    (2026-09-30), e passou enquanto os números até 6 eram aceites."""
    body = re.sub(r"(?m)^\s*\d+[.)]\s*", "", answer)
    allowed = _numbers(source)
    return {n for n in _numbers(body) if n not in allowed}


def clean_lines(text: str) -> list[str]:
    lines = []
    for ln in text.splitlines():
        ln = re.sub(r"^\s*(?:[-•*]|\d+[.)])\s*", "", ln).strip().strip("*").strip()
        if ln:
            lines.append(ln)
    return lines[:6]


def _why(exc: Exception) -> str:
    """O motivo, para o log. Num erro HTTP, o Ollama explica no corpo (ex.:
    «model "llama3.2:3b" not found, try pulling it first») — é isso que diz
    o que fazer."""
    if isinstance(exc, requests.HTTPError) and exc.response is not None:
        try:
            detail = exc.response.json().get("error")
        except ValueError:
            detail = None
        return f"HTTP {exc.response.status_code}" + (f" ({detail})" if detail else "")
    return str(exc) if isinstance(exc, ValueError) else type(exc).__name__


def motivo(exc: Exception, url: str, model: str, timeout: int) -> str:
    """O motivo para o ecrã, em português e com o que fazer. No PC da TV não
    há quem leia o log: «modelo falhou» sozinho não dizia por onde pegar."""
    if isinstance(exc, requests.Timeout):
        return (f"o modelo demorou mais de {timeout} s a responder — sem GPU é normal; "
                "aumentar OLLAMA_TIMEOUT no .env")
    if isinstance(exc, requests.ConnectionError):
        return f"o Ollama não responde em {url} — está instalado e a correr? (OLLAMA_URL no .env)"
    if isinstance(exc, requests.HTTPError) and exc.response is not None and exc.response.status_code == 404:
        return f"o modelo {model} não está no Ollama — correr: ollama pull {model}"
    return _why(exc)


class Briefing:
    def __init__(self, url: str, model: str, timeout: int = 120):
        self.url = url.rstrip("/")
        self.model = model
        self.timeout = timeout
        self.lock = threading.Lock()
        self.current: dict | None = None

    def _ollama(self, user_prompt: str) -> str:
        r = requests.post(f"{self.url}/api/chat", timeout=self.timeout, json={
            "model": self.model,
            "messages": [{"role": "system", "content": SYSTEM_PROMPT},
                         {"role": "user", "content": user_prompt}],
            "stream": False,
            "options": {"temperature": 0.2},
        })
        r.raise_for_status()
        return r.json()["message"]["content"].strip()

    def generate(self, incidents, alerts, metrics, now: int) -> bool:
        """Gera o briefing; devolve False se o modelo falhou (para se tentar
        outra vez mais cedo)."""
        f = facts(incidents, alerts, metrics, now)
        prompt = format_facts(f)
        try:
            text = self._ollama(prompt)
            bad = invented_numbers(text, prompt)
            if bad:
                raise ValueError(f"números que não estão nos dados: {', '.join(sorted(bad))}")
            lines = clean_lines(text)
            if not lines:
                raise ValueError("resposta vazia")
        except Exception as exc:  # noqa: BLE001 — o briefing nunca derruba nada
            with self.lock:
                first = self.current is None or self.current["source"] == "regras"
                why = motivo(exc, self.url, self.model, self.timeout)
                if first:
                    # Também quando o que lá está já é por regras: refaz-se com
                    # os números de agora, em vez de ficar o texto do arranque.
                    self.current = {"lines": rule_based(f), "generated_at": now, "source": "regras",
                                    "note": f"modelo falhou: {why}"}
                else:
                    self.current["note"] = f"a última geração falhou: {why}"
            log.warning("Briefing: o Ollama (%s em %s) falhou: %s — %s.", self.model, self.url,
                        _why(exc), "texto por regras" if first else "fica o anterior")
            return False
        with self.lock:
            self.current = {"lines": lines, "generated_at": now, "source": self.model, "note": None}
        log.info("Briefing gerado por %s (%d linhas).", self.model, len(lines))
        return True

    def save(self, path) -> None:
        import json, os
        with self.lock:
            if not self.current:
                return
            data = json.dumps(self.current, ensure_ascii=False)
        tmp = path.with_suffix(".tmp")
        fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(data)
        os.replace(tmp, path)

    def load(self, path) -> None:
        """O último briefing, para o painel não ficar vazio depois de um
        reinício enquanto o próximo não é gerado."""
        import json
        try:
            cur = json.loads(path.read_text(encoding="utf-8"))
        except FileNotFoundError:
            return
        except Exception as exc:  # noqa: BLE001
            log.warning("Briefing guardado ilegível (%s).", type(exc).__name__)
            return
        with self.lock:
            self.current = cur

    def payload(self) -> dict:
        """O que /api/briefing devolve: o texto e quando foi gerado."""
        with self.lock:
            cur = dict(self.current) if self.current else None
        if not cur:
            return {"texto": None, "gerado_em": None, "fonte": None, "nota": None}
        return {
            "texto": "\n".join(cur["lines"]),
            "gerado_em": datetime.fromtimestamp(cur["generated_at"] / 1000, agg.TZ).isoformat(timespec="seconds"),
            "fonte": cur["source"],
            "nota": cur["note"],
        }
