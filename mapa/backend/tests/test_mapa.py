"""Testes do mapa de ataques. Nenhum toca no XSIAM: o cliente é falso."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import feed as fd  # noqa: E402
from xsiam import XsiamError  # noqa: E402

MIN = 60_000
AGORA = 1_790_000_000_000 - (1_790_000_000_000 % MIN) + 30_000   # a meio de um minuto


def linha(**kw):
    base = {"ClientIP": "203.0.113.7", "ClientCountry": "in", "ClientCity": "Kohima",
            "ClientLatitude": "25.67", "ClientLongitude": "94.11", "SecurityAction": "block",
            "SecuritySources": '["firewallCustom"]', "SecurityRuleDescription": "Block Bad Countries",
            "ClientRequestHost": "exemplo.azores.gov.pt", "n": 3, "t": AGORA - 5 * MIN}
    return {**base, **kw}


class XsiamFalso:
    def __init__(self, linhas=None, erro=None):
        self.linhas, self.erro, self.janelas = linhas or [], erro, []
        self.last_quota = 33.5

    def xql(self, query, de, ate):
        self.janelas.append((de, ate))
        if self.erro:
            raise self.erro
        return self.linhas


def test_classificacao_vem_do_que_a_cloudflare_fez():
    assert fd.classificar("block", ["l7ddos"], "") == ("critical", "DDoS (camada 7)")
    assert fd.classificar("managedChallenge", ["firewallManaged"], "Manage likely bots") == ("low", "Manage likely bots")
    assert fd.classificar("block", ["firewallManaged"], "") == ("high", "WAF: regra gerida")
    assert fd.classificar("block", ["firewallCustom"], "Block ASNs (3)") == ("medium", "Block ASNs (3)")
    assert fd.classificar("block", ["country"], "")[1] == "Bloqueio por país"


def test_linha_vira_ataque_com_destino_nos_acores():
    a = fd.para_ataque(linha())
    assert a["source"]["latitude"] == 25.67 and a["source"]["country"] == "IN"
    assert a["target"]["latitude"] == fd.ACORES["latitude"] and a["target"]["city"] == "exemplo.azores.gov.pt"
    assert a["severity"] == "medium" and a["count"] == 3 and a["engines"] == ["firewallCustom"]


def test_desafio_resolvido_nao_e_um_ataque_travado():
    # Apareciam como Alto (T1190): quem resolve o desafio entra.
    for acao in ("managedChallengeNonInteractiveSolved", "managedChallengeInteractiveSolved",
                 "managedChallengeBypassed", "skip"):
        assert fd.para_ataque(linha(SecurityAction=acao, SecuritySources='["firewallManaged"]')) is None
    assert fd.para_ataque(linha(SecurityAction="managedChallenge"))["severity"] == "low"


def test_sem_coordenadas_nao_se_inventa_um_sitio():
    # O projeto original punha estes num sítio aleatório.
    assert fd.para_ataque(linha(ClientLatitude=None)) is None
    assert fd.para_ataque(linha(ClientLongitude="")) is None


def test_le_o_minuto_completo_de_ha_4_minutos_e_avanca():
    x = XsiamFalso([linha(t=AGORA - 5 * MIN + 10_000), linha(t=AGORA - 5 * MIN + 1_000, ClientLatitude=None),
                    linha(t=AGORA - 5 * MIN + 2_000)])
    relogio = [AGORA]
    f = fd.Feed(x, agora_ms=lambda: relogio[0])
    janela, ataques = f.ler()
    limite = AGORA - fd.ATRASO_MS - (AGORA - fd.ATRASO_MS) % MIN
    assert janela == (limite - MIN, limite)
    assert [a["t"] for a in ataques] == sorted(a["t"] for a in ataques) and len(ataques) == 2
    # O minuto seguinte ainda não está completo: não se lê.
    assert f.ler() is None
    relogio[0] += MIN
    assert f.ler()[0] == (limite, limite + MIN)


def test_depois_de_uma_paragem_nao_recupera_mais_de_10_minutos():
    x = XsiamFalso()
    relogio = [AGORA]
    f = fd.Feed(x, agora_ms=lambda: relogio[0])
    f.ler()
    relogio[0] += 60 * MIN
    janela, _ = f.ler()
    limite = relogio[0] - fd.ATRASO_MS - (relogio[0] - fd.ATRASO_MS) % MIN
    assert janela == (limite - MIN, limite)


def test_erro_do_xsiam_nao_avanca_o_cursor():
    x = XsiamFalso(erro=XsiamError("rede", "sem ligação"))
    f = fd.Feed(x, agora_ms=lambda: AGORA)
    try:
        f.ler()
    except XsiamError:
        pass
    x.erro = None
    assert x.janelas[0] == f.ler()[0]   # o mesmo minuto, outra vez


def test_websocket_manda_estado_resumo_e_historico():
    from fastapi.testclient import TestClient
    import main
    app = main.criar_app(XsiamFalso([linha()]))
    with TestClient(app) as c:
        with c.websocket_connect("/ws/attacks") as ws:
            tipos = [ws.receive_json()["type"] for _ in range(3)]
        assert tipos == ["estado", "stats", "history"]
        r = c.get("/api/estado").json()
        assert set(r) >= {"ok", "erro", "ultimo_ok", "resumo"}
        # Sem /docs nem exportações do projeto original.
        assert c.get("/docs").status_code == 404
        assert c.get("/api/db/export").status_code == 404


def test_resumo_soma_os_minutos():
    import main
    est = main.Estado()
    a = fd.para_ataque(linha())
    b = fd.para_ataque(linha(ClientIP="198.51.100.1", ClientCountry="us", SecurityAction="managedChallenge"))
    est.juntar_minuto((0, MIN), [a, b])
    r = est.resumo()
    assert r["total"] == 6 and r["ips"] == 2 and r["n_paises"] == 2
    assert r["severidade"] == {"critical": 0, "high": 0, "medium": 3, "low": 3}
    assert dict(r["paises"]) == {"IN": 3, "US": 3}
