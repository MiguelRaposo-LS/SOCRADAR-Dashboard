"""Ataques bloqueados ou desafiados pela Cloudflare, lidos do Cortex XSIAM.

Porquê a Cloudflare, e não as firewalls Palo Alto: medido a 2026-10-01, as
Palo Alto que chegam ao XSIAM são internas (o tráfego negado vinha 100% de
IPs internos e só havia ~2500 ameaças de origem externa por dia). A Cloudflare
está à frente dos sites do GRA, virada para a Internet, e o dataset
`cloudflare_waf_raw` traz país, cidade e coordenadas de cada cliente.

Cada consulta lê um minuto inteiro, já completo: os eventos chegam ao XSIAM
com 13 a 162 s de atraso (medido, média 86 s), por isso lê-se o minuto que
acabou há ATRASO_MS. Com a consulta (~20 s) e a reprodução ao longo do
minuto, o mapa mostra cada ataque ~5 min depois de acontecer (medido a
2026-10-01), mas ao ritmo a que aconteceram. Custo medido: ~0,0005 de quota por consulta.
"""
from __future__ import annotations

import json
import logging
import time

log = logging.getLogger(__name__)

JANELA_MS = 60_000
# 162 s foi o maior atraso medido; com margem, para o minuto lido estar inteiro.
ATRASO_MS = 4 * 60_000
# Depois de uma paragem, não se tenta recuperar mais do que isto: o mapa é do
# presente, e cada minuto em atraso custa uma consulta.
RECUPERAR_MAX_MS = 10 * 60_000

# Ponta Delgada: o destino dos arcos. Os sites são do GRA; a Cloudflare não
# diz onde fica a origem, e um ponto fixo nos Açores é o que o ecrã quer dizer.
ACORES = {"latitude": 37.7412, "longitude": -25.6756, "country": "PT", "country_code": "PT"}

# «skip», «log» e «allow» deixaram passar; «managedChallengeBypassed» é quem
# passou o desafio — também entrou. Nenhum é um ataque travado.
QUERY = """dataset = cloudflare_waf_raw
| filter SecurityAction != null and SecurityAction != ""
    and SecurityAction not in ("skip", "log", "allow", "managedChallengeBypassed")
| comp count() as n, min(_time) as t by ClientIP, ClientCountry, ClientCity, ClientLatitude,
    ClientLongitude, SecurityAction, SecuritySources, SecurityRuleDescription, ClientRequestHost"""

DESAFIOS = {"managedchallenge", "challenge", "jschallenge"}


def _fontes(raw) -> list[str]:
    """SecuritySources vem como texto JSON («["firewallManaged"]»)."""
    if isinstance(raw, list):
        return [str(s) for s in raw]
    try:
        v = json.loads(raw or "[]")
        return [str(s) for s in v] if isinstance(v, list) else []
    except (ValueError, TypeError):
        return []


def classificar(acao: str, fontes: list[str], regra: str) -> tuple[str, str]:
    """(severidade, tipo) a partir do que a Cloudflare fez e de que motor o
    fez. Substitui o classificador ML do projeto original, que dependia de
    pontuações do AbuseIPDB (inventadas sem chave)."""
    a = (acao or "").lower()
    f = {s.lower() for s in fontes}
    if any("ddos" in s for s in f):
        return "critical", "DDoS (camada 7)"
    if a in DESAFIOS:
        return "low", regra or "Desafio"
    if "firewallmanaged" in f or "waf" in f:
        return "high", regra or "WAF: regra gerida"
    if "ratelimit" in f:
        return "medium", regra or "Limite de pedidos"
    if "country" in f:
        return "medium", regra or "Bloqueio por país"
    return "medium", regra or "Bloqueado"


def _num(v) -> float | None:
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def para_ataque(r: dict) -> dict | None:
    """Uma linha do XQL → um ataque no formato que o frontend desenha.
    Sem coordenadas não se desenha: inventar um sítio era o que o projeto
    original fazia, e um ataque real num sítio falso engana quem olha."""
    lat, lng = _num(r.get("ClientLatitude")), _num(r.get("ClientLongitude"))
    if lat is None or lng is None:
        return None
    fontes = _fontes(r.get("SecuritySources"))
    sev, tipo = classificar(r.get("SecurityAction"), fontes, r.get("SecurityRuleDescription") or "")
    t = int(r.get("t") or 0)
    pais = (r.get("ClientCountry") or "").upper()
    return {
        "id": f"{t}-{r.get('ClientIP')}-{r.get('SecurityAction')}-{r.get('SecurityRuleDescription')}",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(t / 1000)),
        "t": t,
        "source": {"ip": r.get("ClientIP"), "latitude": lat, "longitude": lng,
                   "country": pais, "country_code": pais, "city": r.get("ClientCity") or ""},
        "target": {**ACORES, "city": r.get("ClientRequestHost") or ""},
        "attack_type": tipo,
        "severity": sev,
        "action": r.get("SecurityAction"),
        "engines": fontes,
        "count": int(r.get("n") or 1),
    }


class Feed:
    """Lê um minuto de cada vez e diz que minuto é o próximo."""

    def __init__(self, client, agora_ms=lambda: int(time.time() * 1000)):
        self.client = client
        self.agora_ms = agora_ms
        self.cursor: int | None = None      # início do próximo minuto a ler
        self.ultimo_ok: int | None = None
        self.ultimo_erro: str | None = None

    def proxima_janela(self) -> tuple[int, int] | None:
        """O próximo minuto completo, ou None se ainda não acabou de chegar."""
        limite = self.agora_ms() - ATRASO_MS
        limite -= limite % JANELA_MS
        if self.cursor is None or self.cursor < limite - RECUPERAR_MAX_MS:
            self.cursor = limite - JANELA_MS
        if self.cursor + JANELA_MS > limite:
            return None
        return self.cursor, self.cursor + JANELA_MS

    def ler(self) -> tuple[tuple[int, int], list[dict]] | None:
        janela = self.proxima_janela()
        if janela is None:
            return None
        linhas = self.client.xql(QUERY, *janela)   # erros sobem: quem chama decide
        self.cursor = janela[1]
        self.ultimo_ok, self.ultimo_erro = self.agora_ms(), None
        ataques = [a for a in (para_ataque(r) for r in linhas) if a]
        ataques.sort(key=lambda a: a["t"])
        if len(ataques) < len(linhas):
            log.info("Minuto %s: %d linha(s) sem coordenadas ficaram de fora.",
                     time.strftime("%H:%M", time.gmtime(janela[0] / 1000)), len(linhas) - len(ataques))
        return janela, ataques
