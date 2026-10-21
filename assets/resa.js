/* Réservation express : en ligne (Vite Une Table), WhatsApp, e-mail ou téléphone.
   Le client remplit une fois, choisit son canal ; le message arrive tout prêt à la maison. */
(function(){
  const D = window.LECOQ, $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const dlg = $("#resa"); if (!dlg) return;
  const liste = D.maisons.filter(m => m.resa || m.whatsapp || m.mailResa || m.tel);
  const today = new Date(Date.now() - new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);

  $("#resa-liste").innerHTML = `
    <form id="resa-form" class="resa-form" novalidate>
      <fieldset class="maisons-choix"><legend class="label">Où ?</legend>
        ${liste.map((m,i)=>`<label class="mchoix"><input type="radio" name="maison" value="${m.id}" ${i===0?"checked":""}>
          <span style="--f:${m.fond};--t:${m.texte}">${m.logo?`<img src="assets/logos/${m.logo}" alt="">`:`<b>${esc(m.nom)}</b>`}${m.logo?`<small>${esc(m.nom)}</small>`:""}</span></label>`).join("")}
      </fieldset>
      <div class="rgrid">
        <div class="champ"><label for="r-date">Date</label><input id="r-date" type="date" min="${today}" value="${today}" required></div>
        <div class="champ"><label for="r-heure">Heure</label><input id="r-heure" type="time" value="20:00" step="900" required></div>
        <div class="champ"><label for="r-pers">Personnes</label><input id="r-pers" type="number" min="1" max="250" value="2" required inputmode="numeric"></div>
        <div class="champ"><label for="r-nom">Votre nom</label><input id="r-nom" autocomplete="name" required></div>
        <div class="champ"><label for="r-tel">Téléphone</label><input id="r-tel" type="tel" autocomplete="tel" required></div>
        <div class="champ"><label for="r-occ">Occasion</label><select id="r-occ"><option value="">—</option><option>Anniversaire</option><option>Repas d'affaires</option><option>Groupe / afterwork</option><option>Enfants à table</option></select></div>
        <div class="champ full"><label for="r-note">Un mot pour l'équipe</label><input id="r-note" placeholder="ex. en terrasse si possible, une chaise bébé"></div>
      </div>
      <p class="r-info" id="r-info"></p>
      <div class="r-actions" id="r-actions"></div>
    </form>`;

  const sel = () => liste.find(m => m.id === (dlg.querySelector('input[name=maison]:checked')||{}).value) || liste[0];
  function message(m){
    const d = $("#r-date").value ? new Date($("#r-date").value+"T12:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"}) : "";
    return `Bonjour ${m.nom}, je souhaite réserver une table pour ${$("#r-pers").value} personne${$("#r-pers").value>1?"s":""} le ${d} à ${$("#r-heure").value.replace(":","h")}.`
      + ($("#r-occ").value?`\nOccasion : ${$("#r-occ").value}.`:"") + ($("#r-note").value.trim()?`\n${$("#r-note").value.trim()}`:"")
      + `\n\n${$("#r-nom").value.trim()} · ${$("#r-tel").value.trim()}\n(demande envoyée depuis le site du Groupe Le Coq)`;
  }
  function render(){
    const m = sel(), n = +$("#r-pers").value || 0;
    const groupe = m.groupeDes && n >= m.groupeDes;
    $("#r-info").innerHTML = `<b>${esc(m.nom)}</b> · ${esc(m.horaires||"")}${groupe?`<br>Pour ${n} personnes, l'équipe vous rappelle pour vous proposer la formule groupe.`:""}`;
    const a = [];
    if (m.resa && !groupe) a.push(`<a class="btn" href="${esc(m.resa)}" target="_blank" rel="noopener">Réserver en ligne</a>`);
    if (m.whatsapp) a.push(`<button class="btn wa" type="button" data-canal="wa">${WA} Envoyer sur WhatsApp</button>`);
    if (m.mailResa) a.push(`<button class="btn clair" type="button" data-canal="mail">Envoyer par e-mail</button>`);
    if (m.tel) a.push(`<a class="btn clair" href="tel:${m.tel.replace(/\s/g,"")}">Appeler · ${esc(m.tel)}</a>`);
    $("#r-actions").innerHTML = a.join("");
  }
  const WA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3z"/></svg>';
  dlg.addEventListener("input", render); dlg.addEventListener("change", render);
  dlg.addEventListener("click", e => {
    const b = e.target.closest("[data-canal]"); if (!b) return;
    const miss = ["r-date","r-heure","r-pers","r-nom","r-tel"].find(id => !document.getElementById(id).value.trim());
    if (miss) { document.getElementById(miss).focus(); $("#r-info").innerHTML = "Merci de compléter la date, l'heure, le nombre de personnes, votre nom et votre téléphone."; return; }
    const m = sel(), txt = message(m);
    if (b.dataset.canal === "wa") window.open(`https://wa.me/${m.whatsapp}?text=${encodeURIComponent(txt)}`, "_blank", "noopener");
    else location.href = `mailto:${m.mailResa}?subject=${encodeURIComponent("Réservation " + m.nom + " – " + $("#r-nom").value.trim())}&body=${encodeURIComponent(txt)}`;
    $("#r-info").innerHTML = `Votre demande est prête dans ${b.dataset.canal==="wa"?"WhatsApp":"votre messagerie"} : il ne reste qu'à l'envoyer. L'équipe vous confirme la table par retour.`;
  });
  document.addEventListener("click", e => {
    const o = e.target.closest("[data-resa]");
    if (o) { if (o.dataset.resa) { const r = dlg.querySelector(`input[value="${o.dataset.resa}"]`); if (r) r.checked = true; } render(); dlg.showModal ? dlg.showModal() : dlg.setAttribute("open",""); }
    if (e.target.closest("[data-close]") || e.target === dlg) dlg.close ? dlg.close() : dlg.removeAttribute("open");
  });
  render();
})();
