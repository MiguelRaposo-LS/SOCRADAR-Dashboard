/* Mapa de ataques — Azores Cyber 360.

   Adaptado de zethw0w/ddos-attack-map (MIT): fica a cena 3D (globo, brilho,
   estrelas, arcos e pulsos). Saiu a simulação: o original, sem ligação ao
   servidor, inventava ataques aleatórios e só os marcava com «SIMULATED» —
   num ecrã do SOC isso passa por real. Aqui, sem ligação, diz-se que não há.

   Os ataques vêm do servidor (backend/feed.py): pedidos bloqueados ou
   desafiados pela Cloudflare à frente dos sites do GRA, lidos do XSIAM com
   ~5 min de atraso e tocados ao ritmo a que aconteceram. */
import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

interface Local {
  ip?: string;
  latitude: number;
  longitude: number;
  country?: string;
  city?: string;
}

type Sev = "low" | "medium" | "high" | "critical";

interface Ataque {
  id: string;
  timestamp: string;
  t: number;
  source: Local;
  target: Local;
  attack_type: string;
  severity: Sev;
  action?: string;
  engines?: string[];
  count: number;
}

interface Resumo {
  de: number | null;
  ate: number | null;
  minutos: number;
  total: number;
  ips: number;
  n_paises: number;
  severidade: Record<Sev, number>;
  paises: [string, number][];
  hosts: [string, number][];
}

interface EstadoServidor { ok: boolean; erro: string | null; ultimo_ok: number | null }

interface Mensagem {
  type: "attack" | "history" | "stats" | "estado";
  data?: unknown;
}

const WS_URL = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws/attacks`;
// O painel (Azores Cyber 360) corre no mesmo PC, na porta 8360.
const PAINEL_URL = `${location.protocol}//${location.hostname}:8360/`;
const RECONNECT_DELAY = 5000;
const MAX_LOG = 40;
const LIVRE_MS = 30_000;   // sem mexer este tempo, o globo volta à animação
const TZ = "Atlantic/Azores";
// Locais, e não do unpkg: a TV não tem de chegar à Internet para ver o globo.
const TEXTURA_TERRA = "texturas/terra.jpg";
const TEXTURA_NOITE = "texturas/noite.jpg";   // luzes das cidades (NASA Black Marble)

// As mesmas cores de severidade do Azores Cyber 360.
const SEV: Record<Sev, { hex: number; css: string; label: string }> = {
  critical: { hex: 0xd92b4a, css: "#d92b4a", label: "CRÍTICO" },
  high:     { hex: 0xf0862a, css: "#f0862a", label: "ALTO" },
  medium:   { hex: 0xf7dc55, css: "#f7dc55", label: "MÉDIO" },
  low:      { hex: 0x3fb970, css: "#3fb970", label: "BAIXO" },
};
const SEV_ORDEM: Sev[] = ["critical", "high", "medium", "low"];
const sevDe = (s: string) => SEV[(s as Sev)] ?? SEV.medium;

// MITRE só onde a correspondência é honesta: um DDoS de camada 7 e um
// bloqueio do WAF a uma exploração. Bots desafiados e bloqueios por país ou
// ASN não têm técnica certa — ficam sem.
function mitreDe(a: Ataque): { id: string; nome: string } | null {
  if (a.severity === "critical") return { id: "T1499.002", nome: "Service Exhaustion Flood" };
  if (a.severity === "high") return { id: "T1190", nome: "Exploit Public-Facing Application" };
  return null;
}

const ACAO: Record<string, string> = {
  block: "bloqueado", managedchallenge: "desafiado", challenge: "desafiado", jschallenge: "desafiado",
};

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

// O ponto da Terra com o Sol a pique, agora: latitude = declinação do Sol,
// longitude = onde é meio-dia solar. Aproximação de ~1° (medido contra
// solstício e equinócio de 2026) — chega para a
// linha entre o dia e a noite num globo deste tamanho.
export function pontoSubsolar(ms: number): { lat: number; lng: number } {
  const d = new Date(ms);
  const inicio = Date.UTC(d.getUTCFullYear(), 0, 0);
  const dia = (ms - inicio) / 86_400_000;                       // dia do ano, com fração
  const decl = -23.44 * Math.cos((2 * Math.PI / 365) * (dia + 10));
  const b = (2 * Math.PI * (dia - 81)) / 364;
  const eqTempoMin = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  const horasUTC = d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600;
  let lng = -15 * (horasUTC - 12 + eqTempoMin / 60);
  lng = ((lng + 540) % 360) - 180;
  return { lat: decl, lng };
}

function makeArc(sp: THREE.Vector3, ep: THREE.Vector3): THREE.Vector3[] {
  const mid = new THREE.Vector3().addVectors(sp, ep).multiplyScalar(0.5);
  const d = sp.distanceTo(ep);
  mid.normalize().multiplyScalar(2 + d * 0.4);
  return new THREE.QuadraticBezierCurve3(sp, mid, ep).getPoints(48);
}

const hora = (ms: number) => new Date(ms).toLocaleTimeString("pt-PT", { timeZone: TZ, hour: "2-digit", minute: "2-digit", second: "2-digit" });
const nf = (n: number) => n.toLocaleString("pt-PT");
let nomesPais: Intl.DisplayNames | null = null;
try { nomesPais = new Intl.DisplayNames(["pt-PT"], { type: "region" }); } catch { /* browser antigo */ }
const pais = (cc: string) => { try { return (cc && nomesPais?.of(cc)) || cc || "?"; } catch { return cc || "?"; } };

// Painéis desenhados para 1920×1080; numa TV 4K crescem na mesma proporção.
function useEscala(): number {
  const calc = () => Math.max(0.6, Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
  const [k, setK] = useState(calc);
  useEffect(() => {
    const on = () => setK(calc());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return k;
}

// O painel está noutra porta (outro site, para o browser): a transição nativa
// entre páginas não serve. Escurece-se esta antes de sair (index.css) e o
// painel aparece do escuro. Com Ctrl/Shift sai logo.
function irParaPainel() {
  document.documentElement.classList.add("saindo");
  setTimeout(() => { location.href = PAINEL_URL; }, 350);
}
function voltar(e: React.MouseEvent<HTMLAnchorElement>) {
  if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
  e.preventDefault();
  irParaPainel();
}

// Alternância na TV (pedido do Miguel, 2026-10-02): o painel passa para o mapa
// ao fim de 5 min sem ninguém mexer, e o mapa volta ao painel ao fim de 2.
// Mexer (rato, teclado, toque, rodar o globo) recomeça a contagem. ?rodar=0
// desliga neste browser (fica guardado), ?rodar=1 volta a ligar.
const MAPA_MS = 2 * 60_000;
const RODAR = (() => {
  const q = new URLSearchParams(location.search);
  try {
    if (q.has("rodar")) localStorage.setItem("mapa:rodar", q.get("rodar") === "0" ? "0" : "1");
    return localStorage.getItem("mapa:rodar") !== "0";
  } catch { return q.get("rodar") !== "0"; }
})();
// «Retroceder» do browser pode trazer a página da cache ainda escurecida.
window.addEventListener("pageshow", () => document.documentElement.classList.remove("saindo"));

export default function DDoSMap() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<{ scene: THREE.Scene } | null>(null);
  const arcsRef = useRef<THREE.Object3D[]>([]);
  const logRef = useRef<Ataque[]>([]);
  const sujoRef = useRef(false);
  const interacaoRef = useRef(0);   // última vez que alguém mexeu no globo

  const [log, setLog] = useState<Ataque[]>([]);
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [ligado, setLigado] = useState(false);
  const [servidor, setServidor] = useState<EstadoServidor | null>(null);
  const [agora, setAgora] = useState(Date.now());
  const k = useEscala();

  const desenhar = useCallback((a: Ataque) => {
    const s = sceneRef.current;
    if (!s) return;
    const { scene } = s;
    const cor = sevDe(a.severity);
    const sp = latLngToVec3(a.source.latitude, a.source.longitude, 2.01);
    const tp = latLngToVec3(a.target.latitude, a.target.longitude, 2.01);
    const arc = new THREE.Line(new THREE.BufferGeometry().setFromPoints(makeArc(sp, tp)),
      new THREE.LineBasicMaterial({ color: cor.hex, transparent: true, opacity: 0.9 }));
    arc.userData = { birth: Date.now(), life: 2500, type: "arc" };
    scene.add(arc);
    arcsRef.current.push(arc);

    // Pequeno: com ~13 ataques por segundo, os pulsos do original (até 5×
    // 0,04) faziam manchas que tapavam países inteiros.
    const pulse = new THREE.Mesh(new THREE.RingGeometry(0.008, 0.016, 16),
      new THREE.MeshBasicMaterial({ color: cor.hex, transparent: true, opacity: 0, side: THREE.DoubleSide }));
    pulse.position.copy(sp);
    pulse.lookAt(new THREE.Vector3(0, 0, 0));
    pulse.userData = { birth: Date.now(), life: 1200, type: "pulse" };
    scene.add(pulse);
    arcsRef.current.push(pulse);
  }, []);

  const juntar = useCallback((a: Ataque, comArco: boolean) => {
    if (comArco) desenhar(a);
    logRef.current.unshift(a);
    if (logRef.current.length > MAX_LOG) logRef.current.length = MAX_LOG;
    sujoRef.current = true;
  }, [desenhar]);

  useEffect(() => {
    if (!RODAR) return;
    let ultima = Date.now();
    const mexeu = () => { ultima = Date.now(); };
    const evs = ["mousemove", "mousedown", "keydown", "wheel", "touchstart"] as const;
    evs.forEach((ev) => window.addEventListener(ev, mexeu, { passive: true }));
    const id = setInterval(() => {
      const parado = Date.now() - Math.max(ultima, interacaoRef.current);
      if (parado < MAPA_MS) return;
      ultima = Date.now();   // não tenta outra vez a cada 5 s se falhar
      // Só sai se o painel responder: com o painel em baixo, a TV ia parar a
      // uma página de erro. no-cors: basta saber que respondeu.
      fetch(`${PAINEL_URL}api/ping`, { mode: "no-cors", cache: "no-store" })
        .then(irParaPainel)
        .catch(() => console.warn("Painel sem resposta: fica o mapa."));
    }, 5000);
    return () => { clearInterval(id); evs.forEach((ev) => window.removeEventListener(ev, mexeu)); };
  }, []);

  // ~13 ataques por segundo: o React só redesenha a lista 2×/s, e não a
  // cada ataque (era o que o original fazia).
  useEffect(() => {
    const id = setInterval(() => {
      setAgora(Date.now());
      if (!sujoRef.current) return;
      sujoRef.current = false;
      setLog([...logRef.current]);
    }, 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let fechado = false;
    function connect() {
      ws = new WebSocket(WS_URL);
      ws.onopen = () => setLigado(true);
      ws.onmessage = (e: MessageEvent) => {
        let msg: Mensagem;
        try { msg = JSON.parse(e.data as string) as Mensagem; } catch { return; }
        if (msg.type === "attack") juntar(msg.data as Ataque, true);
        else if (msg.type === "history" && Array.isArray(msg.data)) {
          // O histórico enche a lista, mas só os últimos 20 desenham arco:
          // 300 arcos de uma vez tapavam o globo.
          const h = msg.data as Ataque[];
          h.forEach((a, i) => juntar(a, i >= h.length - 20));
        } else if (msg.type === "stats") setResumo(msg.data as Resumo);
        else if (msg.type === "estado") setServidor(msg.data as EstadoServidor);
      };
      ws.onclose = () => { setLigado(false); if (!fechado) timer = setTimeout(connect, RECONNECT_DELAY); };
      ws.onerror = () => ws?.close();
    }
    connect();
    return () => { fechado = true; ws?.close(); if (timer) clearTimeout(timer); };
  }, [juntar]);

  useEffect(() => {
    const c = mountRef.current;
    if (!c) return;
    const w = c.clientWidth, h = c.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    c.appendChild(renderer.domElement);

    // Dia e noite: um shader mistura a textura do dia (iluminada pelo Sol) e
    // a das luzes das cidades, pela posição real do Sol (pontoSubsolar), com
    // uma transição suave no crepúsculo. Pedido do Miguel (2026-10-01).
    const sol = new THREE.Vector3();
    const atualizarSol = () => {
      const p = pontoSubsolar(Date.now());
      sol.copy(latLngToVec3(p.lat, p.lng, 1)).normalize();
    };
    atualizarSol();
    const globeMat = new THREE.ShaderMaterial({
      uniforms: {
        dia: { value: null }, noite: { value: null }, sol: { value: sol },
        temDia: { value: 0 }, temNoite: { value: 0 },
      },
      vertexShader: `varying vec2 vUv; varying vec3 vN;
        void main() { vUv = uv; vN = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform sampler2D dia; uniform sampler2D noite; uniform vec3 sol;
        uniform float temDia; uniform float temNoite;
        varying vec2 vUv; varying vec3 vN;
        void main() {
          float c = dot(normalize(vN), sol);
          // Contraste forte (a primeira versão quase não se notava, 2026-10-01):
          // noite escura e azulada, luzes das cidades acesas, passagem estreita.
          // (Uma faixa dourada de crepúsculo a marcar a linha saiu: o Miguel não
          // gostou.)
          float luz = smoothstep(-0.05, 0.08, c);          // 0 noite, 1 dia
          vec3 d = temDia > 0.5 ? texture2D(dia, vUv).rgb : vec3(0.10, 0.23, 0.36);
          vec3 n = temNoite > 0.5 ? texture2D(noite, vUv).rgb : vec3(0.0);
          vec3 corDia = d * (0.35 + 0.85 * pow(max(c, 0.0), 0.6));
          vec3 luzes = n * n * vec3(1.9, 1.5, 0.9);            // ao quadrado: só as cidades, sem o véu
          vec3 corNoite = d * vec3(0.03, 0.05, 0.10) + luzes;
          gl_FragColor = vec4(mix(corNoite, corDia, luz), 1.0);
        }`,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(2, 64, 64), globeMat));
    const carregador = new THREE.TextureLoader();
    carregador.load(TEXTURA_TERRA, (tex) => { globeMat.uniforms.dia.value = tex; globeMat.uniforms.temDia.value = 1; });
    carregador.load(TEXTURA_NOITE, (tex) => { globeMat.uniforms.noite.value = tex; globeMat.uniforms.temNoite.value = 1; });
    // O Sol anda 0,25° por minuto: atualizar a cada 30 s chega.
    const solTimer = setInterval(atualizarSol, 30_000);

    scene.add(new THREE.Mesh(new THREE.SphereGeometry(2.005, 48, 24),
      new THREE.MeshBasicMaterial({ color: 0x0d4a6b, wireframe: true, transparent: true, opacity: 0.06 })));
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(2.15, 64, 64), new THREE.ShaderMaterial({
      vertexShader: `varying vec3 vNormal;
        void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 vNormal;
        void main() { float i = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0); gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * i; }`,
      blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true,
    })));

    // Os Açores, destino de todos os arcos: um ponto fixo que pulsa.
    const acores = latLngToVec3(37.7412, -25.6756, 2.012);
    const alvo = new THREE.Mesh(new THREE.CircleGeometry(0.03, 24),
      new THREE.MeshBasicMaterial({ color: 0x4fc3f7, transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
    alvo.position.copy(acores);
    alvo.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(alvo);
    const anel = new THREE.Mesh(new THREE.RingGeometry(0.04, 0.05, 32),
      new THREE.MeshBasicMaterial({ color: 0x4fc3f7, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
    anel.position.copy(acores);
    anel.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(anel);

    const sv: number[] = [];
    for (let i = 0; i < 3000; i++) {
      const r = 15 + Math.random() * 40, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      sv.push(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute("position", new THREE.Float32BufferAttribute(sv, 3));
    scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ size: 0.08, transparent: true, opacity: 0.6, color: 0xd8e2f0 })));

    scene.add(new THREE.AmbientLight(0x334466, 0.5));
    const dl = new THREE.DirectionalLight(0x88bbff, 0.9);
    dl.position.set(5, 3, 5);
    scene.add(dl);

    sceneRef.current = { scene };

    // Animação: a câmara fica nos Açores (theta 1,12 e phi 0,95 apontam para
    // 37,7° N 25,7° O) e balança devagar ±0,6 rad. O original dava voltas
    // completas, e o destino dos arcos passava metade do tempo atrás do globo.
    // Modo livre: arrastar roda, a roda do rato aproxima. Ao fim de LIVRE_MS
    // sem mexer, volta sozinha à animação (pedido do Miguel, 2026-10-01).
    let dragging = false, prev = { x: 0, y: 0 };
    const CENTRO = { theta: 1.122, phi: 0.95 }, DIST = 5.5;
    const sph = { ...CENTRO }, alvoSph = { ...CENTRO };
    let dist = DIST, alvoDist = DIST, voltando = false;
    const update = () => {
      sph.phi = Math.max(0.3, Math.min(Math.PI - 0.3, sph.phi));
      camera.position.set(dist * Math.sin(sph.phi) * Math.sin(sph.theta), dist * Math.cos(sph.phi), dist * Math.sin(sph.phi) * Math.cos(sph.theta));
      camera.lookAt(0, 0, 0);
    };
    update();
    const mexeu = () => { interacaoRef.current = Date.now(); voltando = false; };
    const ponto = (e: MouseEvent | TouchEvent) => ("touches" in e ? e.touches[0] : e) as { clientX: number; clientY: number };
    const down = (e: MouseEvent | TouchEvent) => {
      const p = ponto(e);
      if (!p) return;
      dragging = true; prev = { x: p.clientX, y: p.clientY }; mexeu();
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      const p = ponto(e);
      if (!p) return;
      alvoSph.theta -= (p.clientX - prev.x) * 0.005;
      alvoSph.phi = Math.max(0.3, Math.min(Math.PI - 0.3, alvoSph.phi + (p.clientY - prev.y) * 0.005));
      prev = { x: p.clientX, y: p.clientY };
      mexeu();
      if ("touches" in e) e.preventDefault();
    };
    const up = () => { if (dragging) mexeu(); dragging = false; };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      alvoDist = Math.max(3, Math.min(12, alvoDist + e.deltaY * 0.004));
      mexeu();
    };
    const el = renderer.domElement;
    el.style.cursor = "grab";
    el.addEventListener("mousedown", down);
    el.addEventListener("mousemove", move);
    el.addEventListener("wheel", wheel, { passive: false });
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);

    let aId = 0;
    const animate = () => {
      aId = requestAnimationFrame(animate);
      const now = Date.now();
      const livre = dragging || now - interacaoRef.current < LIVRE_MS;
      if (!livre) {
        if (!voltando) {
          // Volta pelo caminho mais curto: depois de várias voltas ao globo,
          // ir direto ao ângulo de origem desenrolava-as todas.
          const tau = 2 * Math.PI;
          sph.theta = CENTRO.theta + ((((sph.theta - CENTRO.theta) % tau) + tau + Math.PI) % tau) - Math.PI;
          voltando = true;
        }
        alvoSph.theta = CENTRO.theta + 0.6 * Math.sin(now / 40_000);
        alvoSph.phi = CENTRO.phi;
        alvoDist = DIST;
      }
      // Ao arrastar, segue a mão; ao voltar, devagar (~3 s), para se ver a volta.
      const k = livre ? 0.08 : 0.02;
      sph.theta += (alvoSph.theta - sph.theta) * k;
      sph.phi += (alvoSph.phi - sph.phi) * k;
      dist += (alvoDist - dist) * k;
      update();
      const t = (now % 2000) / 2000;
      anel.scale.set(1 + t * 2.5, 1 + t * 2.5, 1);
      (anel.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - t);

      const rem: THREE.Object3D[] = [];
      for (const m of arcsRef.current) {
        const age = now - (m.userData.birth as number), life = m.userData.life as number;
        if (age >= life) { rem.push(m); continue; }
        const f = age / life;
        if (m.userData.type === "pulse") {
          m.scale.set(1 + f * 2, 1 + f * 2, 1);
          ((m as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 1 - f;
        } else {
          ((m as THREE.Line).material as THREE.LineBasicMaterial).opacity = Math.max(0, 0.9 * (1 - f * f));
        }
      }
      for (const m of rem) {
        scene.remove(m);
        (m as THREE.Mesh).geometry?.dispose();
        ((m as THREE.Mesh).material as THREE.Material)?.dispose();
      }
      if (rem.length) arcsRef.current = arcsRef.current.filter((m) => !rem.includes(m));
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = c.clientWidth / c.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(c.clientWidth, c.clientHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(aId);
      clearInterval(solTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      renderer.dispose();
      if (c.contains(renderer.domElement)) c.removeChild(renderer.domElement);
    };
  }, []);

  // Estado: sem ligação ao servidor, XSIAM com erro, ou dados velhos.
  const velho = servidor?.ultimo_ok ? agora - servidor.ultimo_ok > 5 * 60_000 : true;
  const estado = !ligado ? { cor: "#d92b4a", txt: "Sem ligação ao servidor do mapa" }
    : servidor?.erro ? { cor: "#d92b4a", txt: "XSIAM com erro — mapa parado" }
    : !servidor?.ultimo_ok ? { cor: "#f0862a", txt: "A ler o primeiro minuto…" }
    : velho ? { cor: "#f0862a", txt: `Sem dados novos desde ${hora(servidor.ultimo_ok)}` }
    : { cor: "#3fb970", txt: "Em direto · atraso ~5 min" };

  const sevTotal = Math.max(1, SEV_ORDEM.reduce((s, x) => s + (resumo?.severidade[x] ?? 0), 0));
  const maxPais = resumo?.paises[0]?.[1] ?? 1;
  const maxHost = resumo?.hosts[0]?.[1] ?? 1;
  const janela = resumo?.minutos ? (resumo.minutos >= 60 ? "última hora" : `últimos ${resumo.minutos} min`) : "—";
  const z = { zoom: k } as React.CSSProperties;

  return (
    <div style={st.container}>
      <div style={st.bgGradient} />
      <div ref={mountRef} style={st.globe} />

      <div style={{ ...st.topBar, ...z }}>
        {/* Na TV (kiosk) não há barra do browser nem separadores: sem este
            botão, quem abria o mapa não tinha como voltar ao painel. */}
        <a href={PAINEL_URL} style={st.voltar} onClick={voltar}>← Painel principal</a>
        <div style={st.logo}><span style={st.logoDot} />MAPA DE ATAQUES · Azores Cyber 360</div>
        <div style={st.statusBadge} title={servidor?.erro ?? ""}>
          <span style={{ ...st.statusDot, background: estado.cor }} />{estado.txt}
        </div>
        {agora - interacaoRef.current < LIVRE_MS && (
          <div style={st.livre}>Modo livre · volta à animação em {Math.ceil((LIVRE_MS - (agora - interacaoRef.current)) / 1000)} s</div>
        )}
        <div style={st.relogio}>{hora(agora)} <span style={st.tz}>Açores</span></div>
      </div>

      <div style={{ ...st.leftPanel, ...z }}>
        <div style={st.sectionTitle}>Resumo · {janela}</div>
        <div style={st.statGrid}>
          <Cartao label="Pedidos travados" value={resumo ? nf(resumo.total) : "—"} />
          <Cartao label="IPs de origem" value={resumo ? nf(resumo.ips) : "—"} />
          <Cartao label="Países" value={resumo ? nf(resumo.n_paises) : "—"} />
          <Cartao label="Origem principal" value={resumo?.paises[0] ? pais(resumo.paises[0][0]) : "—"} />
        </div>

        <div style={st.sectionTitle}>Severidade</div>
        <div style={st.bars}>
          {SEV_ORDEM.map((s) => {
            const n = resumo?.severidade[s] ?? 0;
            return (
              <div key={s} style={st.row}>
                <span style={{ ...st.sevLabel, color: SEV[s].css }}>{SEV[s].label}</span>
                <div style={st.barBg}><div style={{ ...st.barFill, width: `${(n / sevTotal) * 100}%`, background: SEV[s].css }} /></div>
                <span style={st.count}>{nf(n)}</span>
              </div>
            );
          })}
        </div>
        <div style={st.legenda}>Crítico: DDoS · Alto: WAF (exploração) · Médio: regras próprias, país, ASN · Baixo: desafios a bots</div>

        <div style={st.sectionTitle}>Países de origem</div>
        <div style={st.bars}>
          {(resumo?.paises ?? []).map(([cc, n]) => (
            <div key={cc} style={st.row}>
              <span style={st.nome} title={cc}>{pais(cc)}</span>
              <div style={st.barBg}><div style={{ ...st.barFill, width: `${(n / maxPais) * 100}%`, background: "#4fc3f7" }} /></div>
              <span style={st.count}>{nf(n)}</span>
            </div>
          ))}
        </div>

        <div style={st.sectionTitle}>Sites atacados</div>
        <div style={st.bars}>
          {(resumo?.hosts ?? []).map(([h, n]) => (
            <div key={h} style={st.row}>
              <span style={{ ...st.nome, width: "150px" }} title={h}>{h}</span>
              <div style={st.barBg}><div style={{ ...st.barFill, width: `${(n / maxHost) * 100}%`, background: "#5b8def" }} /></div>
              <span style={st.count}>{nf(n)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...st.rightPanel, ...z }}>
        <div style={st.sectionTitle}>Últimos pedidos travados</div>
        <div style={st.attackLog}>
          {log.length === 0 && <div style={st.vazio}>{ligado ? "À espera do primeiro minuto do XSIAM…" : "Sem ligação ao servidor."}</div>}
          {log.map((a) => {
            const c = sevDe(a.severity), m = mitreDe(a);
            return (
              <div key={a.id} style={{ ...st.attackCard, borderLeftColor: c.css }}>
                <div style={st.attackHeader}>
                  <span style={{ ...st.sevBadge, background: c.css + "22", color: c.css }}>{c.label}</span>
                  <span style={st.attackType} title={a.attack_type}>{a.attack_type}</span>
                  <span style={st.attackTime}>{hora(a.t)}</span>
                </div>
                <div style={st.attackDetails}>
                  <span style={st.trunca} title={`${a.source.ip} · ${a.source.city}, ${pais(a.source.country ?? "")}`}>
                    {a.source.ip} · {pais(a.source.country ?? "")} → {a.target.city}
                  </span>
                  <span style={st.meta}>
                    {a.count > 1 && <span style={st.rep}>×{a.count}</span>}
                    <span style={st.acao}>{ACAO[(a.action ?? "").toLowerCase()] ?? a.action}</span>
                    {m && <span style={st.mitreBadge} title={m.nome}>{m.id}</span>}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ ...st.bottomBar, ...z }}>
        <span>Fonte: Cloudflare (cloudflare_waf_raw) via Cortex XSIAM · pedidos bloqueados e desafiados à frente dos sites do GRA · destino nos Açores</span>
        <span>Origem: cidade e coordenadas da própria Cloudflare · dia e noite pela posição real do Sol · sem dados simulados</span>
      </div>
    </div>
  );
}

function Cartao({ label, value }: { label: string; value: string }) {
  return (
    <div style={st.statCard}>
      <div style={st.statLabel}>{label}</div>
      <div style={st.statValue}>{value}</div>
    </div>
  );
}

const glass: React.CSSProperties = {
  background: "rgba(10, 15, 30, 0.75)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
};

const st: Record<string, React.CSSProperties> = {
  container: { position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#020810", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: "#e0e6ed" },
  bgGradient: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(10,40,80,0.4) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 },
  globe: { position: "absolute", inset: 0, zIndex: 1 },

  topBar: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", gap: "16px", padding: "12px 20px", ...glass, borderRadius: 0, borderTop: "none", borderLeft: "none", borderRight: "none" },
  voltar: { color: "#e0e6ed", textDecoration: "none", fontSize: "13px", fontWeight: 600, padding: "5px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", whiteSpace: "nowrap" },
  logo: { display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: 700, letterSpacing: "1px", color: "#4fc3f7" },
  logoDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#4fc3f7", boxShadow: "0 0 8px #4fc3f7" },
  statusBadge: { display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" },
  statusDot: { width: "8px", height: "8px", borderRadius: "50%" },
  livre: { fontSize: "12px", fontWeight: 600, color: "#4fc3f7", padding: "4px 12px", borderRadius: "20px", border: "1px solid rgba(79,195,247,0.4)", background: "rgba(79,195,247,0.08)" },
  relogio: { marginLeft: "auto", fontSize: "18px", fontWeight: 700, fontVariantNumeric: "tabular-nums" },
  tz: { fontSize: "11px", fontWeight: 500, color: "#8899aa" },

  leftPanel: { position: "absolute", top: "56px", left: "12px", width: "330px", zIndex: 10, ...glass, padding: "14px", display: "flex", flexDirection: "column", gap: "10px" },
  statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" },
  statCard: { ...glass, padding: "10px 12px", borderRadius: "8px", background: "rgba(20,30,50,0.6)" },
  statLabel: { fontSize: "10px", color: "#8899aa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" },
  statValue: { fontSize: "20px", fontWeight: 700, color: "#e0e6ed", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  sectionTitle: { fontSize: "11px", color: "#8899aa", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginTop: "4px" },
  legenda: { fontSize: "10px", color: "#667788", lineHeight: 1.4 },

  bars: { display: "flex", flexDirection: "column", gap: "5px" },
  row: { display: "flex", alignItems: "center", gap: "8px" },
  sevLabel: { fontSize: "10px", fontWeight: 700, width: "58px", textAlign: "right" },
  nome: { fontSize: "12px", width: "110px", color: "#c0ccdd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  barBg: { flex: 1, height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.06)", overflow: "hidden" },
  barFill: { height: "100%", borderRadius: "3px", transition: "width 0.5s ease" },
  count: { fontSize: "11px", color: "#aab6c4", width: "52px", textAlign: "right", fontVariantNumeric: "tabular-nums" },

  rightPanel: { position: "absolute", top: "56px", right: "12px", bottom: "40px", width: "380px", zIndex: 10, ...glass, padding: "14px", display: "flex", flexDirection: "column", gap: "8px" },
  attackLog: { flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: "6px" },
  vazio: { fontSize: "12px", color: "#8899aa", padding: "8px 0" },
  attackCard: { ...glass, padding: "7px 10px", borderRadius: "8px", background: "rgba(20,30,50,0.5)", borderLeft: "3px solid", flexShrink: 0 },
  attackHeader: { display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" },
  sevBadge: { padding: "1px 6px", borderRadius: "4px", fontSize: "9px", fontWeight: 700, letterSpacing: "0.5px", flexShrink: 0 },
  attackType: { fontSize: "12px", fontWeight: 600, color: "#c0ccdd", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  attackTime: { marginLeft: "auto", fontSize: "10px", color: "#8899aa", flexShrink: 0, fontVariantNumeric: "tabular-nums" },
  attackDetails: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", fontSize: "11px", color: "#8fa0b2" },
  trunca: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  meta: { display: "flex", gap: "5px", alignItems: "center", flexShrink: 0 },
  rep: { fontWeight: 700, color: "#e0e6ed" },
  acao: { fontSize: "10px", color: "#8899aa" },
  mitreBadge: { padding: "1px 6px", borderRadius: "4px", fontSize: "9px", fontWeight: 600, background: "rgba(161,120,240,0.15)", color: "#c4a8f5", cursor: "help" },

  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, display: "flex", justifyContent: "space-between", padding: "8px 20px", fontSize: "10px", color: "#667788", ...glass, borderRadius: 0, borderBottom: "none", borderLeft: "none", borderRight: "none" },
};
