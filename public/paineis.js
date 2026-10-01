/* Dashboards do XSIAM (exportados da consola), desenhados a partir dos
   resultados das consultas XQL de cada widget. Ver xsiam_dashboards.py.

   Cada widget é desenhado pela forma dos dados, com o tipo de visualização do
   XSIAM (viewOptions) como pista:
   - uma linha com um número → número grande;
   - uma coluna de texto + uma numérica → pizza, linha ou colunas, conforme o
     tipo do XSIAM (colunas por omissão);
   - o resto → tabela. */
"use strict";

const REFRESH_MS = 60_000;
const $ = (id) => document.getElementById(id);
// Modo leve (por browser): sem animações decorativas e com as listas a
// avançar uma linha de cada vez em vez de deslizarem. Para ver o painel por
// ambiente de trabalho remoto (xrdp: a sessão desenha em software, mesmo com
// a L4 na máquina): aí cada píxel que se
// mexe é desenhado pelo CPU e enviado pela rede, e o movimento contínuo
// pesava muito (2026-10-01). A TV não precisa dele.
// Liga-se com o botão «Modo leve» ou com ?leve na URL (?leve=0 desliga).
const LEVE = (() => {
  const q = new URLSearchParams(location.search);
  try {
    if (q.has("leve")) localStorage.setItem("ac360:leve", q.get("leve") === "0" ? "0" : "1");
    return localStorage.getItem("ac360:leve") === "1";
  } catch { return q.has("leve") && q.get("leve") !== "0"; }
})();
if (LEVE) document.documentElement.classList.add("leve");
function toggleLeve() {
  try { localStorage.setItem("ac360:leve", LEVE ? "0" : "1"); } catch { /* sem storage */ }
  location.replace(location.pathname + location.search.replace(/[?&]leve(=[^&]*)?/g, "").replace(/^&/, "?"));
}
function wireLeve(id) {
  const b = document.getElementById(id);
  if (!b) return;
  b.textContent = LEVE ? "Modo leve: ligado" : "Modo leve: desligado";
  b.setAttribute("aria-pressed", String(LEVE));
  b.addEventListener("click", toggleLeve);
}
const css = getComputedStyle(document.documentElement);
const v = (n) => css.getPropertyValue(n).trim();
const rem = () => parseFloat(css.fontSize);
// Categórica, validada contra o fundo escuro (dataviz/validate_palette.js,
// 2026-09-30): distinguível com e sem daltonismo. Não usa as cores de
// severidade, que estão reservadas.
const CATEG = ["#5b8def", "#1a9c8e", "#a178f0", "#d9658f", "#b58a2c", "#4494c9"];
const nf = (n) => Number(n).toLocaleString("pt-PT");
const charts = new Map();
let current = null;

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function isNum(x) { return x !== null && x !== "" && !isNaN(Number(x)); }
function windowLabel(ms) {
  const h = Math.round(ms / 3_600_000);
  return h < 48 ? `últimas ${h} h` : `últimos ${Math.round(h / 24)} dias`;
}
function ago(ms) {
  if (!ms) return "—";
  const m = Math.max(0, Math.round((Date.now() - ms) / 60_000));
  return m < 1 ? "agora" : `há ${m} min`;
}

async function api(path) {
  const r = await fetch(path, { cache: "no-store", credentials: "same-origin" });
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
  const d = await r.json();
  $("demo-banner").hidden = !d.demo;
  return d;
}

function shape(rows) {
  const cols = rows.length ? Object.keys(rows[0]) : [];
  const numCols = cols.filter((c) => rows.every((r) => isNum(r[c])));
  const txtCols = cols.filter((c) => !numCols.includes(c));
  return { cols, numCols, txtCols };
}

function viewType(view) {
  const t = JSON.stringify(view || {}).toLowerCase();
  if (/pie|donut|doughnut/.test(t)) return "doughnut";
  if (/line|area|trend|time/.test(t)) return "line";
  return "bar";
}

function renderWidget(w) {
  const box = document.createElement("section");
  box.className = "panel paineis-widget";
  box.innerHTML = `<div class="panel-head"><h2 title="${esc(w.description || "")}">${esc(w.title)}</h2>
    <span class="muted">${windowLabel(w.window_ms)}${w.total > (w.rows || []).length ? ` · ${nf(w.rows.length)} de ${nf(w.total)} linhas` : ""}</span></div>
    <div class="paineis-corpo"></div>`;
  const body = box.querySelector(".paineis-corpo");
  if (w.error) { body.innerHTML = `<p class="warn-text">${esc(w.error)}</p>`; return box; }
  if (!w.rows) { body.innerHTML = '<p class="muted">A carregar…</p>'; return box; }
  if (!w.rows.length) { body.innerHTML = '<p class="muted">Sem resultados neste período.</p>'; return box; }

  const { cols, numCols, txtCols } = shape(w.rows);
  if (w.rows.length === 1 && numCols.length >= 1 && cols.length <= 2) {
    body.innerHTML = `<div class="paineis-numero">${nf(w.rows[0][numCols[0]])}</div><div class="muted">${esc(numCols[0])}</div>`;
    return box;
  }
  if (txtCols.length === 1 && numCols.length === 1 && w.rows.length <= 40) {
    const type = viewType(w.view);
    const rows = type === "line" ? w.rows : [...w.rows].sort((a, b) => b[numCols[0]] - a[numCols[0]]);
    body.innerHTML = '<div class="chart-box"><canvas></canvas></div>';
    const single = type !== "doughnut";
    const chart = new Chart(body.querySelector("canvas"), {
      type,
      data: {
        labels: rows.map((r) => r[txtCols[0]]),
        datasets: [{
          label: numCols[0],
          data: rows.map((r) => Number(r[numCols[0]])),
          // Uma só série (colunas, linha) tem uma só cor; a pizza é que
          // precisa de uma por categoria, pela ordem fixa da paleta.
          backgroundColor: single ? CATEG[0] : rows.map((_, i) => CATEG[i % CATEG.length]),
          borderColor: single ? CATEG[0] : v("--surface"),
          borderWidth: single ? 2 : 2, borderRadius: type === "bar" ? 3 : 0,
          tension: 0.2, pointRadius: rem() * 0.2,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 300 },
        indexAxis: type === "bar" && rows.length > 6 ? "y" : "x",
        plugins: { legend: { display: !single, position: "right", labels: { color: v("--ink-2") } } },
        scales: type === "doughnut" ? {} : {
          x: { grid: { display: false }, ticks: { color: v("--ink-2") } },
          y: { grid: { color: v("--grid") }, border: { display: false }, ticks: { color: v("--ink-2") } },
        },
      },
    });
    charts.set(w.key, chart);
    return box;
  }
  body.innerHTML = `<div class="paineis-tabela"><table class="tbl"><thead><tr>${cols.map((c) => `<th class="${numCols.includes(c) ? "num" : ""}">${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${w.rows.map((r) => `<tr>${cols.map((c) => `<td class="${numCols.includes(c) ? "num" : ""}" title="${esc(r[c])}">${numCols.includes(c) ? nf(r[c]) : esc(r[c])}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  return box;
}

/* ---------------- XSIAM Command Center (réplica) ---------------- */

// Visual do mesmo género do Command Center da consola: fontes de dados →
// Issues → Cases → Automated/Manual → Resolved/Open, e a faixa de números em
// baixo. Desenhado em SVG a partir dos dados reais (command_center.py). As
// marcas das fontes aparecem como texto: os logótipos não se copiam.
// Animação: o anel roda numa camada própria (compositor) e as partículas
// desenham-se num <canvas> a 30 fps — o SVG do diagrama não se volta a pintar.

const CC_ID = "command-center";
const SEVS = [["critical", "Crítico", "--sev-critical"], ["high", "Alto", "--sev-high"],
              ["medium", "Médio", "--sev-medium"], ["low", "Baixo", "--sev-low"]];
const short = (n) => n >= 1e9 ? `${(n / 1e9).toLocaleString("pt-PT", { maximumFractionDigits: 1 })} mil M`
  : n >= 1e6 ? `${(n / 1e6).toLocaleString("pt-PT", { maximumFractionDigits: 1 })} M`
  : n >= 1e4 ? `${(n / 1e3).toLocaleString("pt-PT", { maximumFractionDigits: 1 })} mil` : nf(Math.round(n));

function spark(values, w = 120, h = 30) {
  if (!values.length) return "";
  const max = Math.max(...values), min = Math.min(...values), span = max - min || 1;
  const pts = values.map((v2, i) => `${(i / Math.max(1, values.length - 1)) * w},${h - 3 - ((v2 - min) / span) * (h - 6)}`);
  const last = pts[pts.length - 1].split(",");
  return `<svg class="cc-spark" viewBox="0 0 ${w + 6} ${h}" width="${w + 6}" height="${h}" aria-hidden="true">
    <polyline points="${pts.join(" ")}" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="${last[0]}" cy="${last[1]}" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
}

// Ícone de severidade (dupla seta, como na consola), na cor partilhada.
const CHEV = '<svg class="cc-chev-ico" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6.5 6 3l4 3.5M2 10 6 6.5 10 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function sevChevrons(sev, big) {
  return SEVS.map(([k, l, col]) => `<span class="cc-chev" title="${l}"><span style="color:var(${col})">${CHEV}</span>${big ? `<strong>${nf(sev[k])}</strong>` : nf(sev[k])}</span>`).join("");
}

// «F5 LB», «VMWARE vCenter»: fornecedor e produto, como na consola; só o
// produto («LB», «waf») era ambíguo. Cortado para caber à esquerda.
function srcName(s) {
  const vnd = String(s.vendor || "").trim(), prd = String(s.product || "").trim();
  const name = prd.toLowerCase().startsWith(vnd.toLowerCase()) ? prd : `${vnd} ${prd}`.trim();
  return name.length > 24 ? name.slice(0, 23) + "…" : name;
}

// Trajeto invisível de uma corrente de partículas: o <canvas> lê-o e desenha
// os pontos por cima (ver startParticles). Animar as partículas dentro do
// SVG (stroke-dashoffset) obrigava o browser a redesenhar o diagrama inteiro
// 60×/s — 600 pinturas e ~3,8 s de raster em cada 5 s (medido a 2026-10-01).
function guia(d, col, op, w, phase) {
  return `<path class="cc-guia" d="${d}" fill="none" stroke="none" data-col="${col}" data-op="${op.toFixed(2)}" data-w="${w.toFixed(1)}" data-phase="${phase.toFixed(2)}"/>`;
}

// O anel numa camada à parte (HTML), que roda com transform: o compositor
// trata disso sem redesenhar nada. Coordenadas relativas ao centro.
function ringSvg() {
  const teal = CATEG[1];
  let dots = "";
  for (const [r, n, col] of [[78, 34, teal], [56, 24, teal], [34, 16, CATEG[4]], [16, 8, CATEG[3]]]) {
    for (let k = 0; k < n; k++) {
      const a = (k / n) * 2 * Math.PI;
      dots += `<circle cx="${(r * Math.cos(a)).toFixed(1)}" cy="${(r * Math.sin(a)).toFixed(1)}" r="${r > 50 ? 2.6 : 1.8}" fill="${col}" opacity="${r > 50 ? .9 : .6}"/>`;
    }
  }
  // centro (790, 320) e raio 90 no viewBox 1600×620 do diagrama
  return `<svg class="cc-anel" viewBox="-90 -90 180 180" aria-hidden="true"
    style="left:${(700 / 1600 * 100).toFixed(3)}%;top:${(230 / 620 * 100).toFixed(3)}%;width:${(180 / 1600 * 100).toFixed(3)}%">${dots}</svg>`;
}

let ccLoop = null, ccResize = null;
function startParticles(wrap) {
  stopParticles();
  const svg = wrap.querySelector(".cc-flow"), cv = wrap.querySelector(".cc-canvas");
  const ctx = cv.getContext("2d");
  const VW = 1600, SPACING = 18, SPEED = 45, CYCLE = 4;   // unidades do viewBox; 4 s por ciclo
  // Amostra cada trajeto uma vez (um ponto a cada 2 unidades).
  const streams = [...svg.querySelectorAll(".cc-guia")].map((p) => {
    const len = p.getTotalLength(), pts = [];
    for (let t = 0; t <= len; t += 2) { const q = p.getPointAtLength(t); pts.push(q.x, q.y); }
    return { pts, len, col: p.dataset.col, op: +p.dataset.op, w: +p.dataset.w, phase: +p.dataset.phase };
  });
  // Modo leve: as partículas desenham-se uma vez, paradas. O «movimento
  // reduzido» do sistema não conta: o Windows do PC da TV tinha-o ligado e
  // as partículas não andavam (ver style.css, no radar).
  const reduce = LEVE;
  // O tamanho só se lê quando muda: lê-lo em cada fotograma obrigava a um
  // recálculo de estilo por fotograma (301 em 5 s, medido).
  let W = 0, H = 0, k = 1;
  const resize = () => {
    const rect = svg.getBoundingClientRect(), dpr = devicePixelRatio || 1;
    W = cv.width = Math.round(rect.width * dpr); H = cv.height = Math.round(rect.height * dpr); k = W / VW;
  };
  resize();
  if (ccResize) ccResize.disconnect();
  ccResize = new ResizeObserver(resize); ccResize.observe(svg);
  // Temporizador a 30 fps, e não requestAnimationFrame: o rAF acorda a página
  // 60×/s (12,7% da main thread medidos, mesmo a desenhar só em metade).
  const frame = () => {
    if (document.hidden) return;                     // separador escondido: não desenha
    const now = performance.now();
    ctx.clearRect(0, 0, W, H);
    const t = reduce ? 0 : now / 1000;
    for (const s of streams) {
      // Todos os pontos de uma corrente num só caminho e um só fill.
      ctx.fillStyle = s.col; ctx.globalAlpha = s.op;
      const off = (((t + s.phase) % CYCLE) / CYCLE * SPEED * CYCLE) % SPACING, r = (s.w / 2) * k;
      ctx.beginPath();
      for (let d = off; d < s.len; d += SPACING) {
        const i = Math.min(s.pts.length - 2, Math.round(d / 2) * 2), x = s.pts[i] * k, y = s.pts[i + 1] * k;
        ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, 2 * Math.PI);
      }
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };
  frame();
  if (!reduce) ccLoop = setInterval(frame, 33);
}

function stopParticles() {
  if (ccLoop) { clearInterval(ccLoop); ccLoop = null; }
}

function flowSvg(d) {
  const W = 1600, H = 620, IX = 560, IY = 320;          // ponto das Issues
  const c = d.cases, src = d.sources || [];
  const more = Math.max(0, (d.sources_total || src.length) - src.length);
  const rows = src.length + (more ? 1 : 0);
  const y0 = 70, step = rows > 1 ? (H - 2 * y0) / (rows - 1) : 0;
  const maxEv = Math.max(1, ...src.map((s) => s.events));
  const teal = CATEG[1], ink3 = v("--ink-3"), ink2 = v("--ink-2");
  const R = 790;                                         // centro do anel (o anel em si: ringSvg)
  let left = "";
  src.forEach((s, i) => {
    const y = y0 + i * step, sw = 1.5 + 9 * Math.sqrt(s.events / maxEv);
    // A mesma curva para todas (só muda a origem): convergem por igual.
    const p = `M 270 ${y} C 420 ${y}, 430 ${IY}, ${IX} ${IY}`;
    const col = CATEG[i % CATEG.length];
    const icon = s.name_only ? "" : s.icon
      ? (/\.svg$/i.test(s.icon)
        // SVG: transparente e feito para fundo escuro (texto branco) — sem placa.
        ? `<image href="${esc(s.icon)}" x="212" y="${y - 13}" width="44" height="26" preserveAspectRatio="xMidYMid meet"/>`
        // PNG/JPG/WebP: trazem fundo próprio (branco ou preto) e tamanhos
        // diferentes; numa placa clara igual para todos parecem emblemas, e
        // não quadrados soltos. Tirar o fundo não serve: o texto escuro dos
        // logótipos ficava ilegível no fundo escuro.
        : `<rect x="212" y="${y - 13}" width="44" height="26" rx="5" fill="#f4f6f9"/>
           <image href="${esc(s.icon)}" x="215" y="${y - 10.5}" width="38" height="21" preserveAspectRatio="xMidYMid meet"/>`)
      : `<circle cx="240" cy="${y}" r="9" fill="none" stroke="${col}" stroke-width="1.3"/><text x="240" y="${y + 4}" text-anchor="middle" class="cc-ini" fill="${col}">${esc((s.vendor || s.product || "?").trim().charAt(0).toUpperCase())}</text>`;
    left += `<path d="${p}" stroke="${ink3}" stroke-opacity=".3" stroke-width="${sw.toFixed(1)}" fill="none"/>
      ${[0, 1, 2].map((k) => guia(p, col, .55 - k * .12, 2.4 - k * .4, (i * 0.53 + k * 1.37) % 4)).join("")}
      <text x="${s.name_only ? 252 : s.icon ? 206 : 222}" y="${y + 5}" text-anchor="end" class="cc-src${s.name_only ? " cc-src-forte" : ""}"><title>${esc(s.vendor)} ${esc(s.product)} · ${short(s.events)} eventos · ${(s.bytes / 1e9).toLocaleString("pt-PT", { maximumFractionDigits: 1 })} GB${s.icon || s.name_only ? "" : " · sem logótipo (ficheiro " + esc(s.slug) + ".svg em falta)"}</title>${esc(srcName(s))}</text>
      ${icon}
      <circle cx="266" cy="${y}" r="5" fill="${v("--bg")}" stroke="${ink2}" stroke-width="1.5"/>`;
  });
  if (more) {
    const y = y0 + src.length * step;
    left += `<text x="252" y="${y + 5}" text-anchor="end" class="cc-src cc-mais">+${more}</text>
      <text x="252" y="${y + 24}" text-anchor="end" class="cc-sub">fontes de dados</text>
      <circle cx="266" cy="${y}" r="5" fill="${v("--bg")}" stroke="${ink2}" stroke-width="1.5"/>`;
  }
  // ---- lado direito: nós e ligações explícitos -------------------------
  // Coordenadas no viewBox 1600×620 (verificáveis com ?debug, que as marca
  // no ecrã e as escreve na consola):
  //   cases     (1010, 320)  saída à direita do número «Cases»
  //   automated (1180, 150)  círculo r=18: entra em x=1162, sai em x=1198
  //   manual    (1180, 480)  círculo r=18: entra em x=1162, sai em x=1198
  //   resolved  (1380, 150)  ponta esquerda de «Resolved Cases»
  //   open      (1360, 425/455/485/515)  chegada de cada severidade
  const tot = Math.max(1, c.total), CX = 1000, R_NODE = 18;
  const N = {
    cases: { x: CX + 10, y: IY },
    automated: { x: 1180, y: 150 },
    manual: { x: 1180, y: 480 },
    resolved: { x: 1380, y: 150 },
    open: { x: 1360, y: 470 },
  };
  const AX = N.automated.x, AY = N.automated.y, MX = N.manual.x, MY = N.manual.y;
  const RX = N.resolved.x + 20, OX = N.open.x + 30, OY = N.open.y;
  const out = (n) => ({ x: n.x + R_NODE, y: n.y });     // sai pela direita do círculo
  const inn = (n) => ({ x: n.x - R_NODE, y: n.y });     // entra pela esquerda
  const sevPt = (i) => ({ x: N.open.x, y: OY - 45 + i * 30 });   // 425, 455, 485, 515: de 30 em 30
  // A mesma Bézier para todas as ligações: pontos de controlo a meio caminho.
  const pathBezier = (o, d) => {
    const dx = d.x - o.x;
    return `M ${o.x} ${o.y} C ${o.x + dx * .5} ${o.y}, ${o.x + dx * .5} ${d.y}, ${d.x} ${d.y}`;
  };
  // Espessura do fluxo teal: proporcional aos automáticos, mas com teto, para
  // o ponto mais largo (a entrada do rio, wA × 1,15) não passar de 26 px. As
  // quatro larguras do rio (abaixo) mantêm as proporções entre si.
  const wA = Math.min(2 + 34 * (c.automated / tot), 26 / 1.15);
  const manualResolved = Math.max(0, c.resolved - c.automated);
  const sevOpen = c.open_severity || {};
  const maxSev = Math.max(1, ...SEVS.map(([k]) => sevOpen[k] || 0));
  // Leque: em vez de saírem todas do mesmo píxel, as 4 linhas empilham-se na
  // saída do nó «Manual», cada uma com o espaço da sua espessura mais 1,5 px,
  // pela mesma ordem dos destinos (Crítico em cima, Baixo em baixo). Origens e
  // destinos ordenados + a mesma Bézier = curvas paralelas, que não se cruzam.
  // 1 a 4 px: finas como as outras linhas cinzentas, mas proporcionais entre
  // si (antes iam até 8,5 px e o leque parecia mais pesado do que o fluxo).
  const sevW = SEVS.map(([k]) => 1 + 3 * (sevOpen[k] || 0) / maxSev);
  const GAP = 1.5, pilha = sevW.reduce((a, w) => a + w, 0) + GAP * (sevW.length - 1);
  const sevOrig = sevW.map((w, i) => {
    const antes = sevW.slice(0, i).reduce((a, x) => a + x, 0) + GAP * i;
    return { x: out(N.manual).x, y: N.manual.y - pilha / 2 + antes + w / 2 };
  });
  const LINKS = [
    // 1.º Cases → Automated: o fluxo teal grosso, como na consola (a
    // comparação lado a lado com a captura do original, 2026-10-01, mostrou
    // que não é uma linha fina cinzenta)
    { id: "cases→automated", o: { x: N.cases.x, y: N.cases.y - 4 }, d: inn(N.automated), rio: [wA * 1.15, wA * .85, "url(#cc-grad-entrada)"], n: c.automated },
    // 2.º as linhas finas cinzentas

    { id: "cases→manual", o: { x: N.cases.x, y: N.cases.y + 6 }, d: inn(N.manual), w: 2, col: ink2, op: .7, n: c.manual },
    { id: "manual→resolved", o: out(N.manual), d: N.resolved, w: 1.5 + 6 * (manualResolved / tot), col: ink2, op: .45, n: manualResolved },
    // 3.º a barra teal (por cima da linha manual→resolved)
    { id: "automated→resolved", o: out(N.automated), d: N.resolved, rio: [wA * .9, wA * .7, "url(#cc-grad-auto)"], n: c.automated },
    // 4.º as severidades, por último
    ...SEVS.map(([k, , col], i) => ({ id: `manual→${k}→open`, o: sevOrig[i], d: sevPt(i),
      w: sevW[i], col: `var(${col})`, op: sevOpen[k] ? .9 : .35, n: sevOpen[k] || 0, cap: "round" })),
  ];
  // «Rio» da barra teal: faixa entre duas Bézier com os mesmos pontos de
  // controlo, que afunila (w0 → w1), com gradiente ao longo do caminho.
  const rio = (o, d, w0, w1, fill) => {
    const m = o.x + (d.x - o.x) / 2;
    return `<path d="M ${o.x} ${o.y - w0 / 2} C ${m} ${o.y - w0 / 2}, ${m} ${d.y - w1 / 2}, ${d.x} ${d.y - w1 / 2}
      L ${d.x} ${d.y + w1 / 2} C ${m} ${d.y + w1 / 2}, ${m} ${o.y + w0 / 2}, ${o.x} ${o.y + w0 / 2} Z" fill="${fill}"/>`;
  };
  const linksSvg = LINKS.map((l) => l.rio
    ? `<g data-link="${l.id}">${rio(l.o, l.d, ...l.rio)}<title>${l.id}: ${nf(l.n)}</title></g>`
    : `<path data-link="${l.id}" d="${pathBezier(l.o, l.d)}" stroke="${l.col}" stroke-width="${l.w.toFixed(1)}" stroke-opacity="${l.op}"${l.cap ? ` stroke-linecap="${l.cap}"` : ""} fill="none"><title>${l.id}: ${nf(l.n)}</title></path>`).join("");
  const DEBUG = new URLSearchParams(location.search).has("debug");
  if (DEBUG) console.table(Object.fromEntries(LINKS.map((l) => [l.id, { de: `${l.o.x},${l.o.y}`, para: `${l.d.x},${l.d.y}` }])));
  const debugSvg = DEBUG ? Object.entries(N).map(([k, n]) =>
    `<circle cx="${n.x}" cy="${n.y}" r="4" fill="#ff00ff"/><text x="${n.x + 6}" y="${n.y - 6}" fill="#ff00ff" font-size="13">${k} (${n.x},${n.y})</text>`).join("") : "";
  return `<svg class="cc-flow" viewBox="0 0 ${W} ${H}" role="img" aria-label="Fluxo das últimas 24h: ${d.alerts.issues} issues, ${c.total} casos, ${c.automated} automáticos, ${c.manual} manuais, ${c.resolved} resolvidos, ${c.open} abertos">
    <circle cx="${R}" cy="${IY}" r="150" fill="none" stroke="${teal}" stroke-opacity=".08" stroke-width="30"/>
    <circle cx="${R}" cy="${IY}" r="118" fill="none" stroke="${teal}" stroke-opacity=".35" stroke-width="1.5" stroke-dasharray="120 250"/>
    ${left}
    <text x="${IX + 80}" y="${IY - 6}" text-anchor="middle" class="cc-num">${short(d.alerts.issues)}</text>
    <text x="${IX + 80}" y="${IY + 22}" text-anchor="middle" class="cc-lbl">Issues</text>
    ${guia(`M ${R + 95} ${IY - 10} L ${CX - 90} ${IY - 10}`, teal, .8, 2.4, 0)}
    ${guia(`M ${R + 95} ${IY + 12} L ${CX - 90} ${IY + 12}`, teal, .6, 2.4, 1.9)}
    <text x="${CX - 40}" y="${IY - 6}" text-anchor="middle" class="cc-num">${nf(c.total)}</text>
    <text x="${CX - 40}" y="${IY + 22}" text-anchor="middle" class="cc-lbl">Cases</text>
    <defs>
      <linearGradient id="cc-grad-auto" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${teal}" stop-opacity=".95"/><stop offset="100%" stop-color="${teal}" stop-opacity=".5"/>
      </linearGradient>
      <linearGradient id="cc-grad-entrada" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${teal}" stop-opacity=".55"/><stop offset="100%" stop-color="${teal}" stop-opacity=".95"/>
      </linearGradient>
    </defs>
    ${linksSvg}
    <circle cx="${AX}" cy="${AY}" r="18" fill="${v("--surface-2")}" stroke="${teal}" stroke-width="2"/>
    <path d="M ${AX - 7} ${AY + 5} h14 M ${AX} ${AY - 7} v6 M ${AX - 7} ${AY + 5} v-5 h14 v5" stroke="${ink2}" stroke-width="1.6" fill="none"/>
    <text x="${AX}" y="${AY - 52}" text-anchor="middle" class="cc-num">${nf(c.automated)}</text>
    <text x="${AX}" y="${AY - 30}" text-anchor="middle" class="cc-lbl">Automated</text>
    <circle cx="${MX}" cy="${MY}" r="18" fill="${v("--surface-2")}" stroke="${ink2}" stroke-width="2"/>
    <circle cx="${MX}" cy="${MY - 4}" r="4" fill="none" stroke="${ink2}" stroke-width="1.6"/>
    <path d="M ${MX - 7} ${MY + 9} a7 6 0 0 1 14 0" stroke="${ink2}" stroke-width="1.6" fill="none"/>
    <text x="${MX}" y="${MY + 56}" text-anchor="middle" class="cc-num">${nf(c.manual)}</text>
    <text x="${MX}" y="${MY + 78}" text-anchor="middle" class="cc-lbl">Manual</text>
    <text x="${RX}" y="${AY - 6}" class="cc-num">${nf(c.resolved)}</text>
    <text x="${RX}" y="${AY + 20}" class="cc-lbl">Resolved Cases</text>
    <text x="${OX}" y="${OY - 4}" class="cc-num">${nf(c.open)}</text>
    <text x="${OX}" y="${OY + 22}" class="cc-lbl">Open Cases</text>
    ${debugSvg}
    <text x="${OX}" y="${OY + 48}" class="cc-sevline">${SEVS.map(([k, l, col]) => `<tspan fill="var(${col})">●</tspan><tspan> ${nf(sevOpen[k] || 0)}   </tspan>`).join("")}</text>
  </svg>`;
}

async function loadCommandCenter() {
  const d = await api("/api/command-center");
  current = CC_ID;
  document.querySelectorAll("#paineis-tabs button").forEach((b) => b.classList.toggle("on", b.dataset.id === CC_ID));
  for (const ch of charts.values()) ch.destroy();
  charts.clear();
  const grid = $("paineis-grid");
  grid.classList.add("cc-grid");
  if (!d.cases && d.error) { grid.innerHTML = `<p class="warn-text paineis-vazio">O XSIAM falhou: ${esc(d.error)}</p>`; return; }
  if (!d.cases) { grid.innerHTML = '<p class="muted paineis-vazio">A carregar (a primeira atualização leva ~1 min depois da recolha inicial do painel)…</p>'; return; }
  const c = d.cases, a = d.alerts, o = d.open, ing = d.ingestion;
  const hrs = ing.hours || [];
  grid.innerHTML = `
    <section class="cc-palco">
      <div class="cc-topo"><h2>XSIAM Command Center</h2><span class="cc-janela">Últimas 24 horas</span></div>
      <div class="cc-flow-wrap">${flowSvg(d)}${ringSvg()}<canvas class="cc-canvas" aria-hidden="true"></canvas></div>
      <div class="cc-faixa">
        <div class="cc-bloco" title="Soma de total_event_count no dataset metrics_source (bate com a consola, ±1%)">
          <div class="cc-bl-t">Events Ingestion</div>
          <div class="cc-bl-v"><strong>${short(ing.events)}</strong><span>/24H</span>${spark(hrs.map((h) => h.events))}</div></div>
        <div class="cc-bloco" title="Soma de total_size_bytes no dataset metrics_source (bate com a consola, ±1%)">
          <div class="cc-bl-t">Data Ingestion</div>
          <div class="cc-bl-v"><strong>${(ing.bytes / 1e9).toLocaleString("pt-PT", { maximumFractionDigits: 0 })}</strong><span>GB/24H</span>${spark(hrs.map((h) => h.bytes))}</div></div>
        <div class="cc-bloco" title="Todos os casos abertos (new / under investigation), todo o histórico">
          <div class="cc-bl-t">Total Open Cases</div>
          <div class="cc-bl-v"><strong>${short(o.total)}</strong><span class="cc-sevs">${sevChevrons(o.severity, true)}</span></div></div>
        <div class="cc-bloco" title="Alertas das últimas 24h com ação de prevenção/bloqueio. A consola conta ~8% mais.">
          <div class="cc-bl-t">Prevented Events</div>
          <div class="cc-bl-v"><strong>${short(a.prevented)}</strong></div></div>
      </div>
      <p class="cc-nota">Definições: Cases = casos criados nas últimas 24h; Automated = resolvidos automaticamente pelo XSIAM; Issues e Prevented Events = alertas das últimas 24h.
        Na consola, Cases, Issues e Prevented usam definições que não se conseguiram reproduzir e podem diferir (~8–18%). Passa o rato por cima de cada número para a definição.</p>
    </section>`;
  startParticles(grid.querySelector(".cc-flow-wrap"));
  $("paineis-meta").textContent = `casos e ingestão: atualizado ${ago(d.at)} (de 15 em 15 min) · alertas: ${ago(d.alerts_at)}`;
  try { history.replaceState(null, "", `?id=${CC_ID}`); } catch { /* sem history */ }
}

async function loadDashboard(id) {
  if (id === CC_ID) return loadCommandCenter();
  const d = await api(`/api/paineis/${encodeURIComponent(id)}`);
  current = id;
  document.querySelectorAll("#paineis-tabs button").forEach((b) => b.classList.toggle("on", b.dataset.id === id));
  for (const c of charts.values()) c.destroy();
  charts.clear();
  const grid = $("paineis-grid");
  grid.classList.remove("cc-grid");
  stopParticles();
  grid.innerHTML = "";
  d.widgets.forEach((w) => grid.appendChild(renderWidget(w)));
  const at = Math.max(0, ...d.widgets.map((w) => w.at || 0));
  $("paineis-meta").textContent = `${d.widgets.length} widgets · atualizado ${ago(at)} · de 15 em 15 min`;
  try { history.replaceState(null, "", `?id=${encodeURIComponent(id)}`); } catch { /* sem history */ }
}

async function boot() {
  if (typeof Chart !== "undefined") Chart.defaults.font.size = Math.round(rem() * 0.75);
  const { dashboards } = await api("/api/paineis");
  // O Command Center (réplica) vem sempre primeiro; a seguir, os exportados.
  dashboards.unshift({ id: CC_ID, name: "XSIAM Command Center", description: "Réplica do dashboard pré-definido da consola" });
  $("paineis-tabs").innerHTML = dashboards.map((d) =>
    `<button data-id="${esc(d.id)}" title="${esc(d.description || "")}">${esc(d.name)}</button>`).join("");
  document.querySelectorAll("#paineis-tabs button").forEach((b) => b.addEventListener("click", () => loadDashboard(b.dataset.id)));
  const wanted = new URLSearchParams(location.search).get("id");
  await loadDashboard(dashboards.some((d) => d.id === wanted) ? wanted : dashboards[0].id);
  setInterval(() => current && loadDashboard(current).catch(console.error), REFRESH_MS);
}

wireLeve("btn-leve");
boot().catch((e) => { console.error(e); $("paineis-vazio").textContent = "Não foi possível ler os dashboards do servidor."; });
