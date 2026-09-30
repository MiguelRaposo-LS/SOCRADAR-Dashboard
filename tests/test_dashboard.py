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
    s._load_changed([{"incident_id": "x1", "status": "new", "severity": "high"}])
    assert "x1" in s.incidents
    s._load_changed([{"incident_id": "x1", "status": "resolved_auto_resolve", "severity": "high"}])
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
