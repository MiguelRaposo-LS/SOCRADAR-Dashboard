/* Azores Cyber 360 — frontend.
   Sem framework: fetch periódico dos /api/*, Chart.js para as barras e o
   radar, rotação das tabelas com pausa ao passar o rato. A chave do Cortex
   nunca passa por aqui: o browser só fala com o nosso servidor. */
"use strict";

const REFRESH_MS = 60_000;
const STALE_MS = 10 * 60_000;
const TZ = "Atlantic/Azores";

const css = getComputedStyle(document.documentElement);
const v = (name) => css.getPropertyValue(name).trim();
// Lidas das variáveis CSS — a única definição das cores de severidade.
const SEV = {
  critical: { label: "Crítico", color: v("--sev-critical") },
  high:     { label: "Alto",    color: v("--sev-high") },
  medium:   { label: "Médio",   color: v("--sev-medium") },
  low:      { label: "Baixo",   color: v("--sev-low") },
};
const SEV_ORDER = ["low", "medium", "high", "critical"]; // de baixo para cima na pilha
const $ = (id) => document.getElementById(id);
// Modo leve (por browser): sem animações decorativas e com as listas a
// avançar uma linha de cada vez em vez de deslizarem. Para ver o painel por
// ambiente de trabalho remoto (xrdp: a sessão desenha em software, mesmo com
// a L4 na máquina): aí cada píxel que se
// mexe é desenhado pelo CPU e enviado pela rede, e o movimento contínuo
// pesava muito (2026-10-01). A TV não precisa dele.
// Liga-se com ?leve na URL e desliga-se com ?leve=0; o browser guarda a
// escolha. (Havia um botão no rodapé; saiu a 2026-10-02, a pedido do Miguel.)
const LEVE = (() => {
  const q = new URLSearchParams(location.search);
  try {
    if (q.has("leve")) localStorage.setItem("ac360:leve", q.get("leve") === "0" ? "0" : "1");
    return localStorage.getItem("ac360:leve") === "1";
  } catch { return q.has("leve") && q.get("leve") !== "0"; }
})();
if (LEVE) document.documentElement.classList.add("leve");
// Milhares com espaço (5 072, não 5072): lê-se de longe num monitor de parede.
const nf = (n) => (n === null || n === undefined ? "–" : Number(n).toLocaleString("pt-PT"));

// O Chart.js desenha em px; o resto do ecrã está em rem, que escala com o
// tamanho do monitor. Sem isto, num 4K os eixos e legendas ficavam com metade
// do tamanho do texto à volta.
const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize);
function scaleCharts() {
  // Sem o CDN, o Chart.js não existe; o resto do ecrã tem de funcionar na mesma.
  if (typeof Chart === "undefined") return;
  Chart.defaults.font.size = Math.round(rem() * 0.8);
  Chart.defaults.locale = "pt-PT"; // «25 000», não «25,000»
  // A legenda e os rótulos do radar têm tamanhos próprios em px (o radar usa
  // 10px por omissão e ignora o valor global); têm de ser escalados à mão.
  Chart.defaults.plugins.legend.labels.boxWidth = Chart.defaults.plugins.legend.labels.boxHeight = Math.round(rem() * 0.7);
  for (const c of [volumeChart, radarChart]) {
    if (!c) continue;
    if (c.config.type === "radar") c.options.scales.r.pointLabels.font = { size: Math.round(rem() * 0.75) };
    c.options.plugins.legend.labels.boxWidth = c.options.plugins.legend.labels.boxHeight = Math.round(rem() * 0.7);
    c.update("none");
  }
}

// Diferença entre o relógio do servidor e o do browser: as idades contam-se
// pelo servidor, que é quem sabe quando os dados foram lidos.
let serverSkew = 0;
let lastOk = null;
let serverReachable = true;
let apiState = "a_sincronizar";

class NotSynced extends Error {}

// A última resposta de cada endpoint fica no localStorage. Ao abrir a página
// (um refresh, um hard refresh, a TV a ligar) desenha-se logo com ela, e
// cada painel é substituído quando a resposta nova chega — em vez de ~0,3 s
// de «–» e «A preparar…» (diagnóstico de 2026-09-30). O estado da API diz
// de quando são os dados, por isso um valor guardado nunca passa por fresco.
// O localStorage pode não existir ou estar cheio: tudo em try/catch.
const CACHE_PREFIX = "ac360:";
let fromCache = false;

function cacheGet(path) {
  try { return JSON.parse(localStorage.getItem(CACHE_PREFIX + path)); } catch { return null; }
}
function cachePut(path, data) {
  try { localStorage.setItem(CACHE_PREFIX + path, JSON.stringify(data)); } catch { /* sem espaço: segue */ }
}

async function api(path) {
  if (fromCache) {
    const cached = cacheGet(path);
    if (!cached) throw new NotSynced();  // nada guardado: fica o placeholder
    $("demo-banner").hidden = !cached.demo;
    return cached;
  }
  const r = await fetch(path, { cache: "no-store", credentials: "same-origin" });
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
  const data = await r.json();
  if (data.synced !== false) cachePut(path, data);
  if (data.server_time) serverSkew = data.server_time - Date.now();
  $("demo-banner").hidden = !data.demo;
  // Sem primeira sincronização, os painéis ficam com o que tinham («–», «a
  // aguardar») em vez de mostrarem zeros que ninguém mediu.
  if (data.synced === false && !path.startsWith("/api/summary")) throw new NotSynced();
  return data;
}
const now = () => Date.now() + serverSkew;

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function dash(s) { return s ? esc(s) : '<span class="muted">—</span>'; }

function age(ms) {
  if (!ms) return "—";
  const m = Math.max(0, Math.floor((now() - ms) / 60_000));
  if (m < 60) return `${m} min`;
  if (m < 48 * 60) return `${Math.floor(m / 60)} h`;
  return `${Math.floor(m / 1440)} d`;
}
function sevDot(sev) {
  const s = SEV[sev];
  if (!s) return '<span class="sev-dot" style="--c:var(--ink-3)" title="Informativo"></span>';
  return `<span class="sev-dot" style="--c:${s.color}" title="${s.label}" aria-label="${s.label}"></span>`;
}
function tech(id, name) {
  if (!id && !name) return '<span class="muted">—</span>';
  return `<span class="tech-id">${esc(id)}</span> ${esc(name)}`;
}

/* ---------------- relógio ---------------- */

const fmtTime = new Intl.DateTimeFormat("pt-PT", { timeZone: TZ, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
// Data por extenso numa só linha (pedido do Miguel, 2026-09-30). Não cabe
// com o título numa linha a 1080p: é o título que parte em duas (ver .brand).
const fmtWeekday = new Intl.DateTimeFormat("pt-PT", { timeZone: TZ, weekday: "long" });
const fmtDate = new Intl.DateTimeFormat("pt-PT", { timeZone: TZ, day: "numeric", month: "long", year: "numeric" });
const fmtHM = new Intl.DateTimeFormat("pt-PT", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false });

function tzLabel(d) {
  // O desvio calcula-se a cada tique: acerta sozinho na mudança de hora
  // (UTC−1 no inverno, UTC+0 no verão) sem código para isso.
  const part = new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "shortOffset" })
    .formatToParts(d).find((p) => p.type === "timeZoneName")?.value || "GMT";
  const off = part.replace("GMT", "");
  return "UTC" + (off ? off.replace("-", "−") : "+0");
}

function tick() {
  const d = new Date(now());
  $("clock-time").textContent = fmtTime.format(d);
  $("clock-tz").textContent = tzLabel(d);
  const wd = fmtWeekday.format(d);
  $("clock-date").textContent = `${wd.charAt(0).toUpperCase() + wd.slice(1)}, ${fmtDate.format(d)}`;
  renderApiStatus();
}

/* ---------------- estado da API ---------------- */

const STATE_TEXT = {
  operacional: "Operacional", degradado: "Degradado",
  sem_ligacao: "Sem ligação", a_sincronizar: "A sincronizar…",
};

function renderApiStatus() {
  let state = apiState;
  // O estado recalcula-se aqui também pela idade: se o servidor deixar de
  // responder, o último «operacional» que ele disse não pode ficar no ecrã.
  if (!serverReachable) state = "sem_ligacao";
  else if (state === "operacional" && lastOk && now() - lastOk > STALE_MS) state = "degradado";
  $("api-status").dataset.state = state;
  $("api-state").textContent = !serverReachable ? "Servidor inacessível" : STATE_TEXT[state] || state;
  $("api-last").textContent = "Última vez: " + (lastOk ? (age(lastOk) === "0 min" ? "agora" : "há " + age(lastOk)) : "—");
}

/* ---------------- cabeçalho ---------------- */

async function loadSummary() {
  const d = await api("/api/summary");
  applyStatus(d.status);
  if (!d.synced) return;
  for (const s of Object.keys(SEV)) $("k-" + s).textContent = nf(d.severity[s]);
  // Por baixo dos cartões (que contam só os de hoje): o total da janela de
  // 90 dias, em texto pequeno. O histórico acumulado («+ N antigos por
  // resolver») saiu do ecrã a 2026-10-02, a pedido do Miguel; continua no
  // /api/summary (backlog).
  const parts = [];
  if (d.open_window !== undefined) parts.push(`${nf(d.open_window)} em 90 dias`);
  $("k-backlog").hidden = !parts.length;
  $("k-backlog").textContent = parts.join(" · ");
  // Auto contido e MTTR vêm das métricas XQL: «–» até à 1.ª consulta chegar.
  $("k-contained").textContent = nf(d.prevention.auto_contained);
  $("k-malware").textContent = nf(d.prevention.threats_blocked);
  const m = d.mttr;
  const hours = m.ready && m.minutes >= 120;
  $("k-mttr").textContent = !m.ready ? "–" : hours
    ? (m.minutes / 60).toLocaleString("pt-PT", { maximumFractionDigits: 1 }) : nf(m.minutes);
  $("k-mttr-unit").textContent = hours ? " h" : " min";
  $("k-mttr-sub").textContent = m.ready ? `${m.period} · ${nf(m.n)} caso${m.n === 1 ? "" : "s"}` : "a carregar…";
}

function applyStatus(st) {
  apiState = st.state;
  lastOk = st.last_ok;
  const bits = [];
  if (st.error) bits.push(`Último erro: ${st.error.message}`);
  bits.push(...(st.warnings || []));
  $("api-status").title = bits.join("\n") || "Sincronização sem erros";
  // Os avisos e o último erro ficam no tooltip do estado da API (acima) e no
  // log; o rodapé passou a ser só institucional.
  renderApiStatus();
}

/* ---------------- volume ---------------- */

let volumeChart = null;
let volumeRange = "7d";
let volumeDados = null;          // a última resposta de /api/incidents
// «Volume» (casos) ou «% do total» (de cada dia). O browser guarda a escolha.
let volumeModo = (() => { try { return localStorage.getItem("ac360:volume-modo") === "pct" ? "pct" : "volume"; } catch { return "volume"; } })();

const gridColor = v("--grid");
const inkColor = v("--ink-2");

// Escala logarítmica nos dois modos (decidido a 2026-10-02, depois de duas
// tentativas postas de lado): as severidades vivem em ordens de grandeza
// diferentes — Médio nos milhares (96–99% dos casos), Alto nas centenas,
// Baixo nas dezenas, Crítico nas unidades — e o log põe cada uma na sua
// faixa. Na escala linear o Médio esmagava as outras junto ao zero, e em
// percentagem acontecia o mesmo (o Médio a ~97%, as outras entre 0 e 3%).
// O log não tem zero: um 0 desenha-se no fundo do eixo (ZERO_LOG.*), com a
// etiqueta «0», e a dica dá sempre o número exato.
const ZERO_LOG = { volume: 0.7, pct: 0.07 };
const pctDe = (n, total) => (total ? (n / total) * 100 : 0);
const pctTxt = (x) => `${x.toLocaleString("pt-PT", { maximumFractionDigits: x < 10 ? 1 : 0 })}%`;
// 1 000 · 10 mil · 100 mil · 1 M: o eixo lê-se de longe, sem números compridos.
function curto(n) {
  if (n >= 1e6) return `${(n / 1e6).toLocaleString("pt-PT", { maximumFractionDigits: 1 })} M`;
  if (n >= 1e4) return `${(n / 1e3).toLocaleString("pt-PT", { maximumFractionDigits: 0 })} mil`;
  return nf(n);
}
// Só potências de 10 (e «0» no fundo): a meio de cada década o Chart.js punha
// 2, 3, 5… e as etiquetas sobrepunham-se. O «1» (ou 0,1%) também sai: fica
// quase à altura do «0».
function etiquetaY(val) {
  const zero = ZERO_LOG[volumeModo];
  if (val <= zero) return "0";
  const e = Math.log10(val);
  if (Math.abs(e - Math.round(e)) > 1e-9) return null;
  if (volumeModo === "pct") return e >= 0 ? `${val}%` : null;     // 1%, 10%, 100%
  return e >= 1 ? curto(val) : null;                                // 10, 100, 1 000, 10 mil…
}

function volumeDatasets(d) {
  const surface = v("--surface");
  const totais = d.buckets.map((b) => SEV_ORDER.reduce((a, s) => a + b[s], 0));
  const zero = ZERO_LOG[volumeModo];
  return SEV_ORDER.map((s) => {
    const reais = d.buckets.map((b) => b[s]);
    const pcts = reais.map((n, k) => pctDe(n, totais[k]));
    const valores = volumeModo === "pct" ? pcts : reais;
    return {
      label: SEV[s].label,
      data: valores.map((x) => Math.max(x, zero)),
      reais, pcts, totais,
      borderColor: SEV[s].color,
      backgroundColor: SEV[s].color,
      borderWidth: Math.max(2, Math.round(rem() * 0.15)),
      tension: 0.2,
      fill: false,
      pointRadius: d.buckets.map((b) => (b.partial ? rem() * 0.35 : d.buckets.length > 31 ? 0 : rem() * 0.2)),
      pointHoverRadius: rem() * 0.4,
      // O período de hoje ainda está a decorrer: ponto vazio e último troço a
      // tracejado e mais ténue, para a descida não se ler como uma quebra.
      pointBackgroundColor: d.buckets.map((b) => (b.partial ? surface : SEV[s].color)),
      pointBorderColor: SEV[s].color,
      pointBorderWidth: 2,
      segment: {
        borderDash: (ctx) => (ctx.p1DataIndex === volumePartial ? [6, 5] : undefined),
        borderColor: (ctx) => (ctx.p1DataIndex === volumePartial ? SEV[s].color + "99" : undefined),
      },
    };
  });
}

function volumeEixoY() {
  return {
    type: "logarithmic", min: ZERO_LOG[volumeModo], max: volumeModo === "pct" ? 100 : undefined,
    grid: { color: gridColor }, border: { display: false },
    // Título curto: na vertical, «Volume de incidentes · escala logarítmica»
    // não cabia na altura do painel e saía cortado. A escala diz-se na
    // etiqueta «Escala logarítmica» do cabeçalho (index.html).
    title: { display: true, color: inkColor, text: volumeModo === "pct" ? "% do total" : "Incidentes" },
    ticks: { color: inkColor, autoSkip: true, callback: etiquetaY },
  };
}

async function loadVolume() {
  const d = await api(`/api/incidents?range=${volumeRange}`);
  volumeDados = d;
  warn("volume-warn", d);
  drawVolume();
}

function drawVolume() {
  const d = volumeDados;
  if (!d) return;
  const labels = d.buckets.map((b) => b.label);
  volumePartial = d.buckets.findIndex((b) => b.partial);
  const datasets = volumeDatasets(d);
  volumeMediumTotal = d.buckets.reduce((a, b) => a + b.medium, 0);
  if (!volumeChart) {
    volumeChart = new Chart($("volume-chart"), {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 300 },
        interaction: { mode: "index", intersect: false },
        scales: {
          x: { grid: { display: false }, ticks: { color: inkColor, autoSkip: true, maxRotation: 0 } },
          y: volumeEixoY(),
        },
        plugins: {
          // Por severidade, do mais grave para o menos (Crítico → Baixo).
          legend: { position: "top", align: "end",
                    onClick: (e, item, legend) => {
                      Chart.defaults.plugins.legend.onClick.call(legend, e, item, legend);
                      renderVolumeNote();
                    },
                    labels: { sort: (a, b) => b.datasetIndex - a.datasetIndex, color: inkColor,
                              boxWidth: Math.round(rem() * 0.7), boxHeight: Math.round(rem() * 0.7),
                              usePointStyle: true, pointStyle: "rectRounded" } },
          tooltip: {
            itemSort: (a, b) => b.datasetIndex - a.datasetIndex,
            callbacks: {
              title: (items) => {
                const b = volumeDados.buckets[items[0].dataIndex];
                return b.partial ? `${b.label} — período ainda a decorrer` : b.label;
              },
              // Severidade, número exato e parte do total, numa linha: em três
              // linhas por severidade a dica ficava mais alta do que o painel
              // e cortava o Baixo e o total (2026-10-02). O valor desenhado
              // leva um 0 para o fundo do eixo; este não.
              label: (it) => {
                const ds = it.dataset, k = it.dataIndex;
                return ` ${ds.label}: ${nf(ds.reais[k])} incidentes · ${pctTxt(ds.pcts[k])} do total`;
              },
              // O total conta as quatro, mesmo as escondidas na legenda.
              footer: (items) => `Total: ${nf(volumeChart.data.datasets[0].totais[items[0].dataIndex])} incidentes`,
            },
          },
        },
      },
    });
  } else {
    // Campo a campo, sem trocar os datasets: a escolha feita na legenda
    // (mostrar/esconder) sobrevive ao refresh e à troca de modo.
    volumeChart.data.labels = labels;
    volumeChart.data.datasets.forEach((ds, i) => {
      for (const k of ["data", "reais", "pcts", "totais", "pointRadius", "pointBackgroundColor", "segment"]) ds[k] = datasets[i][k];
    });
    volumeChart.options.scales.y = volumeEixoY();
    volumeChart.update();
  }
  renderVolumeNote();
}

let volumeMediumTotal = 0;
let volumePartial = -1;
function renderVolumeNote() {
  // Só aparece se alguém esconder o «Médio» na legenda.
  const mediumIdx = SEV_ORDER.indexOf("medium");
  const hidden = volumeChart && !volumeChart.isDatasetVisible(mediumIdx);
  $("volume-note").hidden = !hidden;
  $("volume-note").textContent = `Médio oculto · ${nf(volumeMediumTotal)} casos no período`;
}

document.querySelectorAll(".seg [data-range]").forEach((b) =>
  b.addEventListener("click", () => {
    volumeRange = b.dataset.range;
    document.querySelectorAll(".seg [data-range]").forEach((x) => x.classList.toggle("on", x === b));
    loadVolume().catch(fail);
  }));

// Volume ↔ % do total: os mesmos dados, desenhados de outra maneira — não se
// volta a pedir nada ao servidor.
document.querySelectorAll(".seg [data-modo]").forEach((b) => {
  b.classList.toggle("on", b.dataset.modo === volumeModo);
  b.addEventListener("click", () => {
    volumeModo = b.dataset.modo;
    try { localStorage.setItem("ac360:volume-modo", volumeModo); } catch { /* sem storage */ }
    document.querySelectorAll(".seg [data-modo]").forEach((x) => x.classList.toggle("on", x === b));
    drawVolume();
  });
});

/* ---------------- pausa ao passar o rato ---------------- */

// Num monitor de parede o ponteiro fica parado onde alguém o deixou. Se
// ficar em cima de um painel, «pausa ao passar o rato» era pausa para
// sempre — a tabela deixava de andar sem erro nenhum. A pausa dura por isso
// só enquanto o rato se mexe: 30 s parado e retoma. Uma linha aberta segura
// o painel 2 min e depois fecha-se sozinha.
const IDLE_MS = 30_000;
const PIN_MS = 120_000;
let lastMouseMove = 0;
document.addEventListener("mousemove", () => {
  lastMouseMove = Date.now();
  document.body.classList.remove("idle-cursor");
});
setInterval(() => {
  if (Date.now() - lastMouseMove > IDLE_MS) document.body.classList.add("idle-cursor");
}, 5_000);

function hoverPause(panel, onUnpin) {
  let hovering = false;
  let pinnedAt = 0;
  panel.addEventListener("mouseenter", () => (hovering = true));
  panel.addEventListener("mouseleave", () => (hovering = false));
  return {
    get paused() {
      if (pinnedAt && Date.now() - pinnedAt > PIN_MS) {
        pinnedAt = 0;
        if (onUnpin) onUnpin();
      }
      return (hovering && Date.now() - lastMouseMove < IDLE_MS) || pinnedAt > 0;
    },
    pin(v) { pinnedAt = v ? Date.now() : 0; },
  };
}

/* ---------------- scroll contínuo ---------------- */

// A lista desliza devagar, sem saltos, como um teleponto: uma linha a cada
// SECONDS_PER_ROW, portanto uma volta dura «linhas × 4 s» — a duração segue o
// número de linhas em vez de ser fixa. Para a volta não dar um salto, o bloco
// é duplicado logo a seguir ao original (outro <tbody>, ou outra grelha): no
// fim de uma volta o que se vê é igual ao início. Se a lista cabe, não mexe.
//
// É uma animação do browser (Web Animations API), e não um ciclo em JS a
// mudar o transform: a versão em JS recalculava estilos 60 vezes por segundo
// no main thread (301 «Recalculate Style» em 5 s, medido a 2026-09-30) e
// qualquer trabalho da página — um refresh, um gráfico — atrasava um frame e
// a lista engasgava. Assim a animação corre no compositor.
//
// Com dados novos, a animação é refeita a partir da mesma posição em px, não
// do início.
const SECONDS_PER_ROW = 4;

function scroller(view, block, pause) {
  const track = view.querySelector(".scroll-track");
  let clone = null;
  let anim = null;
  let loop = 0;  // altura de uma volta, em px
  let steps = [], step = 0;  // modo leve: o topo de cada linha, e a atual

  function position() {
    if (LEVE) return steps.length ? steps[step] : 0;
    if (!anim || !loop) return 0;
    const d = anim.effect.getTiming().duration;
    return ((anim.currentTime || 0) % d) / d * loop;
  }

  function measure() {
    const px = position();
    if (anim) { anim.cancel(); anim = null; }
    if (clone) { clone.remove(); clone = null; }
    view.classList.remove("scrolling");
    loop = 0;
    if (!view.clientHeight || block.getBoundingClientRect().height <= view.clientHeight + 1) return;
    view.classList.add("scrolling");
    clone = block.cloneNode(true);
    clone.removeAttribute("id");
    clone.setAttribute("aria-hidden", "true");
    block.after(clone);
    loop = clone.getBoundingClientRect().top - block.getBoundingClientRect().top;
    if (LEVE) {
      // Aos saltos: uma linha a cada SECONDS_PER_ROW, sem animação — uma
      // atualização de ecrã a cada 4 s em vez de 60 por segundo.
      const top0 = block.getBoundingClientRect().top;
      steps = [...new Set([...block.children].map((r) => Math.round(r.getBoundingClientRect().top - top0)))].sort((a, b) => a - b);
      step = Math.max(0, steps.findIndex((y) => y >= px % loop));
      track.style.transform = `translate3d(0, ${-steps[step]}px, 0)`;
      return;
    }
    const rows = block.querySelectorAll("tr, .tac").length || 1;
    const duration = rows * SECONDS_PER_ROW * 1000;
    anim = track.animate(
      [{ transform: "translate3d(0, 0, 0)" }, { transform: `translate3d(0, ${-loop}px, 0)` }],
      { duration, iterations: Infinity, easing: "linear" });
    anim.currentTime = (px % loop) / loop * duration;
    if (pause.paused) anim.pause();
  }

  // A pausa só se consulta 4 vezes por segundo, e só se mexe na animação
  // quando o estado muda — nada corre por frame.
  if (LEVE) {
    setInterval(() => {
      if (!steps.length || pause.paused || !view.offsetParent || document.hidden) return;
      step = (step + 1) % steps.length;
      track.style.transform = `translate3d(0, ${-steps[step]}px, 0)`;
    }, SECONDS_PER_ROW * 1000);
  }
  setInterval(() => {
    if (!anim) return;
    const hidden = !view.offsetParent;  // vista escondida: não gasta
    if ((pause.paused || hidden) && anim.playState === "running") anim.pause();
    else if (!pause.paused && !hidden && anim.playState === "paused") anim.play();
  }, 250);

  return {
    // Troca o conteúdo mantendo a posição.
    render(html) { block.innerHTML = html; measure(); },
    measure,
  };
}

/* ---------------- casos ---------------- */

let cases = [];
let openCase = null;
const casesPause = hoverPause($("cases-panel"), () => { openCase = null; renderCases(); });
const casesScroll = scroller($("cases-view"), $("cases-body"), casesPause);
setInterval(() => {
  const hide = !casesPause.paused;
  if ($("cases-paused").hidden !== hide) $("cases-paused").hidden = hide;
}, 500);

async function loadCases() {
  const d = await api("/api/cases");
  cases = d.cases;
  const openTotal = d.open_total ?? cases.length;
  $("cases-count").textContent = `· ${openTotal.toLocaleString("pt-PT")} abertos (${d.window_days ?? 3} dias)`
    + (openTotal > cases.length ? ` · os ${cases.length} mais graves` : "");
  renderCases();
}

function renderCases() {
  if (!cases.length) {
    casesScroll.render('<tr><td colspan="8" class="empty">Sem casos abertos.</td></tr>');
    return;
  }
  casesScroll.render(cases.map((c) => {
    const isOpen = openCase === c.id;
    let html = `<tr class="case${isOpen ? " open" : ""}" data-id="${esc(c.id)}">
      <td>${sevDot(c.severity)}</td>
      <td title="${esc(c.name)}"><span class="id">#${esc(c.id)}</span> ${esc(c.name)}</td>
      <td title="${esc(c.host)}">${dash(c.host)}</td>
      <td title="${esc(c.user)}">${dash(c.user)}</td>
      <td>${dash(c.detection)}</td>
      <td title="${esc(c.technique_id + " " + c.technique)}">${c.enriched ? tech(c.technique_id, c.technique) : '<span class="muted">a carregar…</span>'}</td>
      <td class="num">${age(c.created)}</td>
      <td>${esc(c.status)}</td></tr>`;
    if (isOpen) {
      const d = c.details;
      const item = (label, list) => `<dt>${label}</dt><dd>${list && list.length ? list.map(esc).join(", ") : "—"}</dd>`;
      html += `<tr class="detail"><td></td><td colspan="7"><dl>
        ${item("IPs", d.ips)}${item("Ficheiros", d.files)}${item("Destinos", d.destinations)}
        ${item("Issues", d.issue_ids)}
        ${d.url ? `<dt>XSIAM</dt><dd><a href="${esc(d.url)}" target="_blank" rel="noopener" style="color:var(--accent)">abrir o caso</a></dd>` : ""}
      </dl></td></tr>`;
    }
    return html;
  }).join(""));
}

// No <table> e não no <tbody>: a cópia que dá a volta ao scroll também
// tem de responder ao clique.
$("cases-table").addEventListener("click", (e) => {
  const tr = e.target.closest("tr.case");
  if (!tr) return;
  openCase = openCase === tr.dataset.id ? null : tr.dataset.id;
  casesPause.pin(openCase !== null);
  renderCases();
});

/* ---------------- radar ---------------- */

// Táticas MITRE: hoje (parcial) contra a média diária dos 7 dias completos
// anteriores (aggregate.radar). Ao lado, a tática com mais casos hoje e a
// comparação com ontem.
let radarChart = null;
let radarDados = null;
const dec1 = (x) => x.toLocaleString("pt-PT", { maximumFractionDigits: 1 });
const casos = (n) => `${nf(n)} caso${n === 1 ? "" : "s"}`;
const horaAcores = (ms) => new Date(ms).toLocaleTimeString("pt-PT", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });

// Dica de cada tática: hoje, média e variação, com os números reais. A
// média vem do total dos 7 dias (week/7), sem o arredondamento do avg7d.
function radarDica(k) {
  const a = radarDados.axes[k];
  const media = a.week / 7;
  const linhas = [`Hoje (parcial): ${casos(a.today)}`, `Média 7 dias: ${dec1(media)} casos/dia`];
  // Sem média não há variação que faça sentido (divisão por zero).
  if (media > 0) {
    const v = ((a.today - media) / media) * 100;
    linhas.push(`Variação vs. média: ${v > 0 ? "+" : ""}${dec1(v)}%`);
  } else if (a.today > 0) {
    linhas.push("Sem casos nos 7 dias anteriores");
  }
  return linhas;
}

async function loadRadar() {
  const d = await api("/api/radar");
  radarDados = d;
  const labels = d.axes.map((a) => a.name);
  const today = d.axes.map((a) => a.today);
  const avg = d.axes.map((a) => a.avg7d);
  // «Hoje» na cor de destaque do painel; o laranja de antes era o do «Alto»
  // e misturava o radar com as severidades. A média, neutra e tracejada.
  const cToday = v("--accent");
  const cAvg = v("--ink-3");
  if (!radarChart) {
    radarChart = new Chart($("radar-chart"), {
      type: "radar",
      data: { labels, datasets: [
        { label: "Média 7 dias", data: avg, borderColor: cAvg, backgroundColor: cAvg + "22",
          borderWidth: 1.5, borderDash: [5, 4], pointRadius: 0, pointHoverRadius: 0 },
        { label: "Hoje (parcial)", data: today, borderColor: cToday, backgroundColor: cToday + "40",
          borderWidth: 2.5, pointRadius: Math.round(rem() * 0.22), pointHoverRadius: Math.round(rem() * 0.35),
          pointBackgroundColor: cToday, pointBorderColor: v("--surface"), pointBorderWidth: 1 },
      ] },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 300 },
        // Passar perto de uma tática mostra-a toda, e não só o ponto da série.
        interaction: { mode: "index", intersect: false },
        // A área útil cresce: sem folga à volta, as etiquetas ainda cabem.
        layout: { padding: 0 },
        scales: { r: { beginAtZero: true, angleLines: { color: gridColor }, grid: { color: gridColor },
                       pointLabels: { color: inkColor, padding: Math.round(rem() * 0.3),
                                      font: { size: Math.round(rem() * 0.75) } },
                       ticks: { display: false, precision: 0 } } },
        plugins: {
          // A legenda está no cabeçalho do painel (index.html, .radar-legenda).
          legend: { display: false },
          tooltip: {
            // Uma dica por tática (a da série «Hoje»), com as duas séries lá dentro.
            filter: (it) => it.datasetIndex === 1,
            callbacks: {
              title: (items) => items[0].label,
              label: (it) => radarDica(it.dataIndex),
              footer: () => radarDados.metrics_at ? `Hoje até às ${horaAcores(radarDados.metrics_at)} · ainda a decorrer` : "",
            },
          },
        },
      },
    });
  } else {
    radarChart.data.labels = labels;
    radarChart.data.datasets[0].data = avg;
    radarChart.data.datasets[1].data = today;
    radarChart.update();
  }
  radarChart.data.datasets[0].label = d.incomplete ? "Média 7 dias (a carregar)" : "Média 7 dias";
  $("radar-leg-media").textContent = radarChart.data.datasets[0].label;
  $("radar-note").innerHTML = radarInsight(d);
}

// O cartão ao lado: a tática com mais casos hoje (a do servidor, que já a
// escolhe dos dados) e a comparação com ontem.
function radarInsight(d) {
  const rotulo = '<div class="ins-rotulo">Tática mais ativa hoje</div>';
  if (d.incomplete) return `${rotulo}<div class="ins-ontem">A carregar…</div>`;
  const h = d.highlight;
  if (!h) return `${rotulo}<div class="ins-nome muted">Sem casos com tática MITRE hoje</div>`;
  // Empate: o servidor fica com a primeira pela ordem das táticas; diz-se que
  // há outras com o mesmo número, para não parecer que aquela se destaca.
  const empate = d.axes.filter((a) => a.today === h.today && a.id !== h.id).map((a) => a.name);
  // ((hoje − ontem) / ontem) × 100, feito no servidor (change_pct). O sinal
  // está na seta: «▼ 33%», e não «▼ -33%». Com ontem = 0 não há percentagem.
  let tend;
  if (h.yesterday === 0) tend = '<div class="ins-trend up">Novo hoje</div><div class="ins-ontem">Sem casos ontem</div>';
  else {
    const c = h.change_pct;
    const [cls, seta] = c > 0 ? ["up", "▲"] : c < 0 ? ["down", "▼"] : ["igual", "→"];
    tend = `<div class="ins-trend ${cls}">${seta} ${nf(Math.abs(c))}% vs. ontem</div>`
         + `<div class="ins-ontem">Ontem: ${casos(h.yesterday)}</div>`;
  }
  const ate = d.metrics_at ? ` até às ${horaAcores(d.metrics_at)}` : "";
  return rotulo
    + `<div class="ins-nome">${esc(h.name)}</div>`
    + (empate.length ? `<div class="ins-empate">empatada com ${esc(empate.join(", "))}</div>` : "")
    + `<div class="ins-valor">${casos(h.today)}</div>`
    + tend
    + `<div class="ins-parcial">Hoje · parcial${ate}</div>`;
}

/* ---------------- briefing ---------------- */

async function loadBriefing() {
  const d = await api("/api/briefing");
  if (!d.texto) return; // ainda não gerado: fica o «A preparar…»
  $("brief-lines").innerHTML = d.texto.split("\n").map((l) => `<li>${esc(l)}</li>`).join("");
  const src = d.fonte === "regras" ? "por regras" : `por ${esc(d.fonte)}`;
  // A hora vem do próprio gerado_em (hora dos Açores): 09:00, 10:00…
  $("brief-meta").innerHTML = `gerado às ${esc(d.gerado_em.slice(11, 16))} · ${src}`
    + (d.nota ? ` <span class="warn" title="${esc(d.nota)}">${d.fonte === "regras" ? "modelo falhou" : "desatualizado"}</span>` : "");
  // O motivo por extenso, por baixo: na TV ninguém passa o rato por cima.
  $("brief-nota").hidden = !d.nota;
  $("brief-nota").textContent = d.nota ? `⚠ ${d.nota}` : "";
}

/* ---------------- ciclo ---------------- */

// Um só aviso por painel, e o de histórico a carregar tem prioridade: explica
// porque é que as barras antigas estão vazias.
function warn(id, d) {
  const el = $(id);
  el.textContent = d.incomplete ? "a carregar…" : "dados truncados";
  el.hidden = !(d.incomplete || d.truncated);
}

function fail(err) { if (!(err instanceof NotSynced)) console.error(err); }

async function refreshAll() {
  const results = await Promise.allSettled([
    loadSummary(), loadVolume(), loadCases(), loadRadar(), loadBriefing(),
  ]);
  // Se nenhum pedido chegou ao servidor, é o servidor que está em baixo — não
  // o XSIAM — e o ecrã tem de o dizer em vez de mostrar os números antigos
  // com a bolinha verde.
  serverReachable = results.some((r) => r.status === "fulfilled" || r.reason instanceof NotSynced);
  results.filter((r) => r.status === "rejected").forEach((r) => fail(r.reason));
  renderApiStatus();
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    scaleCharts();
    casesScroll.measure();
  }, 200);
});

async function boot() {
  // Primeiro o que ficou guardado (instantâneo), depois o servidor.
  fromCache = true;
  await refreshAll();
  fromCache = false;
  await refreshAll();
  setInterval(refreshAll, REFRESH_MS);
}

// O mapa corre no mesmo PC, na porta 8001: o mesmo host desta página.
// Ao sair, a página escurece primeiro (ver style.css, «Passagem suave»);
// com Ctrl/Shift ou no modo leve, sai logo.
const MAPA_URL = `${location.protocol}//${location.hostname}:8001/`;
function irParaMapa() {
  if (LEVE) { location.href = MAPA_URL; return; }
  document.documentElement.classList.add("saindo");
  setTimeout(() => { location.href = MAPA_URL; }, 350);
}
try {
  const b = $("btn-mapa");
  b.href = MAPA_URL;
  b.addEventListener("click", (e) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    irParaMapa();
  });
} catch { /* sem botão */ }

// Alternância na TV (pedido do Miguel, 2026-10-02): 5 min sem ninguém mexer
// no painel e passa para o mapa; o mapa volta ao fim de 2 min (mapa/). Mexer
// (rato, teclado, toque) recomeça a contagem. ?rodar=0 desliga neste browser
// (fica guardado), ?rodar=1 volta a ligar.
const PAINEL_MS = 5 * 60_000;
const RODAR = (() => {
  const q = new URLSearchParams(location.search);
  try {
    if (q.has("rodar")) localStorage.setItem("ac360:rodar", q.get("rodar") === "0" ? "0" : "1");
    return localStorage.getItem("ac360:rodar") !== "0";
  } catch { return q.get("rodar") !== "0"; }
})();
let ultimaAtividade = Date.now();
const ATIVIDADE = ["mousemove", "mousedown", "keydown", "wheel", "touchstart"];
const ouvirAtividade = (w) => ATIVIDADE.forEach((ev) =>
  w.addEventListener(ev, () => { ultimaAtividade = Date.now(); }, { passive: true }));
ouvirAtividade(window);
// O Command Center é um iframe: os eventos de lá não chegam a esta janela, e
// mexer o rato em cima dele não contava (visto no teste, 2026-10-02). É do
// mesmo site, por isso ouve-se lá dentro também, a cada vez que carrega.
document.querySelectorAll(".p-cc iframe").forEach((f) => {
  const ligar = () => { try { ouvirAtividade(f.contentWindow); } catch { /* outro site */ } };
  f.addEventListener("load", ligar);
  if (f.contentDocument?.readyState === "complete") ligar();
});
if (RODAR) {
  setInterval(() => {
    if (Date.now() - ultimaAtividade < PAINEL_MS) return;
    ultimaAtividade = Date.now();   // não tenta outra vez a cada 5 s se falhar
    // Só sai se o mapa responder: com o serviço do mapa em baixo, a TV ia
    // parar a uma página de erro e lá ficava. no-cors: basta saber que
    // respondeu (outra porta, outro site).
    fetch(`${MAPA_URL}api/estado`, { mode: "no-cors", cache: "no-store" })
      .then(irParaMapa)
      .catch(() => console.warn("Mapa de ataques sem resposta: fica o painel."));
  }, 5000);
}
// Voltar com o «Retroceder» do browser pode trazer a página da cache ainda
// escurecida: tira-se a classe.
window.addEventListener("pageshow", () => document.documentElement.classList.remove("saindo"));
scaleCharts();
tick();
setInterval(tick, 1000);
boot();
