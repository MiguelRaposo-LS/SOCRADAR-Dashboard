"""Consultas XQL à API pública do Cortex XSIAM — só leitura.

Cópia reduzida do cortex_client.py do Azores Cyber 360 (mesma chave, mesma
autenticação): só o XQL, com janela de tempo absoluta. Nunca regista nem
devolve a chave; os erros dizem o endpoint e o código HTTP.
"""
from __future__ import annotations

import hashlib
import json
import logging
import secrets
import string
import threading
import time

import requests

log = logging.getLogger(__name__)


class XsiamError(RuntimeError):
    """`kind`: 'auth' (401), 'proibido' (403), 'http', 'rede' ou 'xql'."""

    def __init__(self, kind: str, message: str):
        super().__init__(message)
        self.kind = kind


class XsiamClient:
    def __init__(self, url: str, key: str, key_id: str, auth: str = "standard",
                 verify_tls: bool = True, timeout: int = 60):
        self.url = url.rstrip("/")
        self._key = key
        self._key_id = str(key_id)
        self._advanced = auth.strip().lower() == "advanced"
        self._verify = verify_tls
        self._timeout = timeout
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
            raise XsiamError("rede", f"Sem ligação ao XSIAM em {path} ({type(exc).__name__}).") from None

    def _post(self, path: str, request_data: dict) -> dict:
        mode = self._advanced
        r = self._send(path, request_data, mode)
        if r.status_code == 401:
            # A chave do GRA alternou entre «advanced» e «standard» a
            # 2026-09-30 (visto no Azores Cyber 360): num 401 tenta-se o outro.
            with self._auth_lock:
                if self._advanced == mode:
                    r2 = self._send(path, request_data, not mode)
                    if r2.status_code != 401:
                        self._advanced = not mode
                        log.warning("A chave do XSIAM deu 401 como %s e funciona como %s: "
                                    "acerta CORTEX_AUTH no .env.",
                                    "advanced" if mode else "standard",
                                    "standard" if mode else "advanced")
                        r = r2
                else:
                    r = self._send(path, request_data, self._advanced)
        if r.status_code != 200:
            motivo = ""
            try:
                motivo = str(((r.json() or {}).get("reply") or {}).get("err_extra") or "")[:200]
            except (ValueError, AttributeError):
                pass
            kind = {401: "auth", 403: "proibido"}.get(r.status_code, "http")
            raise XsiamError(kind, f"XSIAM respondeu {r.status_code} em {path}."
                             + (f" Motivo: {motivo}" if motivo else ""))
        try:
            return r.json().get("reply") or {}
        except ValueError:
            raise XsiamError("http", f"Resposta do XSIAM em {path} não é JSON.") from None

    # Pede-se muito acima do que pode vir e confere-se o número de linhas: com
    # limit=1000 o XSIAM cortou resultados sem aviso (Azores Cyber 360,
    # 2026-09-29).
    XQL_LIMIT = 1_000_000

    def xql(self, query: str, from_ms: int, to_ms: int, wait_s: int = 90) -> list[dict]:
        """Corre `query` sobre a janela [from_ms, to_ms). Janela absoluta, e
        não relativa: cada consulta lê exatamente o minuto que lhe cabe."""
        qid = None
        for attempt in range(3):
            try:
                r = self._post("/public_api/v1/xql/start_xql_query/",
                               {"query": query, "tenants": [],
                                "timeframe": {"from": int(from_ms), "to": int(to_ms)}})
                qid = r if isinstance(r, str) else r.get("query_id") if isinstance(r, dict) else r
                break
            except XsiamError as exc:
                # 500/502 passageiros ao arrancar consultas (2026-09-29).
                if exc.kind != "http" or attempt == 2:
                    raise
                time.sleep(3 * (attempt + 1))
        deadline = time.time() + wait_s
        while True:
            try:
                res = self._post("/public_api/v1/xql/get_query_results/",
                                 {"query_id": qid, "pending_flag": True,
                                  "limit": self.XQL_LIMIT, "format": "json"})
            except XsiamError as exc:
                if exc.kind in ("rede", "http") and time.time() < deadline:
                    time.sleep(3)
                    continue
                raise
            status = res.get("status")
            if status == "SUCCESS":
                break
            if status != "PENDING":
                err = res.get("error") or {}
                motivo = err.get("validation_message") if isinstance(err, dict) else err
                raise XsiamError("xql", f"Consulta XQL falhou ({status}): {motivo or 'sem motivo'}")
            if time.time() > deadline:
                raise XsiamError("xql", "Consulta XQL sem resposta a tempo.")
            time.sleep(1.5)
        self.last_quota = res.get("remaining_quota")
        results = res.get("results") or {}
        expected = res.get("number_of_results")
        if "stream_id" in results:
            r = self._session.post(self.url + "/public_api/v1/xql/get_query_results_stream/",
                                   json={"request_data": {"stream_id": results["stream_id"],
                                                          "is_gzip_compressed": False}},
                                   headers=self._headers(), timeout=self._timeout, verify=self._verify)
            if r.status_code != 200:
                raise XsiamError("http", f"XSIAM respondeu {r.status_code} ao ler o stream XQL.")
            rows = [json.loads(line) for line in r.text.splitlines() if line.strip()]
        else:
            rows = list(results.get("data") or [])
        if isinstance(expected, int) and len(rows) != expected:
            raise XsiamError("xql", f"XQL devolveu {len(rows)} de {expected} linhas.")
        return rows
