/* Script de la page, sorti du HTML pour la politique de sécurité (CSP) */
if (location.hash === "#basta") history.replaceState(null, "", "#coqnsmash");
const CARTES = window.CARTES;
const D = window.LECOQ, $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const liste = D.maisons.map(m => ({...m, cle:m.carte||m.id})).concat(D.bientot.map(b=>({...b, cle:b.carte, ville:b.lieu, type:"Bientôt · "+b.quand, fond:"#F3E9D2"})));
$("#cartes-nav").innerHTML = liste.map(m => `<a href="#${m.cle}" data-k="${m.cle}">${esc(m.nom)}</a>`).join("");
$("#cartes").innerHTML = liste.map(m => { const c = CARTES[m.cle];
  const head = `<div class="entete">${m.logo?`<img class="lg" src="assets/logos/${m.logo}" alt="" style="background:${m.fond};padding:10px 14px">`:""}
      <p class="label">${esc(m.type)} · ${esc(m.ville)}</p><h2>${esc(m.nom)}</h2>
      ${c?`<p><b>${esc(c.titre)}.</b> ${esc(c.note)}</p>`:""}
      <p style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">${(m.resa||m.whatsapp||m.mailResa||m.tel)?`<button class="btn sm" type="button" data-resa="${m.id}">Réserver</button>`:""}${c&&c.pdf?`<a class="btn sm clair" href="${c.pdf}" target="_blank" rel="noopener">Carte en PDF</a>`:""}</p>
      ${m.adresse?`<p style="margin-top:14px;font-size:15px">${esc(m.adresse)}${m.tel?` · <a href="tel:${m.tel.replace(/\s/g,"")}">${esc(m.tel)}</a>`:""}</p>`:""}</div>`;
  let body;
  if (c && c.image) body = `<img class="carte-img" src="${c.image}" alt="Carte ${esc(m.nom)}" loading="lazy">`;
  else if (c && c.sections) body = `<div class="menu-html">${c.sections.map(([t,items]) => `<h3>${esc(t)}</h3>` + items.map(([n,d,p]) => `<div class="plat"><b>${esc(n)}</b>${p?`<span class="p">${esc(p)} €</span>`:""}${d?`<small>${esc(d)}</small>`:""}</div>`).join("")).join("")}</div>`;
  else { const h = m.instagram || D.reglages.instagramGroupe;
    body = `<div class="vide"><p style="font-family:var(--f-titre);font-size:24px;color:var(--encre)">La carte change au fil du marché.</p><p style="margin-top:8px">Retrouvez l'ardoise du moment sur Instagram ou demandez-la par téléphone.</p><p style="margin-top:18px"><a class="btn sm" href="https://www.instagram.com/${esc(h)}/" target="_blank" rel="noopener">@${esc(h)}</a></p></div>`; }
  return `<section class="carte-bloc" id="${m.cle}">${head}<div>${body}</div></section>`; }).join("");
function marque(){ const k = location.hash.slice(1); document.querySelectorAll("#cartes-nav a").forEach(a => a.setAttribute("aria-current", a.dataset.k===k)); }
addEventListener("hashchange", marque); marque();
const burger = $("#burger"), nav = $("#nav"); burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
