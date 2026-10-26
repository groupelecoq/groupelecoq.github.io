/* Script de la page, sorti du HTML pour la politique de sécurité (CSP) */
(function(){
  const G = window.GALERIE, $ = s => document.querySelector(s);
  const COLS = {bal:"#F5DC78", poupoule:"#8FD3A6", guinguette:"#F28C38", bdg:"#F96EA7", gala:"#FFD400", madame:"#FBE3EA", casetta:"#F6C7D2", brigade:"#2D2BE0", soirees:"#FF4FA3"};
  const nom = id => (G.maisons.find(m => m.id === id) || {}).nom || "";
  let filtre = "all", vues = [], cur = 0;
  function rendre(){
    const ids = ["all"].concat(G.maisons.map(m => m.id).filter(id => G.photos.some(p => p.m === id)));
    $("#gf").innerHTML = ids.map(id => `<button type="button" data-f="${id}" aria-pressed="${id===filtre}">${id==="all"?"Toutes":nom(id)}</button>`).join("");
    vues = G.photos.filter(p => filtre === "all" || p.m === filtre);
    $("#mur").innerHTML = vues.map((p,i) => `<button type="button" data-i="${i}" style="--c:${COLS[p.m]||"#FFD400"};--r:${((i*37)%7-3)*0.6}deg" aria-label="Agrandir : ${nom(p.m)}"><img src="assets/img/${p.k}-s.webp" alt="${nom(p.m)}" loading="lazy" width="720" height="${Math.round(720*p.r)}"><span class="tag">${nom(p.m)}</span></button>`).join("");
  }
  const lb = $("#lb");
  function ouvrir(i){ cur = (i + vues.length) % vues.length; const p = vues[cur]; $("#lb-img").src = `assets/img/${p.k}.webp`; $("#lb-img").alt = nom(p.m); $("#lb-cap").textContent = `${nom(p.m)} · ${cur+1}/${vues.length}`; if (!lb.open) lb.showModal ? lb.showModal() : lb.setAttribute("open",""); }
  $("#gf").addEventListener("click", e => { const b = e.target.closest("[data-f]"); if (b) { filtre = b.dataset.f; rendre(); } });
  $("#mur").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) ouvrir(+b.dataset.i); });
  $("#lb-prev").onclick = () => ouvrir(cur - 1); $("#lb-next").onclick = () => ouvrir(cur + 1);
  lb.addEventListener("click", e => { if (e.target === lb || e.target.closest("[data-close]")) lb.close ? lb.close() : lb.removeAttribute("open"); });
  lb.addEventListener("keydown", e => { if (e.key === "ArrowLeft") ouvrir(cur - 1); if (e.key === "ArrowRight") ouvrir(cur + 1); });
  const burger = $("#burger"), nav = $("#nav"); burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
  rendre();
})();
