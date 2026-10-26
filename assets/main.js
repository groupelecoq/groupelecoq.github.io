/* Groupe Le Coq — comportement du site (lit les données de contenu.js) */
(function(){
  const D = window.LECOQ, R = D.reglages;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const img = (k, small) => `assets/img/${k}${small?"-s":""}.webp`;
  const tel = t => "tel:" + String(t).replace(/\s/g,"");
  const ig = h => `https://www.instagram.com/${h}/`;
  const maps = m => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(m.nom + " " + m.adresse);
  const ico = {
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>'
  };
  const CATS = [["all","Toutes"],["bouillon","Bouillons"],["fete","Fête & nuit"],["pub","Pub & burgers"],["jardin","Jardins & terrasses"],["traiteur","Traiteur"]];

  /* En-tête */
  const top = $("#top");
  if (top) { const f = () => top.classList.toggle("scrolled", scrollY > 8); f(); addEventListener("scroll", f, {passive:true}); }
  const burger = $("#burger"), nav = $("#nav");
  if (burger) {
    burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
    nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });
  }

  /* Vidéo du hero : pause si l'utilisateur réduit les animations */
  const v = $("#hero-video"), pp = $("#playpause");
  if (v) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { v.removeAttribute("autoplay"); v.pause(); pp && (pp.textContent = "▶", pp.setAttribute("aria-label","Lire la vidéo")); }
    pp && (pp.onclick = () => { if (v.paused) { v.play(); pp.textContent = "❚❚"; pp.setAttribute("aria-label","Mettre la vidéo en pause"); } else { v.pause(); pp.textContent = "▶"; pp.setAttribute("aria-label","Lire la vidéo"); } });
  }


  /* Film d'ouverture : une fois par session, passable, désactivé si l'utilisateur réduit les animations */
  const intro = $("#intro"), iv = $("#intro-video");
  function fermerIntro(){
    if (!intro || intro.hidden) return;
    intro.classList.add("out"); document.documentElement.classList.remove("intro-on");
    setTimeout(() => { intro.hidden = true; intro.classList.remove("out"); iv.pause(); }, 750);
    try { sessionStorage.setItem("lecoq-intro", "1"); } catch(_){}
  }
  function ouvrirIntro(){
    if (!intro) return;
    const h264 = iv.canPlayType('video/mp4; codecs="avc1.640028"'), portrait = innerHeight > innerWidth;
    const f = portrait ? "intro-vertical" : (h264 && innerWidth > 1400 ? "intro" : "intro-720");
    iv.poster = "assets/video/" + (portrait ? "intro-vertical-poster.jpg" : "intro-poster.jpg");
    iv.src = "assets/video/" + f + (h264 ? ".mp4" : ".webm");
    intro.hidden = false; document.documentElement.classList.add("intro-on");
    iv.currentTime = 0; const p = iv.play(); if (p && p.catch) p.catch(fermerIntro);
    $("#intro-skip").focus({preventScroll:true});
  }
  if (intro) {
    let vu = false; try { vu = sessionStorage.getItem("lecoq-intro") === "1"; } catch(_){}
    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
    iv.addEventListener("ended", fermerIntro);
    iv.addEventListener("timeupdate", () => { if (iv.duration) $("#intro-prog").style.width = (iv.currentTime/iv.duration*100) + "%"; });
    $("#intro-skip").onclick = fermerIntro;
    intro.addEventListener("click", e => { if (e.target === iv) fermerIntro(); });
    addEventListener("keydown", e => { if (e.key === "Escape") fermerIntro(); });
    const rf = $("#revoir-film"); if (rf) rf.onclick = ouvrirIntro;
    if (!vu && !reduit) ouvrirIntro();
  }

  /* Octobre Rose */
  const OR = D.octobreRose, ors = $("#octobre-rose");
  if (ors && OR && OR.actif && !(OR.jusquau && new Date() > new Date(OR.jusquau + "T23:59:59"))) {
    ors.hidden = false;
    $("#or-titre").textContent = OR.titre; $("#or-texte").textContent = OR.texte; $("#or-suite").textContent = OR.suite;
    $("#or-insta").href = ig(R.instagramGroupe); $("#or-lien").href = OR.lien;
    const v = $("#or-video"); v.poster = "assets/video/" + OR.poster; v.src = "assets/video/" + (v.canPlayType('video/mp4; codecs="avc1.42E01E"') ? OR.video : OR.video.replace(".mp4",".webm"));
    if ("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) v.play().catch(()=>{}); else v.pause(); }), {threshold:.35}).observe(v);
  }

  /* Haut de page : le mot qui roule (On mange. / trinque. / danse. / reçoit.) */
  const roll = $("#hp-roll");
  if (roll && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let k = 0; const n = roll.children.length - 1;
    setInterval(() => {
      k++; roll.classList.remove("sans-transition"); roll.style.transform = `translateY(${-k * 0.9}em)`;
      if (k === n) setTimeout(() => { roll.classList.add("sans-transition"); k = 0; roll.style.transform = "translateY(0)"; }, 750);
    }, 1900);
  } else if (roll) roll.style.transform = "translateY(-2.7em)";

  /* Bandeau des logos */
  const mq = $("#marquee");
  if (mq) {
    const logos = D.maisons.filter(m => m.logo).map(m => `<a href="#maison-${m.id}" aria-label="${esc(m.nom)}"><img src="assets/logos/${m.logoClair||m.logo}" alt="${esc(m.nom)}" loading="lazy"></a>`)
      .concat(D.bientot.map(b => `<a href="#bientot" aria-label="${esc(b.nom)}"><img src="assets/logos/${b.logo}" alt="${esc(b.nom)}" loading="lazy"></a>`)).join("");
    mq.innerHTML = logos + logos.replace(/<a /g,'<a tabindex="-1" aria-hidden="true" ');
  }

  /* Maisons */
  let cat = "all";
  function renderMaisons(){
    const el = $("#liste-maisons"); if (!el) return;
    $("#filtres").innerHTML = CATS.map(([k,l]) => `<button type="button" data-cat="${k}" aria-pressed="${k===cat}">${l}</button>`).join("");
    el.innerHTML = D.maisons.filter(m => cat==="all" || m.cat.includes(cat)).map(m => {
      const media = m.video
        ? `<video data-auto muted loop playsinline preload="none" poster="assets/video/${m.video}-poster.jpg" aria-label="Teaser ${esc(m.nom)}">${m.webm===false?"":`<source src="assets/video/${m.video}.webm" type="video/webm">`}<source src="assets/video/${m.video}.mp4" type="video/mp4"></video>`
        : m.photos.length
        ? `<img src="${img(m.photos[0],1)}" srcset="${img(m.photos[0],1)} 720w, ${img(m.photos[0])} 1600w" sizes="(max-width:760px) 100vw, 420px" alt="${esc(m.nom)}" loading="lazy">${m.photos[1]?`<img src="${img(m.photos[1],1)}" alt="" loading="lazy">`:""}
           ${m.logo?`<span class="badge-logo" style="background:${m.fond}"><img src="assets/logos/${m.logo}" alt=""></span>`:""}`
        : `<div class="logo-panel" style="background:${m.fond};color:${m.texte}">${m.logo?`<img src="assets/logos/${m.logo}" alt="${esc(m.nom)}" loading="lazy">`:`<span class="nomtxt">${esc(m.nom)}</span>`}</div>`;
      const peutResa = m.resa || m.whatsapp || m.mailResa || m.tel;
      const resa = m.id==="madame" ? `<a class="btn sm" href="mailto:${esc(R.mailEvenements)}">Demander un devis</a>`
                 : peutResa ? `<button class="btn sm" type="button" data-resa="${m.id}">Réserver</button>` : "";
      return `<article class="maison reveal" id="maison-${m.id}" style="--acc:${m.fond}">
        <div class="media">${media}<span class="chip">${esc(m.type)}</span>${m.nouveau?`<span class="chip nouveau">${esc(m.nouveau)}</span>`:""}</div>
        <div class="corps">
          <p class="label">${esc(m.ville)}</p>
          <h3>${esc(m.nom)}</h3>
          <p class="accroche">${esc(m.accroche)}</p>
          <p style="font-size:15px;color:var(--encre-2)">${esc(m.texteLong)}</p>
          <div class="infos">${ico.pin}<span>${esc(m.adresse)}</span>${m.horaires?ico.clock+`<span>${esc(m.horaires)}</span>`:""}</div>
          <div class="actions">${resa}
            ${m.carte?`<a class="btn sm clair" href="cartes.html#${m.carte}">Voir la carte</a>`:""}
            ${m.instagram?`<a class="btn sm clair" href="${ig(m.instagram)}" target="_blank" rel="noopener">Instagram</a>`:m.post?`<a class="btn sm clair" href="${esc(m.post)}" target="_blank" rel="noopener">Vu sur Instagram</a>`:""}
            ${m.adresse.length>25?`<a class="btn sm clair" href="${maps(m)}" target="_blank" rel="noopener">Itinéraire</a>`:""}
          </div>
        </div></article>`;
    }).join("");
  }
  const fl = $("#filtres");
  if (fl) { fl.addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) { cat = b.dataset.cat; renderMaisons(); } }); renderMaisons(); }

  /* Bientôt : La Casetta (teaser motion + inscription avant-première) */
  const ft = $("#feature");
  if (ft && D.bientot[0]) { const b = D.bientot[0];
    ft.innerHTML = `<div class="feature"><div>
        <img class="logo-c" src="assets/logos/${b.logo}" alt="${esc(b.nom)}">
        <p class="label">Prochainement · ${esc(b.lieu)}</p>
        <h3 style="margin-top:10px">Panuozzo le midi, pizza le soir.</h3>
        <p>${esc(b.texte)}</p>
        <form class="inscr" id="inscr" novalidate>
          <p class="inscr-t"><b>La carte en avant-première + des remises d'ouverture</b> : inscrivez-vous, on vous prévient avant tout le monde.</p>
          <div class="inscr-g">
            <label class="sr" for="i-prenom">Prénom</label><input id="i-prenom" name="prenom" placeholder="Prénom" autocomplete="given-name">
            <label class="sr" for="i-mail">E-mail</label><input id="i-mail" name="email" type="email" placeholder="E-mail" autocomplete="email" required>
            <label class="sr" for="i-tel">Téléphone (facultatif)</label><input id="i-tel" name="telephone" type="tel" placeholder="Mobile (facultatif)" autocomplete="tel">
          </div>
          <label class="consent"><input type="checkbox" id="i-ok"> J'accepte de recevoir les offres de La Casetta du Coq. Désinscription à tout moment.</label>
          <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn blanc" type="submit">Je m'inscris</button>${R.whatsappGroupe?`<button class="btn contour-blanc" type="button" id="i-wa">Par WhatsApp</button>`:""}<a class="btn contour-blanc" href="cartes.html#${b.carte}">La carte de lancement</a></div>
          <p class="inscr-r" id="i-r" hidden></p>
        </form>
      </div><div class="gal">${b.video?`<video data-auto muted loop playsinline preload="none" poster="assets/video/${b.video}-poster.jpg" aria-label="Teaser La Casetta : le rideau s'ouvre"><source src="assets/video/${b.video}.webm" type="video/webm"><source src="assets/video/${b.video}.mp4" type="video/mp4"></video>`:""}${b.photos.slice(b.video?1:0).map(p=>`<img src="${img(p)}" alt="${esc(b.nom)}" loading="lazy">`).join("")}</div></div>`;
    const f = $("#inscr"), out = $("#i-r");
    const msg = () => `Bonjour, je souhaite recevoir la carte de La Casetta du Coq en avant-première et les remises d'ouverture.\n${$("#i-prenom").value.trim()} · ${$("#i-mail").value.trim()}${$("#i-tel").value.trim()?" · "+$("#i-tel").value.trim():""}`;
    const ok = () => { if (!$("#i-mail").value.trim() || !$("#i-mail").checkValidity()) { out.hidden=false; out.textContent="Indiquez une adresse e-mail valide."; $("#i-mail").focus(); return false; }
      if (!$("#i-ok").checked) { out.hidden=false; out.textContent="Cochez l'accord pour recevoir nos offres."; $("#i-ok").focus(); return false; } return true; };
    f.addEventListener("submit", async e => { e.preventDefault(); if (!ok()) return;
      if (R.inscriptionCasetta) { try { const r = await fetch(R.inscriptionCasetta, {method:"POST", headers:{"Accept":"application/json"}, body:new FormData(f)});
        if (r.ok) { f.reset(); out.hidden=false; out.textContent="C'est noté ! Vous recevrez la carte en avant-première."; return; } } catch(_){} }
      out.hidden=false; out.textContent="Votre messagerie s'ouvre avec l'inscription prête : il ne reste qu'à envoyer.";
      location.href = `mailto:${R.mailInscription}?subject=${encodeURIComponent("Inscription avant-première La Casetta")}&body=${encodeURIComponent(msg())}`; });
    const iw = $("#i-wa"); if (iw) iw.onclick = () => { if (!ok()) return; window.open(`https://wa.me/${R.whatsappGroupe}?text=${encodeURIComponent(msg())}`, "_blank", "noopener"); };
  }

  /* Nouveautés */
  const nw = $("#news");
  if (nw) nw.innerHTML = D.nouveautes.slice(0,4).map(n => `<a class="new reveal" href="${esc(n.lien)}">
      <div class="img">${n.photo?`<img src="${img(n.photo,1)}" alt="" loading="lazy">`:`<div class="img-logo" style="background:${n.fond||"var(--encre)"}"><img src="assets/logos/${n.logo}" alt="" loading="lazy"></div>`}</div>
      <p class="label">${new Date(n.date+"T12:00").toLocaleDateString("fr-FR",{month:"long",year:"numeric"})} · ${esc(n.maison)}</p>
      <h3>${esc(n.titre)}</h3><p>${esc(n.texte)}</p></a>`).join("");

  /* Réseaux : Instagram (Behold si configuré, sinon mosaïque de nos photos) + Facebook */
  const comptes = [{n:"Groupe Le Coq", h:R.instagramGroupe}].concat(D.maisons.filter(m=>m.instagram && m.instagram!==R.instagramGroupe).filter((m,i,a)=>a.findIndex(x=>x.instagram===m.instagram)===i).map(m=>({n:m.nom,h:m.instagram})));
  const cp = $("#comptes");
  if (cp) cp.innerHTML = comptes.map(c => `<li><a href="${ig(c.h)}" target="_blank" rel="noopener"><span>${esc(c.n)}</span><small>@${esc(c.h)} ↗</small></a></li>`).join("")
    + (R.facebookPage ? `<li><a href="${esc(R.facebookPage)}" target="_blank" rel="noopener"><span>Facebook</span><small>Page du groupe ↗</small></a></li>` : "");
  const insta = $("#insta");
  if (insta) {
    if (R.beholdFeedId) {
      insta.innerHTML = `<behold-widget feed-id="${esc(R.beholdFeedId)}"></behold-widget>`;
      const s = document.createElement("script"); s.type = "module"; s.src = "https://w.behold.so/widget.js"; document.head.appendChild(s);
    } else {
      const pics = ["bal-soiree3","casetta-pista","gdc-tablee","bal-bar","bdg-pergola","casetta-truffa","gdc-bbq","bal-cadres","pou-terrasse"];
      insta.innerHTML = `<div class="insta-grid">${pics.map(p=>`<a href="${ig(R.instagramGroupe)}" target="_blank" rel="noopener" aria-label="Voir sur Instagram"><img src="${img(p,1)}" alt="" loading="lazy"></a>`).join("")}</div>`;
    }
  }
  const fb = $("#fb");
  if (fb && R.facebookPage) fb.innerHTML = `<iframe title="Facebook Groupe Le Coq" src="https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(R.facebookPage)}&tabs=timeline&width=500&height=520&small_header=true&hide_cover=false" width="500" height="520" style="border:0;max-width:100%" loading="lazy" allow="encrypted-media"></iframe>`;

  /* Événements / presse / pied */
  const me = $("#mail-events"); if (me) me.href = "mailto:" + R.mailEvenements + "?subject=" + encodeURIComponent("Demande de devis événement");
  const mp = $("#mail-presse"); if (mp) mp.textContent = R.mailPresse;
  const rv = $("#revue"); if (rv) rv.innerHTML = D.presse.map(p => `<li><span class="m">${esc(p.date)}<br>${esc(p.media)}</span><b>${p.url?`<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.titre)}</a>`:esc(p.titre)}</b></li>`).join("");
  const pm = $("#pied-maisons"); if (pm) pm.innerHTML = D.maisons.map(m => `<li><a href="index.html#maison-${m.id}">${esc(m.nom)}</a></li>`).join("");
  const pr = $("#pied-reseaux"); if (pr) pr.innerHTML = comptes.map(c => `<li><a href="${ig(c.h)}" target="_blank" rel="noopener">Instagram @${esc(c.h)}</a></li>`).join("") + (R.facebookPage?`<li><a href="${esc(R.facebookPage)}" target="_blank" rel="noopener">Facebook</a></li>`:"");
  const eq = $("#espace-equipes"); if (eq) { eq.href = R.espaceEquipes; eq.target = "_blank"; eq.rel = "noopener"; }
  const an = $("#annee"); if (an) an.textContent = new Date().getFullYear();

  /* Guinguette : rendez-vous + rétrospective */
  const G = D.guinguette || {}, B = D.bal || {};
  const carteRetro = r => `<figure class="ret reveal"><img src="${img(r.photo,1)}" alt="${esc(r.titre)}" loading="lazy"><figcaption><span>${esc(r.date)}</span>${esc(r.titre)}</figcaption></figure>`;
  const rdv = $("#rdv");
  if (rdv && G.rendezvous) rdv.innerHTML = G.rendezvous.map(r => `<article class="rdv-c reveal"><div class="im"><img src="${img(r.photo,1)}" alt="" loading="lazy"></div><h3>${esc(r.titre)}</h3><p>${esc(r.texte)}</p></article>`).join("");
  const rg = $("#retro-gdc"); if (rg && G.retro) rg.innerHTML = G.retro.map(carteRetro).join("");
  const gn = $("#gdc-note"); if (gn) gn.textContent = G.note || "";
  const bf = $("#bal-formats"); if (bf && B.formats) bf.innerHTML = B.formats.map(k => `<img class="fmt reveal" src="${img(k,1)}" alt="" loading="lazy">`).join("");
  const rb = $("#retro-bal"); if (rb && B.retro) rb.innerHTML = B.retro.map(carteRetro).join("");

  /* Événements au Bistrot des Girondins */
  const E = D.evenements || {};
  const eg = $("#ev-gal"); if (eg && E.photos) eg.innerHTML = E.photos.map(p => `<img src="${img(p,1)}" alt="" loading="lazy">`).join("");
  const ef = $("#ev-formats"); if (ef && E.formats) ef.innerHTML = E.formats.map((f,i) => `<div class="evf reveal"><b>${String(i+1).padStart(2,"0")}</b><h4>${esc(f.titre)}</h4><p>${esc(f.texte)}</p></div>`).join("");
  const te = $("#tel-ev"); if (te) te.innerHTML = `<a href="${tel(R.telEvenements)}">${esc(R.telEvenements)}</a>`;
  const dv = $("#devis");
  if (dv) dv.addEventListener("click", e => {
    const b = e.target.closest("[data-devis]"); if (!b) return;
    const g = id => document.getElementById(id).value.trim(), out = $("#d-retour");
    if (!g("d-nom") || !g("d-tel")) { out.hidden = false; out.textContent = "Indiquez au moins votre nom et votre téléphone."; (g("d-nom")?$("#d-tel"):$("#d-nom")).focus(); return; }
    const d = g("d-date") ? new Date(g("d-date")+"T12:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}) : "date à définir";
    const txt = `Bonjour, je souhaite organiser un événement au Bistrot des Girondins.\nType : ${g("d-type")}\nDate : ${d}\nInvités : ${g("d-pers")||"—"}\nRestauration : ${g("d-traiteur")}\n${g("d-msg")?"\n"+g("d-msg")+"\n":""}\n${g("d-nom")} · ${g("d-tel")}\n(demande envoyée depuis le site du Groupe Le Coq)`;
    if (b.dataset.devis === "wa") window.open(`https://wa.me/${R.whatsappEvenements}?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
    else location.href = `mailto:${R.mailEvenements}?subject=${encodeURIComponent("Demande de devis – " + g("d-type") + " – " + g("d-nom"))}&body=${encodeURIComponent(txt)}`;
    out.hidden = false; out.textContent = "Votre demande est prête : il ne reste qu'à l'envoyer. Réponse sous 48 h.";
  });

  /* La brigade */
  const Bg = D.brigade || {};
  const bt = $("#brig-texte"); if (bt) bt.textContent = Bg.texte || "";
  const bk = $("#brig-kpi"); if (bk && Bg.chiffres) bk.innerHTML = Bg.chiffres.map(([a,b]) => `<div><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("");
  const bgal = $("#brig-gal"); if (bgal && Bg.photos) bgal.innerHTML = Bg.photos.map(p => `<img src="${img(p,1)}" alt="L'équipe du Groupe Le Coq" loading="lazy">`).join("");

  /* Communication & marques */
  const C = D.communication, cm = $("#com");
  if (cm && C) cm.innerHTML = `<p class="label">Communication &amp; marques</p><p class="com-t">${esc(C.texte)}</p>
    <div class="com-k">${C.preuves.map(([a,b]) => `<div><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join("")}</div>
    <p class="com-c">${esc(C.contact)} <a href="mailto:${esc(R.mailPresse)}">${esc(R.mailPresse)}</a></p>`;

  /* Vidéos teaser : lecture quand visibles */
  const autos = () => document.querySelectorAll("video[data-auto]").forEach(v => { if (v._obs) return; v._obs = 1;
    if ("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? v.play().catch(()=>{}) : v.pause()), {threshold:.3}).observe(v); });
  autos(); if (fl) fl.addEventListener("click", () => setTimeout(autos, 0));

  /* Recrutement */
  const of = $("#offres");
  if (of) {
    of.innerHTML = D.offres.map((o,i) => { const m = D.maisons.find(x=>x.id===o.maison);
      return `<article class="offre"><h4>${esc(o.titre)}</h4><div class="meta"><span class="tag">${esc(o.contrat)}</span><span class="tag">${esc(m?m.nom:o.maison)}</span>${o.heures?`<span class="tag">${esc(o.heures)}</span>`:""}</div>
        <p style="color:var(--encre-2);font-size:15px">${esc(o.texte)}</p>${o.debut?`<p style="font-size:14px"><b>Prise de poste :</b> ${esc(o.debut)}</p>`:""}
        <div><button class="btn sm" type="button" data-postuler="${i}">Postuler</button></div></article>`; }).join("")
      + `<article class="offre"><h4>Candidature spontanée</h4><p style="color:var(--encre-2);font-size:15px">Pas d'offre qui vous correspond ? Dites-nous ce que vous savez faire, on vous recontacte dès qu'un poste s'ouvre.</p></article>`;
    const postes = ["Serveur / serveuse","Chef de rang","Barman / barmaid","Cuisinier / cuisinière","Commis de cuisine","Plongeur / plongeuse","Pizzaiolo","Responsable de salle","Chef de cuisine","Extra événementiel","Candidature spontanée"];
    D.offres.forEach(o => { if (!postes.includes(o.titre)) postes.unshift(o.titre); });
    $("#c-poste").innerHTML = postes.map(p=>`<option>${esc(p)}</option>`).join("");
    $("#c-maison").innerHTML = `<option value="">Peu importe</option>` + D.maisons.concat(D.bientot).map(m=>`<option value="${m.id}">${esc(m.nom)}</option>`).join("");
    of.addEventListener("click", e => { const b = e.target.closest("[data-postuler]"); if (!b) return; const o = D.offres[+b.dataset.postuler];
      $("#c-poste").value = o.titre; $("#c-maison").value = o.maison; $("#c-prenom").focus(); $("#candidature").scrollIntoView({behavior:"smooth",block:"start"}); });
    $("#candidature").addEventListener("submit", async e => {
      e.preventDefault(); const f = e.target, out = $("#c-retour");
      const miss = ["c-prenom","c-nom","c-tel","c-mail"].find(id => !document.getElementById(id).value.trim());
      if (miss) { document.getElementById(miss).focus(); out.hidden = false; out.textContent = "Merci de compléter vos coordonnées."; return; }
      if (!$("#c-mail").checkValidity()) { $("#c-mail").focus(); out.hidden = false; out.textContent = "L'adresse e-mail ne semble pas valide."; return; }
      if (!$("#c-ok").checked) { $("#c-ok").focus(); out.hidden = false; out.textContent = "Cochez l'accord pour que nous puissions étudier votre candidature."; return; }
      const data = Object.fromEntries(new FormData(f)); const mName = (D.maisons.concat(D.bientot).find(m=>m.id===data.maison)||{}).nom || "Peu importe";
      if (R.formulaireCandidature) {
        try { const r = await fetch(R.formulaireCandidature, {method:"POST", headers:{"Accept":"application/json"}, body:new FormData(f)});
          if (r.ok) { f.reset(); out.hidden = false; out.textContent = "Merci ! Votre candidature est bien envoyée. Nous revenons vers vous sous une semaine."; return; } } catch(_){}
      }
      const corps = `Bonjour,\n\nJe souhaite rejoindre le Groupe Le Coq.\nPoste : ${data.poste}\nMaison : ${mName}\nContrat : ${data.contrat}\nDisponible le : ${data.disponibilite||"—"}\n\nExpérience : ${data.experience||"—"}\n\n${data.prenom} ${data.nom}\n${data.telephone}\n${data.email}`;
      const sujet = `Candidature ${data.poste} – ${data.prenom} ${data.nom}`;
      out.hidden = false;
      out.innerHTML = `<b>Votre candidature est prête.</b> Votre messagerie va s'ouvrir ; si ce n'est pas le cas, copiez le texte ci-dessous et envoyez-le à <b>${esc(R.mailRecrutement)}</b>, avec votre CV si vous en avez un.<pre>${esc(corps)}</pre>`;
      location.href = `mailto:${R.mailRecrutement}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    });
  }
})();
