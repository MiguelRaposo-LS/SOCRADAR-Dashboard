"""Chamadas à API pública do Cortex XSIAM — só leitura.

Este módulo é o único sítio que conhece a chave. Nunca a regista nem a devolve:
os erros dizem o endpoint e o código HTTP, e o motivo que o próprio XSIAM der,
mas não os cabeçalhos do pedido.
"""
from __future__ import annotations

import hashlib
import json
import logging
import secrets
import string
import threading
import time
from concurrent.futures import ThreadPoolExecutor

import requests

log = logging.getLogger(__name__)

PAGE_SIZE = 100  # o máximo que a API aceita entre search_from e search_to


class CortexError(RuntimeError):
    """Uma chamada falhou. `kind` distingue o que tem soluções diferentes:
    'auth' (401: chave errada), 'proibido' (403: a chave não pode ver
    aquilo), 'http' (o XSIAM respondeu mal) e 'rede' (não se chegou lá)."""

    def __init__(self, kind: str, message: str):
        super().__init__(message)
        self.kind = kind


class CortexClient:
    def __init__(self, url: str, key: str, key_id: str, auth: str = "standard",
                 verify_tls: bool = True, timeout: int = 90, workers: int = 4):
        self.url = url.rstrip("/")
        self._key = key
        self._key_id = str(key_id)
        self._advanced = auth.strip().lower() == "advanced"
        self._verify = verify_tls
        self._timeout = timeout
        self._workers = workers
        self.last_quota = None
        self._auth_lock = threading.Lock()
        self._session = requests.Session()

    def _headers(self, advanced: bool | None = None) -> dict:
        if self._advanced if advanced is None else advanced:
            nonce = "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(64))
            ts = str(int(time.time()) * 1000)
            digest = hashlib.sha256((self._key + nonce + ts).encode()).hexdigest()
            return {"x-xdr-timestamp": ts, "x-xdr-nonce": nonce, "x-xdr-auth-id": self._key_id,
                    "Authorization": digest, "Content-Type": "application/json"}
        return {"x-xdr-auth-id": self._key_id, "Authorization": self._key,
                "Content-Type": "application/json"}

    def _send(self, path: str, request_data: dict, advanced: bool):
        try:
            return self._session.post(self.url + path, json={"request_data": request_data},
                                      headers=self._headers(advanced), timeout=self._timeout,
                                      verify=self._verify)
        except requests.RequestException as exc:
            raise CortexError("rede", f"Sem ligação ao XSIAM em {path} ({type(exc).__name__}).") from None

    def _post(self, path: str, request_data: dict) -> dict:
        mode = self._advanced
        r = self._send(path, request_data, mode)
        if r.status_code == 401:
            # A 2026-09-30 a mesma chave alternou entre «advanced» e «standard»
            # depois de lhe mudarem as permissões, e o ecrã ficou sem dados até
            # alguém mexer no .env. Num 401 tenta-se o outro tipo.
            # Com pedidos em paralelo, dois 401 ao mesmo tempo trocavam o tipo
            # duas vezes e falhavam os dois (visto no mesmo dia): cada pedido
            # lembra-se do tipo com que foi, e a troca faz-se sob lock — se
            # outro já trocou, este só repete com o tipo novo.
            with self._auth_lock:
                if self._advanced == mode:
                    r2 = self._send(path, request_data, not mode)
                    if r2.status_code != 401:
                        self._advanced = not mode
                        log.warning("A chave do XSIAM deu 401 como %s e funciona como %s: "
                                    "acerta CORTEX_AUTH=%s no .env.",
                                    "advanced" if mode else "standard",
                                    "standard" if mode else "advanced",
                                    "standard" if mode else "advanced")
                        r = r2
                else:
                    r = self._send(path, request_data, self._advanced)
        if r.status_code != 200:
            # O `err_extra` é o que separa «chave errada» de «falta um papel à
            # chave» — sem ele, um 403 manda procurar no sítio errado.
            motivo = ""
            try:
                motivo = str(((r.json() or {}).get("reply") or {}).get("err_extra") or "")[:200]
            except (ValueError, AttributeError):
                pass
            # 401 = a chave não serve (tipo errado, revogada): tudo falha.
            # 403 = a chave serve mas não pode ver *isto* — no tenant do GRA
            # acontece caso a caso no extra_data, e não pode parar o ecrã.
            kind = {401: "auth", 403: "proibido"}.get(r.status_code, "http")
            raise CortexError(kind, f"XSIAM respondeu {r.status_code} em {path}."
                              + (f" Motivo: {motivo}" if motivo else ""))
        try:
            return r.json().get("reply") or {}
        except ValueError:
            raise CortexError("http", f"Resposta do XSIAM em {path} não é JSON.") from None

    def _paginate(self, path: str, list_key: str, filters: list, sort: dict,
                  max_pages: int) -> tuple[list[dict], bool]:
        """Percorre as páginas até esgotar ou chegar ao teto.

        Devolve (itens, truncado). `truncado` diz que o teto parou a leitura
        antes do fim — quem mostra os números tem de o dizer, senão um total
        cortado passa por total real.

        Não se confia no `total_count`: no tenant do GRA vinha muito abaixo do
        real (2026-09-29: 728 casos anunciados para um dia com ~5 100; 4 761
        abertos para ~5 440). Parar nele cortava o histórico a meio sem aviso.
        Pagina-se até vir uma página incompleta.

        Cada página demorou 8–18 s, por isso pedem-se `workers` de cada vez em
        paralelo; o lote em que aparece a página incompleta é o último.
        """
        def page(n: int) -> list[dict]:
            reply = self._post(path, {"filters": filters, "sort": sort,
                                      "search_from": n * PAGE_SIZE,
                                      "search_to": (n + 1) * PAGE_SIZE})
            return [b for b in (reply.get(list_key) or []) if isinstance(b, dict)]

        items: list[dict] = []
        n = 0
        with ThreadPoolExecutor(max_workers=self._workers) as pool:
            while n < max_pages:
                batch = list(range(n, min(n + self._workers, max_pages)))
                results = list(pool.map(page, batch))
                for r in results:
                    items.extend(r)
                if any(len(r) < PAGE_SIZE for r in results):
                    return items, False
                n += len(batch)
        log.warning("Teto de %d páginas atingido em %s (%d itens); os dados estão truncados.",
                    max_pages, path, len(items))
        return items, True

    # --- incidentes (casos) -------------------------------------------------

    def incidents_modified_since(self, since_ms: int, max_pages: int) -> tuple[list[dict], bool]:
        return self._paginate("/public_api/v1/incidents/get_incidents/", "incidents",
                              [{"field": "modification_time", "operator": "gte", "value": since_ms}],
                              {"field": "modification_time", "keyword": "asc"}, max_pages)

    _OPEN = {"field": "status", "operator": "in", "value": ["new", "under_investigation"]}

    def open_incidents(self, max_pages: int, since_ms: int | None = None) -> tuple[list[dict], bool]:
        """Os casos abertos, só os criados desde `since_ms` se for dado."""
        filters = [self._OPEN]
        if since_ms is not None:
            filters.append({"field": "creation_time", "operator": "gte", "value": since_ms})
        return self._paginate("/public_api/v1/incidents/get_incidents/", "incidents", filters,
                              {"field": "creation_time", "keyword": "asc"}, max_pages)

    def count_open_before(self, until_ms: int) -> int:
        """Quantos casos abertos foram criados antes de `until_ms`.

        São ~59 mil (medido a 2026-09-30): paginá-los eram ~600 páginas. O
        `total_count` da API não serve (vinha até 7× abaixo do real). Conta-se
        por bissecção dos offsets: procura-se a última página cheia e soma-se
        a incompleta. São ~11 pedidos em vez de ~600.
        """
        filters = [self._OPEN, {"field": "creation_time", "operator": "lte", "value": until_ms - 1}]

        def size(page: int) -> int:
            reply = self._post("/public_api/v1/incidents/get_incidents/", {
                "filters": filters, "sort": {"field": "creation_time", "keyword": "asc"},
                "search_from": page * PAGE_SIZE, "search_to": (page + 1) * PAGE_SIZE})
            return len(reply.get("incidents") or [])

        if size(0) < PAGE_SIZE:
            return size(0)
        lo, hi = 0, 64          # lo: página cheia conhecida; hi: a sondar
        while size(hi) == PAGE_SIZE:
            lo, hi = hi, hi * 2
        while hi - lo > 1:      # invariante: lo cheia, hi não
            mid = (lo + hi) // 2
            if size(mid) == PAGE_SIZE:
                lo = mid
            else:
                hi = mid
        return hi * PAGE_SIZE + size(hi)

    def incident_extra_data(self, incident_id: str, alerts_limit: int = 50) -> dict:
        return self._post("/public_api/v1/incidents/get_incident_extra_data/",
                          {"incident_id": str(incident_id), "alerts_limit": alerts_limit})

    # --- alertas (issues) ---------------------------------------------------

    def alerts_inserted_since(self, since_ms: int, max_pages: int) -> tuple[list[dict], bool]:
        """Alertas que *entraram* no XSIAM desde `since_ms` (server_creation_time).

        O creation_time é a hora da deteção, e 24% dos alertas entram mais de
        10 min depois dela (p90 2h20, máximo 7h30 — medido a 2026-09-30): o
        incremental por creation_time nunca os apanhava, e o painel via ~1/4
        dos alertas das últimas 24h.
        """
        return self._paginate("/public_api/v1/alerts/get_alerts_multi_events/", "alerts",
                              [{"field": "server_creation_time", "operator": "gte", "value": since_ms}],
                              {"field": "creation_time", "keyword": "asc"}, max_pages)

    def alerts_created_since(self, since_ms: int, max_pages: int) -> tuple[list[dict], bool]:
        return self._paginate("/public_api/v1/alerts/get_alerts_multi_events/", "alerts",
                              [{"field": "creation_time", "operator": "gte", "value": since_ms}],
                              {"field": "creation_time", "keyword": "asc"}, max_pages)

    # --- XQL (métricas agregadas) --------------------------------------------
    #
    # O volume, o MITRE, o radar e o MTTR contam dezenas de milhares de casos
    # (~97 mil em 90 dias, medido a 2026-09-29). Paginar isso não é viável;
    # uma consulta XQL agregada ao dataset `incidents` faz a conta no XSIAM
    # e custou ~0,006 unidades de quota cada. O dataset `alerts` custa 20×
    # mais — por isso aqui só se consulta `incidents`.

    # Com limit=1000 e 4 405 linhas de resultado, o XSIAM devolveu só mil, sem
    # stream e sem aviso — o gráfico de volume mostrou dezenas em vez de
    # milhares (2026-09-29). Pede-se sempre muito acima do que pode vir, e
    # confere-se o número de linhas com o que o XSIAM diz que há.
    XQL_LIMIT = 1_000_000

    def xql(self, query: str, relative_ms: int, limit: int = XQL_LIMIT, wait_s: int = 180) -> list[dict]:
        qid = None
        for attempt in range(3):
            try:
                r = self._post("/public_api/v1/xql/start_xql_query/",
                               {"query": query, "tenants": [], "timeframe": {"relativeTime": relative_ms}})
                qid = r if isinstance(r, str) else r.get("query_id") if isinstance(r, dict) else r
                break
            except CortexError as exc:
                # O XSIAM devolveu 500/502 passageiros ao arrancar consultas
                # (visto a 2026-09-29); à segunda ou terceira passa.
                if exc.kind != "http" or attempt == 2:
                    raise
                time.sleep(5 * (attempt + 1))
        deadline = time.time() + wait_s
        while True:
            try:
                res = self._post("/public_api/v1/xql/get_query_results/",
                                 {"query_id": qid, "pending_flag": True, "limit": limit, "format": "json"})
            except CortexError as exc:
                # Um timeout ao esperar não quer dizer que a consulta morreu
                # (visto a 2026-09-29): pergunta-se outra vez pela mesma.
                if exc.kind in ("rede", "http") and time.time() < deadline:
                    time.sleep(5)
                    continue
                raise
            status = res.get("status")
            if status == "SUCCESS":
                break
            if status != "PENDING":
                err = res.get("error") or {}
                motivo = err.get("validation_message") if isinstance(err, dict) else err
                raise CortexError("xql", f"Consulta XQL falhou ({status}): {motivo or 'sem motivo'}")
            if time.time() > deadline:
                raise CortexError("xql", "Consulta XQL sem resposta a tempo.")
            time.sleep(2)
        self.last_quota = res.get("remaining_quota")
        results = res.get("results") or {}
        expected = res.get("number_of_results")
        if "stream_id" in results:
            # Acima de 1000 linhas o XSIAM não as põe na resposta: manda-as
            # por stream, uma linha JSON por resultado, com números em texto.
            r = self._session.post(self.url + "/public_api/v1/xql/get_query_results_stream/",
                                   json={"request_data": {"stream_id": results["stream_id"],
                                                          "is_gzip_compressed": False}},
                                   headers=self._headers(), timeout=self._timeout, verify=self._verify)
            if r.status_code != 200:
                raise CortexError("http", f"XSIAM respondeu {r.status_code} ao ler o stream XQL.")
            rows = [json.loads(line) for line in r.text.splitlines() if line.strip()]
        else:
            rows = list(results.get("data") or [])
        if isinstance(expected, int) and len(rows) != expected:
            raise CortexError("xql", f"XQL devolveu {len(rows)} de {expected} linhas; métricas descartadas.")
        return rows

    @staticmethod
    def _ts(ms: int) -> str:
        # creation_time é uma data no XQL; comparar com um número dá erro
        # («Expected date but received number»).
        return f'to_timestamp({int(ms)}, "MILLIS")'

    _HOUR = 'floor(divide(to_epoch(creation_time, "MILLIS"), 3600000))'

    def volume_hours(self, since_ms: int) -> list[dict]:
        """Casos criados por hora UTC e severidade. Hora a hora porque os
        Açores estão sempre a um número inteiro de horas de UTC: o dia local
        monta-se sem depender das funções de fuso do XQL."""
        rel = int(time.time() * 1000) - since_ms + 3_600_000
        rows = self.xql(f"""dataset = incidents
| filter creation_time >= {self._ts(since_ms)}
| alter hora = {self._HOUR}
| comp count() as n by hora, severity""", rel)
        return [{"hora": int(float(r["hora"])), "severity": r.get("severity"), "n": int(float(r["n"]))}
                for r in rows]

    def tactic_hours(self, since_ms: int) -> list[dict]:
        rel = int(time.time() * 1000) - since_ms + 3_600_000
        rows = self.xql(f"""dataset = incidents
| filter creation_time >= {self._ts(since_ms)}
| arrayexpand mitre_tactics_id_and_name
| filter mitre_tactics_id_and_name != null
| alter hora = {self._HOUR}
| comp count() as n by hora, mitre_tactics_id_and_name""", rel)
        return [{"hora": int(float(r["hora"])), "tactic": r["mitre_tactics_id_and_name"],
                 "n": int(float(r["n"]))} for r in rows]

    def top_techniques(self, since_ms: int, top: int = 10) -> list[dict]:
        rel = int(time.time() * 1000) - since_ms + 3_600_000
        rows = self.xql(f"""dataset = incidents
| filter creation_time >= {self._ts(since_ms)}
| arrayexpand mitre_techniques_id_and_name
| filter mitre_techniques_id_and_name != null
| comp count() as n by mitre_techniques_id_and_name
| sort desc n | limit {int(top)}""", rel)
        out = [{"technique": r["mitre_techniques_id_and_name"], "n": int(float(r["n"]))} for r in rows]
        return sorted(out, key=lambda r: -r["n"])

    def resolved_stats(self, since_ms: int) -> list[dict]:
        """Por estado: quantos casos foram resolvidos desde `since_ms` e a
        média, em minutos, da criação à resolução."""
        rel = int(time.time() * 1000) - since_ms + 3_600_000
        rows = self.xql(f"""dataset = incidents
| filter resolved_ts >= to_timestamp({int(since_ms)}, "MILLIS")
| alter mins = divide(subtract(to_epoch(resolved_ts, "MILLIS"), to_epoch(creation_time, "MILLIS")), 60000)
| comp count() as n, avg(mins) as media by status""", rel)
        return [{"status": str(r.get("status") or "").lower(), "n": int(float(r["n"])),
                 "avg_min": float(r["media"]) if r.get("media") not in (None, "") else None}
                for r in rows]

    # --- Command Center (página «Dashboards XSIAM») ----------------------------
    #
    # Réplica do «XSIAM Command Center» (dashboard pré-definido: não se exporta).
    # Só consultas baratas: `incidents` ~0,008 e `metrics_source` ~0,0003 de
    # quota cada (2026-09-30). Os alertas vêm da recolha do painel principal —
    # o XQL sobre `alerts` custou 0,38 por consulta.

    def cases_by_status_severity(self, since_ms: int) -> list[dict]:
        rel = int(time.time() * 1000) - since_ms + 3_600_000
        rows = self.xql(f"""dataset = incidents
| filter creation_time >= {self._ts(since_ms)}
| comp count() as n by status, severity""", rel)
        return [{"status": str(r.get("status") or "").lower(), "severity": r.get("severity"),
                 "n": int(float(r["n"]))} for r in rows]

    def open_by_severity_all(self) -> list[dict]:
        # Sem filtro de estado no XQL: «status = …» não devolvia nada (medido);
        # agrupa-se por estado e filtra-se cá.
        rows = self.xql("dataset = incidents | comp count() as n by status, severity", 400 * 86_400_000)
        return [{"status": str(r.get("status") or "").lower(), "severity": r.get("severity"),
                 "n": int(float(r["n"]))} for r in rows]

    def ingestion(self, since_ms: int, until_ms: int | None = None) -> dict:
        """Eventos e bytes ingeridos (dataset metrics_source), total e por hora."""
        until_ms = until_ms or int(time.time() * 1000)
        rel = int(time.time() * 1000) - since_ms + 3_600_000
        rows = self.xql(f"""dataset = metrics_source
| filter _time >= {self._ts(since_ms)} and _time < {self._ts(until_ms)}
| alter hora = floor(divide(to_epoch(_time, "MILLIS"), 3600000))
| comp sum(total_event_count) as eventos, sum(total_size_bytes) as bytes_total by hora""", rel)
        hours = sorted(({"hora": int(float(r["hora"])), "events": float(r.get("eventos") or 0),
                         "bytes": float(r.get("bytes_total") or 0)} for r in rows), key=lambda x: x["hora"])
        return {"events": sum(h["events"] for h in hours), "bytes": sum(h["bytes"] for h in hours), "hours": hours}

    def data_sources(self, since_ms: int, top: int = 10) -> list[dict]:
        rel = int(time.time() * 1000) - since_ms + 3_600_000
        rows = self.xql(f"""dataset = metrics_source
| filter _time >= {self._ts(since_ms)}
| comp sum(total_event_count) as eventos, sum(total_size_bytes) as bytes_total by _vendor, _product""", rel)
        out = [{"vendor": r.get("_vendor"), "product": r.get("_product"),
                "events": float(r.get("eventos") or 0), "bytes": float(r.get("bytes_total") or 0)} for r in rows]
        # Todas (são dezenas), para se saber quantas ficam de fora do top.
        return sorted(out, key=lambda x: -x["events"])
