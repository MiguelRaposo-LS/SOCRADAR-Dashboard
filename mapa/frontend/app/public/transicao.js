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

   A ondulação é a bandeira cortada em faixas verticais, cada uma a subir e a
   descer um pouco desfasada da vizinha: só transform, barato para o PC da TV. */
(function () {
  "use strict";
  const script = document.currentScript;
  const BANDEIRA = (script && script.dataset.bandeira) || "bandeira-acores.svg";
  // Por baixo da bandeira, o logótipo «Governo dos Açores» (entregue pelo
  // Miguel, Fotos/governo-dos-acores-vector-logo.png, recortado à margem).
  const LOGO = (script && script.dataset.logo) || "governo-acores.png";
  const MARCA = "#bandeira";
  const FAIXAS = 28;
  const SAIR_MS = 1300;      // da bandeira a aparecer até a página mudar
  const FICAR_MS = 700;      // quanto fica no ecrã na página que entra
  const DESVANECER_MS = 600;

  const CSS = `
.trans-bandeira { position: fixed; inset: 0; z-index: 99999; background: #050c18;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.2vh;
  opacity: 0; transition: opacity .4s ease-out; pointer-events: none; }
.trans-bandeira.visivel { opacity: 1; }
.trans-bandeira.sai { opacity: 0; transition: opacity ${DESVANECER_MS}ms ease-in; }
.trans-bandeira .tb-flag { display: flex; width: min(44vw, 60vh); aspect-ratio: 3 / 2;
  filter: drop-shadow(0 1.2vh 2.4vh rgba(0, 0, 0, .55));
  transform: scale(.9); opacity: 0; transition: transform .7s cubic-bezier(.2, .8, .2, 1), opacity .5s ease-out; }
.trans-bandeira.visivel .tb-flag { transform: scale(1); opacity: 1; }
.trans-bandeira .tb-flag span { flex: 1; height: 100%; background-repeat: no-repeat;
  background-size: ${FAIXAS * 100}% 100%; animation: tb-onda 1.4s ease-in-out infinite; }
@keyframes tb-onda {
  0%, 100% { transform: translateY(-1.6%); filter: brightness(1.04); }
  50% { transform: translateY(1.6%); filter: brightness(.88); }
}
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
    const flag = document.createElement("div");
    flag.className = "tb-flag";
    for (let i = 0; i < FAIXAS; i++) {
      const f = document.createElement("span");
      f.style.backgroundImage = `url("${BANDEIRA}")`;
      f.style.backgroundPosition = `${(i / (FAIXAS - 1)) * 100}% 0`;
      // Desfasada da vizinha: a onda corre da esquerda (o mastro) para a direita.
      f.style.animationDelay = `${-i * 0.06}s`;
      flag.appendChild(f);
    }
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
    return ov;
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
