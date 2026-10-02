/* Transição entre o painel e o mapa de ataques: o logótipo «Governo dos
   Açores» a surgir como um vulto ao centro (pedido do Miguel, 2026-10-02;
   antes era a bandeira a ondular, que saiu).

   Há uma cópia IGUAL em mapa/frontend/app/public/transicao.js (o painel e o
   mapa estão em portas diferentes — sites diferentes para o browser — e cada
   um serve a sua); tests/test_dashboard.py confere que são iguais. Mudar nos
   dois.

   Quem sai chama TransicaoAcores.sair(url): o ecrã escurece e o logótipo
   surge — começa como uma silhueta escura e desfocada e ganha nitidez, cor e
   tamanho —, e só depois a página muda, com «#acores» no endereço. Quem entra
   vê esse «#acores», abre com o logótipo no ecrã e desvanece-o. No modo leve
   (html.leve) muda logo, sem animação.

   Só opacity, transform e filter num elemento pequeno: leve para o PC da TV. */
(function () {
  "use strict";
  const script = document.currentScript;
  // O logótipo entregue pelo Miguel (Fotos/governo-dos-acores-vector-logo.png,
  // recortado à margem branca).
  const LOGO = (script && script.dataset.logo) || "governo-acores.png";
  const MARCA = "#acores";
  const SAIR_MS = 1400;      // do logótipo a surgir até a página mudar
  const FICAR_MS = 600;      // quanto fica no ecrã na página que entra
  const DESVANECER_MS = 600;

  const CSS = `
.trans-acores { position: fixed; inset: 0; z-index: 99999; background: #050c18;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity .35s ease-out; pointer-events: none; }
.trans-acores.visivel { opacity: 1; }
.trans-acores.sai { opacity: 0; transition: opacity ${DESVANECER_MS}ms ease-in; }
.trans-acores .ta-logo { background: #fff; border-radius: 1.4vh; padding: 2vh 2.8vh;
  box-shadow: 0 0 0 rgba(120, 160, 255, 0);
  opacity: 0; transform: scale(.86); filter: blur(18px) brightness(0);
  /* Começa devagar (curva lenta no início): fica uns instantes como vulto
     escuro e desfocado antes de ganhar cor e nitidez. */
  transition: opacity .5s ease-out, transform 1.2s cubic-bezier(.45, 0, .25, 1),
              filter 1.2s cubic-bezier(.55, 0, .35, 1), box-shadow 1.2s ease-out; }
.trans-acores.visivel .ta-logo { opacity: 1; transform: scale(1); filter: none;
  box-shadow: 0 2vh 6vh rgba(0, 0, 0, .55), 0 0 8vh rgba(120, 160, 255, .18); }
.trans-acores.sai .ta-logo { transform: scale(1.04); }
.trans-acores .ta-logo img { display: block; height: 14vh; width: auto; }
`;

  function estilo() {
    if (document.getElementById("trans-acores-css")) return;
    const st = document.createElement("style");
    st.id = "trans-acores-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function montar() {
    estilo();
    const ov = document.createElement("div");
    ov.className = "trans-acores";
    ov.setAttribute("aria-hidden", "true");
    const logo = document.createElement("div");
    logo.className = "ta-logo";
    const img = document.createElement("img");
    img.src = LOGO;
    img.alt = "";
    logo.appendChild(img);
    ov.appendChild(logo);
    document.body.appendChild(ov);
    return ov;
  }

  const leve = () => document.documentElement.classList.contains("leve");

  function sair(url) {
    const alvo = url.split("#")[0] + MARCA;
    if (leve()) { location.href = url; return; }
    const ov = montar();
    void ov.offsetWidth;            // aplica o estado inicial antes de animar
    ov.classList.add("visivel");
    setTimeout(() => { location.href = alvo; }, SAIR_MS);
  }

  function entrar() {
    if (location.hash !== MARCA) return;
    // Tira o «#acores» do endereço: um F5 depois não repete a animação.
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* sem history */ }
    if (leve()) return;
    const ov = montar();
    // Já no ecrã, sem animar a entrada: continua de onde a outra página ficou.
    ov.style.transition = "none";
    ov.firstChild.style.transition = "none";
    ov.classList.add("visivel");
    void ov.offsetWidth;
    ov.style.transition = "";
    ov.firstChild.style.transition = "";
    setTimeout(() => {
      ov.classList.add("sai");
      setTimeout(() => ov.remove(), DESVANECER_MS + 50);
    }, FICAR_MS);
  }

  // Voltar com «Retroceder» pode trazer a página da cache ainda com o logótipo.
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.querySelectorAll(".trans-acores").forEach((o) => o.remove());
  });

  if (document.body) entrar();
  else document.addEventListener("DOMContentLoaded", entrar);

  window.TransicaoAcores = { sair };
})();
