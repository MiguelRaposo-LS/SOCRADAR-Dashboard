/* Transição entre o painel e o mapa de ataques: a bandeira dos Açores a
   ondular ao centro (pedido do Miguel, 2026-10-02).

   Há uma cópia IGUAL em mapa/frontend/app/public/transicao.js (o painel e o
   mapa estão em portas diferentes — sites diferentes para o browser — e cada
   um serve a sua); tests/test_dashboard.py confere que são iguais. Mudar nos
   dois.

   Quem sai chama TransicaoAcores.sair(url): o ecrã escurece, a bandeira
   aparece e ondula, com o logótipo «Governo dos Açores» por baixo, e só
   depois a página muda, com «#bandeira» no
   endereço. Quem entra vê esse «#bandeira», abre com a bandeira já no ecrã e
   desvanece-a. No modo leve (html.leve) muda logo, sem animação.

   A ondulação desenha-se num canvas, em fatias de 2 px deslocadas por uma
   onda contínua (ver ondular). */
(function () {
  "use strict";
  const script = document.currentScript;
  const BANDEIRA = (script && script.dataset.bandeira) || "bandeira-acores.svg";
  // Por baixo da bandeira, o logótipo «Governo dos Açores» (entregue pelo
  // Miguel, Fotos/governo-dos-acores-vector-logo.png, recortado à margem).
  const LOGO = (script && script.dataset.logo) || "governo-acores.png";
  const MARCA = "#bandeira";
  // Onda: amplitude em fração da altura da bandeira (o canvas tem essa folga
  // em cima e em baixo), comprimento ~0,8 da largura, um ciclo a cada 1,3 s.
  const AMPL = 0.035, ONDAS = 1.25, PERIODO_S = 1.3, FATIA = 2;
  const SAIR_MS = 1300;      // da bandeira a aparecer até a página mudar
  const FICAR_MS = 700;      // quanto fica no ecrã na página que entra
  const DESVANECER_MS = 600;

  const CSS = `
.trans-bandeira { position: fixed; inset: 0; z-index: 99999; background: #050c18;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.2vh;
  opacity: 0; transition: opacity .4s ease-out; pointer-events: none; }
.trans-bandeira.visivel { opacity: 1; }
.trans-bandeira.sai { opacity: 0; transition: opacity ${DESVANECER_MS}ms ease-in; }
.trans-bandeira .tb-flag { display: block; width: min(44vw, 60vh); aspect-ratio: ${3 / (2 * (1 + 2 * AMPL))};
  transform: scale(.9); opacity: 0; transition: transform .7s cubic-bezier(.2, .8, .2, 1), opacity .5s ease-out; }
.trans-bandeira.visivel .tb-flag { transform: scale(1); opacity: 1; }
.trans-bandeira .tb-logo { background: #fff; border-radius: .9vh; padding: 1.1vh 1.6vh;
  box-shadow: 0 .8vh 2vh rgba(0, 0, 0, .45);
  transform: translateY(1.5vh); opacity: 0; transition: transform .7s .15s cubic-bezier(.2, .8, .2, 1), opacity .5s .15s ease-out; }
.trans-bandeira.visivel .tb-logo { transform: none; opacity: 1; }
.trans-bandeira .tb-logo img { display: block; height: 7vh; width: auto; }
`;

  function estilo() {
    if (document.getElementById("trans-bandeira-css")) return;
    const st = document.createElement("style");
    st.id = "trans-bandeira-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function montar() {
    estilo();
    const ov = document.createElement("div");
    ov.className = "trans-bandeira";
    ov.setAttribute("aria-hidden", "true");
    const flag = document.createElement("canvas");
    flag.className = "tb-flag";
    ov.appendChild(flag);
    // O logótipo aparece dos dois lados (na página que sai e na que entra):
    // assim a bandeira fica no mesmo sítio e não dá um salto na passagem.
    const logo = document.createElement("div");
    logo.className = "tb-logo";
    const img = document.createElement("img");
    img.src = LOGO;
    img.alt = "Governo dos Açores";
    logo.appendChild(img);
    ov.appendChild(logo);
    document.body.appendChild(ov);
    ondular(flag);
    return ov;
  }

  // A bandeira a ondular, desenhada num canvas em fatias de 2 px, cada uma
  // deslocada por uma onda contínua e sombreada pela inclinação dela. A
  // primeira versão (faixas de CSS) mostrava retângulos e costuras; aqui a
  // diferença entre fatias vizinhas é de décimos de píxel e não se vê.
  // O lado do mastro (esquerdo) quase não mexe; a onda cresce para a ponta.
  function ondular(cv) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(cv.clientWidth * dpr), Ht = Math.round(cv.clientHeight * dpr);
    if (!W || !Ht) return;
    cv.width = W; cv.height = Ht;
    const H = Math.round(Ht / (1 + 2 * AMPL)), A = (Ht - H) / 2;
    const ctx = cv.getContext("2d");
    const pano = document.createElement("canvas");   // a bandeira parada, já no tamanho
    pano.width = W; pano.height = H;
    const img = new Image();
    let t0 = 0;
    const frame = (now) => {
      if (!cv.isConnected) return;                    // a transição acabou
      if (!t0) t0 = now;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, Ht);
      for (let x = 0; x < W; x += FATIA) {
        const u = x / W;
        const fase = u * ONDAS * 2 * Math.PI - (t / PERIODO_S) * 2 * Math.PI;
        const amp = A * (0.15 + 0.85 * u);
        const y = A + amp * Math.sin(fase);
        const w = Math.min(FATIA, W - x);
        ctx.drawImage(pano, x, 0, w, H, x, y, w, H);
        // Luz: a face virada para cima mais clara, a de baixo mais escura.
        const luz = Math.cos(fase) * (0.25 + 0.75 * u);
        ctx.fillStyle = luz > 0 ? `rgba(255,255,255,${(0.10 * luz).toFixed(3)})` : `rgba(0,0,0,${(-0.18 * luz).toFixed(3)})`;
        ctx.fillRect(x, y, w, H);
      }
      requestAnimationFrame(frame);
    };
    img.onload = () => { pano.getContext("2d").drawImage(img, 0, 0, W, H); requestAnimationFrame(frame); };
    img.src = BANDEIRA;
  }

  const leve = () => document.documentElement.classList.contains("leve");

  function sair(url, destino) {
    const alvo = url.split("#")[0] + MARCA;
    if (leve()) { location.href = url; return; }
    const ov = montar();
    void ov.offsetWidth;            // aplica o estado inicial antes de animar
    ov.classList.add("visivel");
    setTimeout(() => { location.href = alvo; }, SAIR_MS);
  }

  function entrar() {
    if (location.hash !== MARCA) return;
    // Tira o «#bandeira» do endereço: um F5 depois não repete a animação.
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* sem history */ }
    if (leve()) return;
    const ov = montar();
    ov.style.transition = "none";
    ov.classList.add("visivel");
    setTimeout(() => {
      ov.style.transition = "";
      ov.classList.add("sai");
      setTimeout(() => ov.remove(), DESVANECER_MS + 50);
    }, FICAR_MS);
  }

  // Voltar com «Retroceder» pode trazer a página da cache ainda com a bandeira.
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.querySelectorAll(".trans-bandeira").forEach((o) => o.remove());
  });

  if (document.body) entrar();
  else document.addEventListener("DOMContentLoaded", entrar);

  window.TransicaoAcores = { sair };
})();
