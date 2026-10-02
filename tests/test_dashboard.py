"""Testes das definições do ecrã e do servidor. Nenhum toca na rede: a fonte
é o DemoSource ou listas escritas à mão."""
import base64
import os
import sys
from datetime import datetime
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import aggregate as agg  # noqa: E402
from cortex_client import CortexError  # noqa: E402
from demo import DemoSource  # noqa: E402
from store import Store  # noqa: E402

# 2026-07-15 12:00 nos Açores (verão, UTC+0) e 2026-01-15 12:00 (inverno, UTC−1).
SUMMER = int(datetime(2026, 7, 15, 12, tzinfo=agg.TZ).timestamp() * 1000)
WINTER = int(datetime(2026, 1, 15, 12, tzinfo=agg.TZ).timestamp() * 1000)


def inc(id, sev="high", status="new", created=None, resolved=None, modified=None):
    return agg.norm_incident({"incident_id": id, "severity": sev, "status": status,
                              "creation_time": created, "resolved_timestamp": resolved,
                              "modification_time": modified or resolved or created})


def test_severidade_aceita_as_duas_escritas_do_xsiam():
    assert agg.norm_severity("SEV_040_HIGH") == "high"
    assert agg.norm_severity("Critical") == "critical"
    assert agg.norm_severity("SEV_010_INFO") == "info"
    assert agg.norm_severity(None) == "info"


def test_mitre_separa_id_e_nome():
    assert agg.parse_mitre("T1059.001 - Command and Scripting Interpreter: PowerShell") == \
        ("T1059.001", "Command and Scripting Interpreter: PowerShell")
    assert agg.parse_mitre("TA0040 - Impact") == ("TA0040", "Impact")


def test_hosts_perdem_o_agent_id():
    i = agg.norm_incident({"incident_id": 1, "hosts": ["srv-ad-01:abc123"]})
    assert i["hosts"] == ["srv-ad-01"]


def test_contadores_so_contam_casos_abertos():
    incs = [inc(1, "critical"), inc(2, "critical", "under_investigation"),
            inc(3, "critical", "resolved_true_positive"), inc(4, "low")]
    assert agg.severity_counts(incs) == {"critical": 2, "high": 0, "medium": 0, "low": 1}








def test_volume_rejeita_intervalo_desconhecido():
    with pytest.raises(ValueError):
        agg.volume([], "1y", SUMMER)


def test_severidade_manual_ganha_a_calculada():
    i = agg.norm_incident({"incident_id": 1, "severity": "medium", "manual_severity": "critical"})
    assert i["severity"] == "critical"





def test_caso_sem_alertas_no_extra_usa_os_alertas_de_24h():
    i = inc(7, "high", created=SUMMER)
    a = agg.norm_alert({"alert_id": "9", "case_id": 7, "host_name": "srv-x",
                        "mitre_technique_id_and_name": ["T1071.001 - Web Protocols"],
                        "remote_ip": "1.2.3.4", "detection_timestamp": SUMMER})
    row = agg.case_rows([i], {"7": {"alerts": {"data": []}}}, SUMMER, 60, [a])[0]
    assert row["technique_id"] == "T1071.001" and row["details"]["ips"] == ["1.2.3.4"]
    assert row["host"] == "srv-x"





def test_caso_sem_extra_data_continua_na_tabela():
    rows = agg.case_rows([inc(1, "critical", created=SUMMER)], {}, SUMMER, 60)
    assert rows[0]["id"] == "1" and rows[0]["enriched"] is False


def test_tabela_ordena_por_severidade_e_depois_recencia():
    incs = [inc(1, "low", created=SUMMER), inc(2, "critical", created=SUMMER - agg.DAY),
            inc(3, "critical", created=SUMMER - agg.HOUR)]
    assert [r["id"] for r in agg.case_rows(incs, {}, SUMMER, 60)] == ["3", "2", "1"]


def fw(id, sources, **kw):
    i = inc(id, **kw)
    i["sources"] = sources
    return i


def test_casos_so_da_firewall_saem_da_tabela_mas_os_corroborados_ficam():
    # PAN NGFW sozinha é quase tudo ruído; com o agente ao lado está corroborado.
    incs = [fw(1, ["PAN NGFW"], created=SUMMER), fw(2, ["XDR Agent"], created=SUMMER),
            fw(3, ["PAN NGFW", "XDR Agent"], created=SUMMER), fw(4, [], created=SUMMER)]
    assert [agg.is_noise(i) for i in incs] == [True, False, False, False]
    assert sorted(r["id"] for r in agg.case_rows(incs, {}, SUMMER, 60)) == ["2", "3", "4"]


def test_briefing_nao_ve_os_casos_nem_os_alertas_so_da_firewall():
    inc_, al, m = demo_state()
    for i in inc_:
        i["sources"] = ["PAN NGFW"]
    for a in al:
        a["source"] = "PAN NGFW"
    f = brf.facts(inc_, al, m, SUMMER)
    assert f["casos"] == [] and f["alertas"] == [] and sum(f["abertos"].values()) == 0


def test_tabela_so_mostra_casos_dos_ultimos_3_dias():
    # Um crítico de há 4 dias tapava os de hoje na tabela, que mostra os mais
    # graves primeiro; fica de fora (mas continua nos contadores dos 90 dias).
    incs = [inc(1, "critical", created=SUMMER - 4 * agg.DAY), inc(2, "low", created=SUMMER - 2 * agg.DAY),
            inc(3, "high", created=SUMMER - 3 * agg.DAY)]
    assert [r["id"] for r in agg.case_rows(incs, {}, SUMMER, 60)] == ["3", "2"]


# --- sincronização ------------------------------------------------------------

def sync_all(s):
    s.sync_once()
    while s.stages:
        s.sync_once()


def test_demo_sincroniza_e_enriquece():
    s = Store(DemoSource())
    sync_all(s)
    inc_, al, extra = s.snapshot()
    assert inc_ and al and extra
    assert s.status()["state"] in ("operacional", "degradado")


def test_depois_da_recolha_so_le_o_que_mudou():
    src = DemoSource()
    s = Store(src)
    sync_all(s)
    calls = []
    orig = src.incidents_created_between
    src.incidents_created_between = lambda *a, **k: calls.append(a) or orig(*a, **k)
    s.sync_once()
    assert calls == []


class Broken:
    def __getattr__(self, name):
        def fail(*a, **k):
            raise CortexError("auth", "XSIAM respondeu 403")
        return fail


def test_falha_sem_nunca_ter_sincronizado_e_sem_ligacao():
    s = Store(Broken())
    s.sync_once()
    st = s.status()
    assert st["state"] == "sem_ligacao" and st["error"]["kind"] == "auth"


def test_falha_depois_de_sincronizar_mantem_os_dados_e_fica_degradado():
    s = Store(DemoSource())
    sync_all(s)
    before = len(s.snapshot()[0])
    s.source = Broken()
    s.sync_once()
    assert len(s.snapshot()[0]) == before
    assert s.status()["state"] == "degradado"
    # E dez minutos depois, sem sincronizar, passa a sem ligação.
    assert s.status(now=s.last_ok + 11 * agg.MIN)["state"] == "sem_ligacao"


def test_sem_erro_mas_parado_ha_mais_de_10_min_e_degradado():
    s = Store(DemoSource())
    s.sync_once()
    assert s.status(now=s.last_ok + 11 * agg.MIN)["state"] == "degradado"


# --- servidor -----------------------------------------------------------------

@pytest.fixture
def client(monkeypatch):
    monkeypatch.setenv("DASHBOARD_PASSWORD", "segredo")
    import server
    app = server.create_app(source=DemoSource(), demo=True, start_sync=False)
    sync_all(app.config["store"])
    return app.test_client()


def auth(pw="segredo"):
    return {"Authorization": "Basic " + base64.b64encode(f"x:{pw}".encode()).decode()}


@pytest.mark.parametrize("path", ["/", "/app.js", "/style.css", "/api/summary", "/api/ping"])
def test_tudo_exige_palavra_passe_incluindo_estaticos(client, path):
    assert client.get(path).status_code == 401
    assert client.get(path, headers=auth("errada")).status_code == 401
    assert client.get(path, headers=auth()).status_code == 200


@pytest.mark.parametrize("path", ["/api/summary", "/api/incidents?range=30d", "/api/cases",
                                  "/api/mitre", "/api/top-alerts", "/api/radar", "/api/briefing",
                                  "/api/status"])
def test_endpoints_respondem(client, path):
    r = client.get(path, headers=auth())
    assert r.status_code == 200 and r.json["demo"] is True and r.json["synced"] is True


def test_antes_da_primeira_sincronizacao_diz_que_nao_sincronizou(monkeypatch):
    monkeypatch.setenv("DASHBOARD_PASSWORD", "segredo")
    import server
    app = server.create_app(source=DemoSource(), demo=True, start_sync=False)
    assert app.test_client().get("/api/summary", headers=auth()).json["synced"] is False


def test_sem_palavra_passe_nao_arranca(monkeypatch):
    monkeypatch.delenv("DASHBOARD_PASSWORD", raising=False)
    import server
    with pytest.raises(SystemExit):
        server.create_app(source=DemoSource(), start_sync=False)


def test_chave_nunca_aparece_nas_respostas(monkeypatch):
    monkeypatch.setenv("DASHBOARD_PASSWORD", "segredo")
    import server
    app = server.create_app(source=DemoSource(), demo=True, start_sync=False)
    sync_all(app.config["store"])
    c = app.test_client()
    body = b"".join(c.get(p, headers=auth()).data for p in
                    ["/api/summary", "/api/status", "/api/cases", "/api/briefing"])
    assert b"segredo" not in body


def test_403_num_caso_nao_para_a_sincronizacao_nem_se_repete(caplog):
    src = DemoSource()
    calls = []
    def denied(iid, alerts_limit=50):
        calls.append(iid)
        raise CortexError("proibido", "XSIAM respondeu 403")
    src.incident_extra_data = denied
    s = Store(src)
    with caplog.at_level("WARNING", logger="store"):
        sync_all(s)
    st = s.status()
    assert st["state"] == "operacional" and st["error"] is None
    # Não vai para o ecrã, vai para o log, com os casos.
    assert not any("permissão" in w for w in st["warnings"])
    logged = [r.getMessage() for r in caplog.records if "403" in r.getMessage()]
    assert logged and calls[0] in logged[0]
    before, n_logs = len(calls), len(logged)
    caplog.clear()
    s.sync_once()
    # Os já recusados (e que não mudaram) não se pedem nem se registam outra vez.
    assert not set(calls[before:]) & set(calls[:before])
    assert not any(c in r.getMessage() for r in caplog.records for c in calls[:before])


def test_caso_recusado_mostra_traco_e_nao_a_carregar():
    i = inc(8, "high", created=SUMMER)
    assert agg.case_rows([i], {}, SUMMER, 60)[0]["enriched"] is False
    assert agg.case_rows([i], {}, SUMMER, 60, denied={"8"})[0]["enriched"] is True


def test_paginacao_nao_confia_no_total_count():
    # O XSIAM do GRA anunciou 728 casos para um dia com ~5 100: parar no
    # total_count cortava o histórico a meio, sem aviso.
    from cortex_client import CortexClient
    cli = CortexClient("https://x", "k", "1")
    real = 1234
    def fake_post(path, data):
        lo, hi = data["search_from"], min(data["search_to"], real)
        return {"total_count": 728, "incidents": [{"incident_id": i} for i in range(lo, hi)]}
    cli._post = fake_post
    items, truncated = cli._paginate("/p", "incidents", [], {}, max_pages=50)
    assert len(items) == real and truncated is False
    items, truncated = cli._paginate("/p", "incidents", [], {}, max_pages=5)
    assert len(items) == 500 and truncated is True



# --- métricas (linhas com a forma das do XQL) --------------------------------

def hour(ms):
    return ms // agg.HOUR


def test_mttr_exclui_automaticos_e_duplicados_e_pondera_pelo_numero():
    rows = [{"status": "resolved_other", "n": 29, "avg_min": 918.0},
            {"status": "resolved_false_positive", "n": 2, "avg_min": 198.0},
            {"status": "resolved_auto_resolve", "n": 5072, "avg_min": 9.9},
            {"status": "resolved_duplicate", "n": 3, "avg_min": 1.0}]
    m = agg.mttr(rows)
    assert (m["n"], m["minutes"]) == (31, round((29 * 918 + 2 * 198) / 31))


def test_mttr_sem_casos_ou_sem_metricas_nao_inventa_zero():
    assert agg.mttr([])["minutes"] is None
    assert agg.mttr(None)["ready"] is False


def test_auto_contido_vem_do_xql_e_espera_por_ele():
    rows = [{"status": "resolved_auto_resolve", "n": 5072, "avg_min": 9.9},
            {"status": "resolved_other", "n": 29, "avg_min": 918.0}]
    assert agg.prevention(rows, [], SUMMER)["auto_contained"] == 5072
    assert agg.prevention(None, [], SUMMER)["auto_contained"] is None


def test_ameacas_bloqueadas_inclui_o_spyware_da_ngfw_mas_nao_o_so_detetado():
    def al(i, action, pretty):
        return agg.norm_alert({"alert_id": str(i), "category": "Spyware Detected via Anti-Spyware profile",
                               "action": action, "action_pretty": pretty,
                               "detection_timestamp": SUMMER - agg.MIN})
    alerts = [al(1, "BLOCKED_2", "Prevented (Dropped The Session)"),
              al(2, "DETECTED_23", "Detected (Sinkhole)")]
    assert agg.prevention(None, alerts, SUMMER)["threats_blocked"] == 1


@pytest.mark.parametrize("now", [SUMMER, WINTER])
def test_volume_7d_acaba_em_hoje_parcial_e_conta_pelo_dia_dos_acores(now):
    # 00:30 de hoje nos Açores cai na hora UTC 00h (verão) ou 01h (inverno);
    # tem de ir para «hoje» nos dois casos, e 23:59 de ontem para ontem.
    rows = [{"hora": hour(agg.local_midnight_ms(now) + 30 * agg.MIN), "severity": "CRITICAL", "n": 3},
            {"hora": hour(agg.local_midnight_ms(now) - agg.MIN), "severity": "LOW", "n": 2}]
    b = agg.volume(rows, "7d", now)["buckets"]
    assert len(b) == 7
    assert b[-1]["label"] == "hoje (parcial)" and b[-1]["critical"] == 3
    assert b[-2]["low"] == 2 and b[-2]["critical"] == 0
    assert b[-2]["label"] == ("ter 14" if now == SUMMER else "qua 14")


def test_volume_24h_tem_24_barras():
    rows = [{"hora": hour(SUMMER - 5 * agg.MIN), "severity": "HIGH", "n": 4},
            {"hora": hour(SUMMER), "severity": "LOW", "n": 1}]
    b = agg.volume(rows, "24h", SUMMER)["buckets"]
    assert len(b) == 24
    assert b[-2]["label"] == "11h" and b[-2]["high"] == 4
    assert b[-1]["label"] == "agora (parcial)" and b[-1]["low"] == 1


def test_mitre_tem_sempre_as_14_taticas_e_conta_a_janela():
    rows = [{"hora": hour(SUMMER - agg.HOUR), "tactic": "TA0002 - Execution", "n": 5},
            {"hora": hour(SUMMER - 9 * agg.DAY), "tactic": "TA0002 - Execution", "n": 50}]
    m = agg.mitre(rows, [{"technique": "T1059.001 - PowerShell", "n": 5}], SUMMER)
    assert len(m["tactics"]) == 14
    assert next(t for t in m["tactics"] if t["id"] == "TA0002")["count"] == 5
    assert m["techniques"][0] == {"id": "T1059.001", "name": "PowerShell", "count": 5}


def test_radar_compara_hoje_com_a_media_e_com_ontem():
    today0 = agg.local_midnight_ms(SUMMER)
    t = "TA0006 - Credential Access"
    rows = [{"hora": hour(today0 + agg.HOUR), "tactic": t, "n": 6},
            {"hora": hour(today0 - agg.HOUR), "tactic": t, "n": 3},
            {"hora": hour(today0 - 3 * agg.DAY), "tactic": t, "n": 4}]
    r = agg.radar(rows, SUMMER)
    cred = next(a for a in r["axes"] if a["id"] == "TA0006")
    assert (cred["today"], cred["yesterday"], cred["avg7d"]) == (6, 3, 1.0)
    # O total dos 7 dias completos (sem hoje): 3 de ontem + 4 de há 3 dias.
    assert cred["week"] == 7
    assert r["highlight"]["change_pct"] == 100


def test_arranque_por_fases_e_metricas_logo_a_seguir():
    s = Store(DemoSource())
    s.sync_once()
    st = s.status()
    assert st["state"] == "operacional" and any("A carregar" in w for w in st["warnings"])
    inc_, _, _ = s.snapshot()
    assert inc_ and all(agg.is_open(i) for i in inc_)
    # A 1.ª consulta de métricas segue logo a 1.ª fase.
    assert s.metrics is not None and st["metrics_at"] is not None
    sync_all(s)
    assert s.status()["metrics_at"] is not None


def test_so_se_guardam_casos_abertos():
    s = Store(DemoSource())
    sync_all(s)
    t = int(__import__("time").time() * 1000)
    s._load_changed([{"incident_id": "x1", "status": "new", "severity": "high", "creation_time": t}])
    assert "x1" in s.incidents
    s._load_changed([{"incident_id": "x1", "status": "resolved_auto_resolve", "severity": "high", "creation_time": t}])
    assert "x1" not in s.incidents


class XqlBroken(DemoSource):
    def volume_hours(self, since_ms):
        raise CortexError("xql", "Consulta XQL falhou (FAIL): quota")


def test_falha_do_xql_nao_poe_a_api_em_baixo():
    s = Store(XqlBroken())
    sync_all(s)
    st = s.status()
    assert st["state"] == "operacional"
    assert any("XQL" in w for w in st["warnings"])
    assert s.metrics is None


def test_alertas_repetidos_juntam_se_numa_linha():
    def al(i, name, host, t):
        return agg.norm_alert({"alert_id": str(i), "name": name, "host_name": host,
                               "severity": "critical", "detection_timestamp": t})
    alerts = [al(i, "Leitura fora dos limites", "SRV-SQL-EXEMPLO", SUMMER - i * agg.MIN) for i in range(8)] \
        + [al(99, "Outro", "srv-x", SUMMER - 30 * agg.MIN)]
    top = agg.top_alerts(alerts, SUMMER, 5)
    assert [(t["name"], t["count"]) for t in top] == [("Leitura fora dos limites", 8), ("Outro", 1)]
    assert top[0]["id"] == "0"  # a ocorrência mais recente


# --- briefing (Ollama) ---------------------------------------------------------

import briefing as brf  # noqa: E402


def demo_state():
    s = Store(DemoSource())
    sync_all(s)
    inc_, al, _ = s.snapshot()
    return inc_, al, s.metrics


def test_numero_inventado_pelo_modelo_e_apanhado():
    src = "Casos abertos: 1 críticos, 1402 altos.\nO host srv-dc-exemplo tem 566 casos abertos."
    assert brf.invented_numbers("1. 1 caso crítico\n2. srv-dc-exemplo com 566 casos", src) == set()
    assert brf.invented_numbers("Há 1 402 casos altos.", src) == set()   # separador de milhares
    assert brf.invented_numbers("Há 1.402 casos altos.", src) == set()
    assert brf.invented_numbers("srv-dc-exemplo tem 600 casos", src) == {"600"}


def test_briefing_do_modelo_e_formato_do_endpoint():
    inc_, al, m = demo_state()
    b = brf.Briefing("http://x", "llama3.2:3b")
    b._ollama = lambda prompt: "- Primeiro ponto\n- Segundo ponto"
    b.generate(inc_, al, m, SUMMER)
    p = b.payload()
    assert p["texto"] == "Primeiro ponto\nSegundo ponto" and p["fonte"] == "llama3.2:3b"
    assert p["gerado_em"] == "2026-07-15T12:00:00+00:00" and p["nota"] is None


def test_falha_do_ollama_mantem_o_briefing_anterior():
    inc_, al, m = demo_state()
    b = brf.Briefing("http://x", "llama3.2:3b")
    b._ollama = lambda prompt: "Ponto bom"
    b.generate(inc_, al, m, SUMMER)
    def down(prompt):
        raise ConnectionError("Ollama em baixo")
    b._ollama = down
    b.generate(inc_, al, m, SUMMER + agg.HOUR)
    p = b.payload()
    assert p["texto"] == "Ponto bom" and p["gerado_em"].startswith("2026-07-15T12:00")
    assert "falhou" in p["nota"]


def test_texto_com_numero_inventado_nao_substitui_o_anterior():
    inc_, al, m = demo_state()
    b = brf.Briefing("http://x", "llama3.2:3b")
    b._ollama = lambda prompt: "Ponto bom"
    b.generate(inc_, al, m, SUMMER)
    b._ollama = lambda prompt: "Há 987654 casos críticos."
    b.generate(inc_, al, m, SUMMER + agg.HOUR)
    assert b.payload()["texto"] == "Ponto bom"


def test_primeira_falha_sem_anterior_usa_regras():
    inc_, al, m = demo_state()
    b = brf.Briefing("http://x", "llama3.2:3b")
    def down(prompt):
        raise TimeoutError()
    b._ollama = down
    b.generate(inc_, al, m, SUMMER)
    p = b.payload()
    assert p["fonte"] == "regras" and p["texto"]


def test_falha_do_ollama_diz_no_ecra_o_motivo_e_o_que_fazer():
    # No PC da TV ninguém lê o log: o motivo tem de vir na nota do endpoint.
    import requests
    inc_, al, m = demo_state()
    b = brf.Briefing("http://localhost:11434", "llama3.2:3b", timeout=120)
    def sem_ollama(prompt):
        raise requests.ConnectionError("recusada")
    b._ollama = sem_ollama
    assert b.generate(inc_, al, m, SUMMER) is False
    assert "não responde em http://localhost:11434" in b.payload()["nota"]

    def lento(prompt):
        raise requests.ReadTimeout()
    b._ollama = lento
    b.generate(inc_, al, m, SUMMER + agg.HOUR)
    p = b.payload()
    # Continua por regras, refeito com a hora nova, e o motivo é o último.
    assert p["fonte"] == "regras" and p["gerado_em"].startswith("2026-07-15T13:00")
    assert "120 s" in p["nota"] and "OLLAMA_TIMEOUT" in p["nota"]

    resp = requests.Response(); resp.status_code = 404
    assert "ollama pull llama3.2:3b" in brf.motivo(requests.HTTPError(response=resp),
                                                   "http://x", "llama3.2:3b", 120)

    b._ollama = lambda prompt: "Ponto bom"
    assert b.generate(inc_, al, m, SUMMER + 2 * agg.HOUR) is True
    assert b.payload()["nota"] is None


def test_endpoint_briefing_nunca_chama_o_ollama(client, monkeypatch):
    import requests
    monkeypatch.setattr(requests, "post", lambda *a, **k: (_ for _ in ()).throw(AssertionError("chamou o Ollama")))
    r = client.get("/api/briefing", headers=auth())
    assert r.status_code == 200 and set(r.json) >= {"texto", "gerado_em"}


def test_numero_pequeno_inventado_tambem_e_apanhado():
    src = "Casos abertos: 9 críticos.\nTempo médio de resolução (24h): 110 minutos, em 3 casos."
    assert brf.invented_numbers("1. 9 críticos, com 4 novos casos nas últimas 24h", src) == {"4"}  # o 24 está nos factos («(24h)»)
    assert brf.invented_numbers("1. 9 críticos\n2. 110 minutos em 3 casos", src) == set()


# --- persistência (reinícios) -----------------------------------------------------

def test_estado_sobrevive_a_um_reinicio_e_segue_em_incremental(tmp_path):
    src = DemoSource()
    s = Store(src)
    sync_all(s)
    f = tmp_path / "estado.json.gz"
    s.save(f)
    assert oct(f.stat().st_mode & 0o777) == "0o600"

    s2 = Store(src)
    assert s2.load(f) is True
    assert s2.snapshot()[0] and len(s2.snapshot()[0]) == len(s.snapshot()[0])
    assert s2.metrics is not None and s2.status()["last_ok"] == s.last_ok
    assert s2.fresh is False  # dados de antes do reinício
    calls = []
    src.open_incidents = lambda *a, **k: calls.append("recolha completa") or ([], False)
    s2.sync_once()
    assert calls == [] and s2.fresh is True  # retomou em incremental


def test_estado_velho_ou_partido_nao_se_retoma(tmp_path):
    s = Store(DemoSource())
    sync_all(s)
    f = tmp_path / "estado.json.gz"
    s.watermark -= 25 * agg.HOUR
    s.save(f)
    assert Store(DemoSource()).load(f) is False
    f.write_bytes(b"lixo")
    assert Store(DemoSource()).load(f) is False
    assert Store(DemoSource()).load(tmp_path / "nao-existe") is False


def test_briefing_sobrevive_a_um_reinicio(tmp_path):
    inc_, al, m = demo_state()
    b = brf.Briefing("http://x", "llama3.2:3b")
    b._ollama = lambda prompt: "Ponto guardado"
    b.generate(inc_, al, m, SUMMER)
    f = tmp_path / "briefing.json"
    b.save(f)
    b2 = brf.Briefing("http://x", "llama3.2:3b")
    b2.load(f)
    assert b2.payload()["texto"] == "Ponto guardado"


def test_so_o_proprio_pc_entra_sem_palavra_passe_e_so_se_ligado(monkeypatch):
    monkeypatch.setenv("DASHBOARD_PASSWORD", "segredo")
    import server
    for flag, local, remoto in [("1", 200, 401), ("0", 401, 401)]:
        monkeypatch.setenv("DASHBOARD_LOCAL_NO_AUTH", flag)
        c = server.create_app(source=DemoSource(), demo=True, start_sync=False).test_client()
        assert c.get("/api/ping", environ_base={"REMOTE_ADDR": "127.0.0.1"}).status_code == local
        assert c.get("/api/ping", environ_base={"REMOTE_ADDR": "10.1.2.3"}).status_code == remoto
        assert c.get("/api/ping", environ_base={"REMOTE_ADDR": "10.1.2.3"}, headers=auth()).status_code == 200


def test_401_tenta_o_outro_tipo_de_chave(caplog):
    from cortex_client import CortexClient
    cli = CortexClient("https://x", "k", "1", auth="advanced")
    class R:
        def __init__(self, code): self.status_code = code
        def json(self): return {"reply": {"ok": True}}
    cli._send = lambda path, data, adv: R(401 if adv else 200)
    with caplog.at_level("WARNING"):
        assert cli._post("/p", {}) == {"ok": True}
    assert cli._advanced is False and "CORTEX_AUTH=standard" in caplog.text
    cli._send = lambda path, data, adv: R(401)
    with pytest.raises(CortexError) as e:
        cli._post("/p", {})
    assert e.value.kind == "auth" and cli._advanced is False  # não fica trocado se nenhum serve


def test_401_em_paralelo_nao_troca_o_tipo_duas_vezes():
    # 8 pedidos em paralelo, todos enviados como «standard» antes da troca:
    # todos têm de acabar bem e o tipo tem de ficar em «advanced».
    import threading
    from cortex_client import CortexClient
    cli = CortexClient("https://x", "k", "1", auth="standard")
    class R:
        def __init__(self, code): self.status_code = code
        def json(self): return {"reply": {"ok": True}}
    barrier = threading.Barrier(8)
    def send(path, data, adv):
        if not adv:
            try: barrier.wait(timeout=2)
            except threading.BrokenBarrierError: pass
            return R(401)
        return R(200)
    cli._send = send
    results = []
    ts = [threading.Thread(target=lambda: results.append(cli._post("/p", {}))) for _ in range(8)]
    for t in ts: t.start()
    for t in ts: t.join()
    assert results == [{"ok": True}] * 8 and cli._advanced is True


# --- janela de 90 dias, reconciliação e histórico ------------------------------

def test_reconciliacao_remove_fantasmas_e_regista(caplog):
    s = Store(DemoSource())
    sync_all(s)
    now = int(__import__("time").time() * 1000)
    ghost = agg.norm_incident({"incident_id": "fantasma-1", "status": "new", "severity": "high",
                               "creation_time": now - agg.DAY})
    s.incidents["fantasma-1"] = ghost
    with caplog.at_level("INFO", logger="store"):
        s.reconcile()
    assert "fantasma-1" not in s.incidents
    assert any("1 caso(s) fantasma removido(s)" in r.getMessage() and "fantasma-1" in r.getMessage()
               for r in caplog.records)
    assert s.backlog is not None and s.backlog_at is not None


def test_reconciliacao_com_lista_truncada_nao_remove_nada():
    src = DemoSource()
    s = Store(src)
    sync_all(s)
    s.incidents["fantasma-2"] = agg.norm_incident({"incident_id": "fantasma-2", "status": "new",
                                                   "creation_time": int(__import__("time").time() * 1000)})
    src.open_incidents = lambda *a, **k: ([], True)
    s.reconcile()
    assert "fantasma-2" in s.incidents


def test_janela_de_90_dias():
    import store as st
    s = Store(DemoSource())
    sync_all(s)
    now = int(__import__("time").time() * 1000)
    old = {"incident_id": "velho", "status": "new", "creation_time": now - 91 * agg.DAY}
    recent = {"incident_id": "recente", "status": "new", "creation_time": now - 89 * agg.DAY}
    s._load_changed([old, recent])
    assert "velho" not in s.incidents and "recente" in s.incidents
    # passa dos 90 dias → sai na limpeza seguinte
    s._prune(now + 2 * agg.DAY)
    assert "recente" not in s.incidents
    assert all((i["created"] or 0) >= now - st.OPEN_WINDOW_MS for i in s.snapshot()[0])


@pytest.mark.parametrize("total", [0, 37, 100, 6400, 59612])
def test_contagem_por_bisseccao(total):
    from cortex_client import CortexClient
    cli = CortexClient("https://x", "k", "1")
    calls = []
    def fake(path, data):
        calls.append(data["search_from"])
        lo, hi = data["search_from"], min(data["search_to"], total)
        return {"total_count": 728, "incidents": [{}] * max(0, hi - lo)}
    cli._post = fake
    assert cli.count_open_before(0) == total
    assert len(calls) < 25  # bissecção, não paginação completa


def test_summary_tem_o_historico(client):
    b = client.get("/api/summary", headers=auth()).json["backlog"]
    assert set(b) == {"count", "at"}


def test_contadores_do_dia():
    today0 = agg.local_midnight_ms(SUMMER)
    incs = [inc(1, "critical", created=today0 + agg.HOUR), inc(2, "high", created=today0 - agg.MIN),
            inc(3, "high", status="resolved_other", created=today0 + agg.HOUR)]
    assert agg.severity_counts(incs, since=today0) == {"critical": 1, "high": 0, "medium": 0, "low": 0}
    assert agg.severity_counts(incs)["high"] == 1  # sem «since», a janela toda


# --- dashboards exportados do XSIAM (página «Dashboards XSIAM») -----------------

import json as _json
import xsiam_dashboards as xd

EXPORT = {"dashboards_data": [{"name": "SOC Overview", "description": "exemplo", "status": "ENABLED",
                               "layout": [{"id": "row-1", "data": [{"key": "w-b"}, {"key": "w-a"}]},
                                          {"id": "row-2", "data": [{"key": "w-c"}]}]}],
          "widgets_data": [
              {"widget_key": "w-a", "title": "Casos por tática", "time_frame": {"relativeTime": 7 * 86400000},
               "data": {"phrase": "dataset = incidents | comp count() by x"}, "viewOptions": {"type": "pie"}},
              {"widget_key": "w-b", "title": "Total", "data": {"phrase": "dataset = incidents | comp count()"}},
              {"widget_key": "w-c", "title": "Pré-definido", "data": {}}]}


def test_export_le_widgets_pela_ordem_do_layout(tmp_path):
    f = tmp_path / "soc.json"
    f.write_text(_json.dumps(EXPORT))
    [d] = xd.load_export(f)
    assert d["id"] == "soc-overview" and [w["key"] for w in d["widgets"]] == ["w-b", "w-a", "w-c"]
    assert d["widgets"][1]["window_ms"] == 7 * 86400000 and d["widgets"][0]["window_ms"] == xd.DEFAULT_WINDOW_MS


def test_export_tambem_aceita_a_resposta_da_api_com_reply(tmp_path):
    f = tmp_path / "api.json"
    f.write_text(_json.dumps({"reply": EXPORT}))
    assert xd.load_export(f)[0]["name"] == "SOC Overview"


def test_ficheiro_mau_nao_derruba_os_outros(tmp_path):
    (tmp_path / "bom.json").write_text(_json.dumps(EXPORT))
    (tmp_path / "mau.json").write_text("{isto não é json")
    assert [d["name"] for d in xd.load_dir(tmp_path)] == ["SOC Overview"]


def test_widgets_correm_e_os_predefinidos_ficam_nao_suportados(tmp_path):
    (tmp_path / "soc.json").write_text(_json.dumps(EXPORT))
    class Src:
        calls = []
        def xql(self, q, rel):
            self.calls.append((q, rel))
            return [{"x": f"c{i}", "n": i} for i in range(500)]
    src = Src()
    r = xd.DashboardRunner(src, tmp_path)
    r.reload(); r.refresh()
    ws = {w["key"]: w for w in r.dashboard("soc-overview")["widgets"]}
    assert len(src.calls) == 2                              # o pré-definido não corre
    assert "não suportado" in ws["w-c"]["error"]
    assert len(ws["w-a"]["rows"]) == xd.MAX_ROWS and ws["w-a"]["total"] == 500


def test_rotas_dos_paineis(monkeypatch, tmp_path):
    monkeypatch.setenv("DASHBOARD_PASSWORD", "segredo")
    monkeypatch.setenv("XSIAM_DASHBOARDS_DIR", str(tmp_path))
    (tmp_path / "soc.json").write_text(_json.dumps(EXPORT))
    import server
    app = server.create_app(source=DemoSource(), demo=True, start_sync=False)
    runner = app.config["dashboards"]; runner.reload(); runner.refresh()
    c = app.test_client()
    assert c.get("/api/paineis", headers=auth()).json["dashboards"][0]["id"] == "soc-overview"
    d = c.get("/api/paineis/soc-overview", headers=auth()).json
    assert [w["title"] for w in d["widgets"]] == ["Total", "Casos por tática", "Pré-definido"]
    assert c.get("/api/paineis/nao-existe", headers=auth()).status_code == 404
    assert c.get("/api/paineis", headers=auth("errada")).status_code == 401


def test_incremental_apanha_alertas_que_entram_atrasados():
    import time as _t
    src = DemoSource()
    s = Store(src)
    sync_all(s)
    now = int(_t.time() * 1000)
    late = {"alert_id": "atrasado-1", "name": "x", "severity": "high",
            "detection_timestamp": now - 3 * agg.HOUR, "local_insert_ts": now}
    src._alerts.append(late)
    s.sync_once()
    assert "atrasado-1" in s.alerts


def test_recolha_completa_de_alertas_repoe_os_que_faltam(caplog):
    s = Store(DemoSource())
    sync_all(s)
    before = dict(s.alerts)
    for k in list(s.alerts)[: len(s.alerts) // 2]:
        del s.alerts[k]
    with caplog.at_level("INFO", logger="store"):
        s.reconcile_alerts(force=True)
    assert set(before) <= set(s.alerts)
    assert any("que a cache não tinha" in r.getMessage() for r in caplog.records)


# --- Command Center (réplica) -----------------------------------------------------

import command_center as ccm


def test_blocos_do_command_center():
    rows = [{"status": "resolved_auto_resolve", "severity": "MEDIUM", "n": 3784},
            {"status": "resolved_other", "severity": "HIGH", "n": 91},
            {"status": "new", "severity": "CRITICAL", "n": 1}, {"status": "new", "severity": "LOW", "n": 2}]
    c = ccm.cases_block(rows)
    assert (c["total"], c["automated"], c["manual"], c["resolved"], c["open"]) == (3878, 3784, 94, 3875, 3)
    assert c["open_severity"] == {"critical": 1, "high": 0, "medium": 0, "low": 2}
    o = ccm.open_block([{"status": "new", "severity": "HIGH", "n": 43234},
                        {"status": "resolved_other", "severity": "HIGH", "n": 99},
                        {"status": "under_investigation", "severity": "CRITICAL", "n": 59}])
    assert o == {"total": 43293, "severity": {"critical": 59, "high": 43234, "medium": 0, "low": 0}}
    al = [agg.norm_alert({"alert_id": "1", "action": "PREVENTED__DROPPED_THE_SESSION_", "detection_timestamp": SUMMER}),
          agg.norm_alert({"alert_id": "2", "action": "DETECTED__SINKHOLE_", "detection_timestamp": SUMMER}),
          agg.norm_alert({"alert_id": "3", "action": "PREVENTED__BLOCKED_", "detection_timestamp": SUMMER - 2 * agg.DAY})]
    assert ccm.alerts_block(al, SUMMER) == {"issues": 2, "prevented": 1}


def test_rota_do_command_center(client):
    app_cc = client.application.config["command_center"]
    app_cc.refresh()
    d = client.get("/api/command-center", headers=auth()).json
    assert d["error"] is None and d["cases"]["total"] > 0 and d["open"]["total"] > 0
    assert d["ingestion"]["events"] > 0 and len(d["sources"]) > 0 and d["alerts"]["issues"] >= 0


def test_falha_do_command_center_nao_afeta_o_painel(client):
    cc = client.application.config["command_center"]
    def boom(*a, **k):
        raise CortexError("http", "XSIAM respondeu 500")
    cc.source = type("S", (), {"ingestion": boom})()
    cc.refresh()
    assert "500" in client.get("/api/command-center", headers=auth()).json["error"]
    s = client.get("/api/summary", headers=auth())
    assert s.status_code == 200 and s.json["status"]["state"] in ("operacional", "degradado")


def test_icones_reconhecem_os_nomes_da_consola():
    icons = {"ngfw": "a/ngfw.svg", "o365": "a/o365.svg", "o365_azure_application": "a/az.svg",
             "microsoft_windows": "a/win.svg", "panw-ngfw": "a/exato.svg"}
    assert ccm.match_icon("panw-ngfw", icons) == "a/exato.svg"
    assert ccm.match_icon("msft-o365-contacts", icons) == "a/o365.svg"
    assert ccm.match_icon("microsoft-windows", icons) == "a/win.svg"
    assert ccm.match_icon("msft-azure-ad", icons) is None
    assert ccm.match_icon("vmware-vcenter", icons) is None


def test_icones_aceitam_sinonimos_e_sufixos():
    icons = {"microsoft_azure": "a/az.webp", "ipicon": "a/ip.jpg", "netskope": "a/ns.jpg", "file": "a/file.svg"}
    assert ccm.match_icon("msft-azure-ad", icons) == "a/az.webp"
    assert ccm.match_icon("ip-flow-ip-flow", icons) == "a/ip.jpg"
    assert ccm.match_icon("netskope-netskope", icons) == "a/ns.jpg"
    assert ccm.match_icon("cloudflare-waf", icons) is None


def test_icones_separam_palavras_pelas_maiusculas():
    icons = {"MicrosoftAzure": "a/az.svg", "VMWARE vCenter": "a/vm.svg", "F5": "a/f5.svg"}
    assert ccm.match_icon("msft-azure-ad", icons) == "a/az.svg"
    assert ccm.match_icon("vmware-vcenter", icons) == "a/vm.svg"
    assert ccm.match_icon("f5-lb", icons) == "a/f5.svg"


def test_fontes_so_com_nome_nao_levam_icone(client):
    cc = client.application.config["command_center"]
    cc.refresh()
    cc.data["sources"] = [{"vendor": "IP Flow", "product": "IP Flow", "events": 1, "bytes": 1},
                          {"vendor": "PANW", "product": "NGFW", "events": 1, "bytes": 1}]
    src = client.get("/api/command-center", headers=auth()).json["sources"]
    assert src[0]["name_only"] is True and src[0]["icon"] is None
    assert src[1]["name_only"] is False
