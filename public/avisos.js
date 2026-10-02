/* Notificações laterais (pedido do Miguel, 2026-10-02): um caso crítico novo
   e um DDoS em curso aparecem num cartão do lado direito do ecrã, no painel
   e no mapa — antes um crítico novo só se notava pelo número do cartão, e um
   DDoS era mais um arco vermelho entre milhares.

   Há uma cópia IGUAL em mapa/frontend/app/public/avisos.js (portas
   diferentes = sites diferentes; cada um serve a sua); tests/test_dashboard.py
   confere que são iguais. Mudar nos dois.

   De 30 em 30 s:
   - casos críticos novos: GET <painel>/api/avisos — o servidor diz quais viu
     pela primeira vez há menos de 10 min (server.py); cada um fica no ecrã
     esse tempo;
   - DDoS: GET <mapa>/api/estado → resumo.ddos (mapa/backend/main.py). No
     mapa não se mostra aqui: lá há um aviso fixo no topo.
   Cada servidor deixa o outro (e só o outro) ler estes dados. Sem resposta,
   não aparece nada — nunca um aviso inventado. */
(function () {
  "use strict";
  const PAINEL = `${location.protocol}//${location.hostname}:8360/`;
  const MAPA = `${location.protocol}//${location.hostname}:8001/`;
  const NO_MAPA = location.port === "8001";
  const CADA_MS = 30_000;
  const TZ = "Atlantic/Azores";

  const CSS = `
.avisos { position: fixed; right: 1.4vh; top: 12vh; z-index: 9000; width: min(30vw, 46vh);
  display: flex; flex-direction: column; gap: 1.1vh; pointer-events: none;
  font-family: Inter, "Segoe UI", system-ui, sans-serif; }
.aviso { background: rgba(14, 20, 34, .96); color: #e6ecf5; border: 1px solid rgba(255, 255, 255, .1);
  border-left: .5vh solid #d92b4a; border-radius: .8vh; padding: 1.2vh 1.5vh;
  box-shadow: 0 1.2vh 3vh rgba(0, 0, 0, .5); animation: aviso-entra .45s cubic-bezier(.2, .8, .2, 1); }
.aviso-titulo { font-size: clamp(11px, 1.15vh, 26px); font-weight: 700; letter-spacing: .08em;
  text-transform: uppercase; color: #ff6b81; display: flex; align-items: center; gap: .6vh; }
.aviso-titulo::before { content: ""; width: 1vh; height: 1vh; border-radius: 50%; background: #d92b4a;
  box-shadow: 0 0 0 0 rgba(217, 43, 74, .7); animation: aviso-pulso 1.6s infinite; }
.aviso-nome { font-size: clamp(14px, 1.6vh, 36px); font-weight: 600; line-height: 1.25; margin-top: .5vh;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.aviso-meta { font-size: clamp(11px, 1.2vh, 27px); color: #9fb0c6; margin-top: .4vh;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@keyframes aviso-entra { from { transform: translateX(110%); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes aviso-pulso { 70% { box-shadow: 0 0 0 1vh rgba(217, 43, 74, 0); } 100% { box-shadow: 0 0 0 0 rgba(217, 43, 74, 0); } }
html.leve .aviso, html.leve .aviso-titulo::before { animation: none; }
`;

  let caixa = null;
  function preparar() {
    if (caixa) return caixa;
    const st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);
    caixa = document.createElement("div");
    caixa.className = "avisos";
    caixa.setAttribute("role", "status");
    caixa.setAttribute("aria-live", "polite");
    document.body.appendChild(caixa);
    return caixa;
  }

  const ha = (ms) => {
    const m = Math.max(0, Math.round((Date.now() - ms) / 60_000));
    return m < 1 ? "agora" : `há ${m} min`;
  };
  const hora = (ms) => new Date(ms).toLocaleTimeString("pt-PT", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
  const nf = (n) => Number(n).toLocaleString("pt-PT");

  // Um cartão por chave: atualiza o texto se já existe, cria se é novo, tira
  // os que deixaram de vir. Os que ficam não voltam a entrar (sem piscar).
  function mostrar(lista) {
    const c = preparar();
    const ficam = new Set(lista.map((a) => a.chave));
    c.querySelectorAll(".aviso").forEach((el) => { if (!ficam.has(el.dataset.chave)) el.remove(); });
    for (const a of lista) {
      // As chaves são «critico-<número>» ou «ddos»: seguras num seletor.
      let el = c.querySelector(`.aviso[data-chave="${a.chave}"]`);
      if (!el) {
        el = document.createElement("div");
        el.className = "aviso";
        el.dataset.chave = a.chave;
        el.innerHTML = '<div class="aviso-titulo"></div><div class="aviso-nome"></div><div class="aviso-meta"></div>';
        c.appendChild(el);
      }
      el.children[0].textContent = a.titulo;
      el.children[1].textContent = a.nome;
      el.children[2].textContent = a.meta;
    }
  }

  async function ler(url) {
    try {
      const r = await fetch(url, { cache: "no-store", credentials: "include" });
      return r.ok ? await r.json() : null;
    } catch (e) {
      return null;   // o outro servidor em baixo: sem aviso, nunca um inventado
    }
  }

  async function ciclo() {
    const lista = [];
    const p = await ler(`${PAINEL}api/avisos`);
    for (const c of (p && p.criticos) || []) {
      lista.push({ chave: `critico-${c.id}`, titulo: "Caso crítico novo",
                   nome: c.nome || `Caso #${c.id}`,
                   meta: [c.host, `#${c.id}`, `criado às ${hora(c.criado)}`, ha(c.visto)].filter(Boolean).join(" · ") });
    }
    if (!NO_MAPA) {
      const m = await ler(`${MAPA}api/estado`);
      const d = m && m.resumo && m.resumo.ddos;
      if (d && d.ativo) {
        const site = (d.hosts[0] || [""])[0];
        lista.unshift({ chave: "ddos", titulo: "DDoS em curso",
                        nome: site || "sites do GRA",
                        meta: `${nf(d.pedidos)} pedidos travados · ${nf(d.paises)} país${d.paises === 1 ? "" : "es"} · últimos ${d.minutos} min` });
      }
    }
    mostrar(lista);
  }

  function arrancar() {
    ciclo();
    setInterval(ciclo, CADA_MS);
  }
  if (document.body) arrancar();
  else document.addEventListener("DOMContentLoaded", arrancar);
})();
