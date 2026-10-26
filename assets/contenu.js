/* =====================================================================
   CONTENU DU SITE GROUPE LE COQ
   C'est le seul fichier à modifier pour mettre le site à jour :
   nouvelles, offres d'emploi, horaires, réseaux, réservation, soirées.
   Sur GitHub : ouvrir ce fichier > crayon « Edit » > « Commit changes ».
   Les cartes sont dans assets/cartes.js.
   ===================================================================== */

window.LECOQ = {

  /* ---------- Réglages généraux ---------- */
  reglages: {
    instagramGroupe: "groupelecoq",          // sans @
    facebookPage: "",                        // ex. "https://www.facebook.com/groupelecoq" → active le fil Facebook
    beholdFeedId: "",                        // identifiant Behold.so (gratuit) → active le fil Instagram en direct
    formulaireCandidature: "",               // ex. "https://formspree.io/f/xxxx" → envoie les candidatures par e-mail
    mailRecrutement: "Romain.groupelecoq@gmail.com",
    mailPresse: "Romain.groupelecoq@gmail.com",
    mailEvenements: "contact@bistrotdesgirondins.com",
    telEvenements: "06 64 52 37 08",         // ligne événements du Bistrot des Girondins
    whatsappEvenements: "33664523708",
    whatsappGroupe: "33664523708",           // bouton WhatsApp flottant (à remplacer par le numéro du groupe si vous en avez un)
    inscriptionCasetta: "",                  // ex. "https://formspree.io/f/xxxx" ou un Google Form → reçoit les inscriptions avant-première
    mailInscription: "Romain.groupelecoq@gmail.com",
    espaceEquipes: "https://claude.ai/artifact/LAhdFkWzVTzcw32UwMQDd4#intranet"
  },

  /* ---------- Octobre Rose (la section se masque toute seule après la date « jusquau ») ---------- */
  octobreRose: {
    actif: true,
    jusquau: "2026-10-31",
    titre: "Le service change de couleur.",
    texte: "Tout le mois d'octobre, nos maisons s'habillent de rose. Cuisine, salle, bar : toute la brigade se mobilise pour parler dépistage du cancer du sein. En France, une femme sur huit sera concernée au cours de sa vie.",
    suite: "La suite arrive très vite : suivez-nous sur Instagram.",
    video: "octobre-rose.mp4", poster: "octobre-rose-poster.jpg",
    lien: "https://www.service-public.gouv.fr/particuliers/actualites/A15216?lang=fr"
  },

  /* ---------- Les maisons ----------
     cat : bouillon | fete | jardin | pub | traiteur  ·  logoClair : version du logo pour fond clair (bandeau)
     resa : lien de réservation en ligne (Vite Une Table…) · whatsapp : numéro au format 336XXXXXXXX
     mailResa : adresse qui reçoit les demandes par e-mail · groupeDes : à partir de combien on parle « groupe »
     carte : identifiant de la carte dans assets/cartes.js */
  maisons: [
    { id:"bal", video:"m-bal", nom:"Le Bal du Coq", logo:"bal.png", fond:"#F5DC78", texte:"#1B1416", accent:"#E0457B",
      cat:["fete"], type:"Bar dansant années 80", ville:"Bordeaux centre",
      accroche:"Le bar dansant où l'on ne se couche pas comme les poules.",
      texteLong:"Devanture jaune poussin, boules à facettes et tubes des années 80 à 2000. Le rez-de-chaussée avec DJ et comptoir, une salle privatisable à l'étage avec son bar.",
      adresse:"8 rue des Piliers de Tutelle, 33000 Bordeaux", tel:"05 57 60 34 04", mail:"lebal@groupelecoq.com",
      horaires:"Du mardi au samedi, 19 h – 2 h", photos:["bal-facade","bal-seanpaul-1","bal-bar"],
      instagram:"lebalducoq", resa:"https://app.viteunetable.com/fr/reservation/le-bal-du-coq/", whatsapp:"", mailResa:"lebal@groupelecoq.com", groupeDes:15, carte:"bal" },

    { id:"cotillons", video:"m-cotillons", nom:"Bouillon et Cotillons", logo:"", fond:"#5B1A2B", texte:"#F7E7C6", accent:"#E8B04A",
      cat:["bouillon","fete"], type:"Bouillon dansant", ville:"Bordeaux centre",
      accroche:"On dîne à l'étage, on danse en dessous.",
      texteLong:"Le bouillon festif de l'hypercentre, à l'étage du Bal : œufs mayo, cordon bleu maison, confit de canard, côte de bœuf à partager. Puis la piste au rez-de-chaussée.",
      adresse:"8 rue des Piliers de Tutelle (1er étage), 33000 Bordeaux", tel:"06 82 92 05 95", mail:"lebal@groupelecoq.com",
      horaires:"Mercredi et jeudi 19 h – 22 h · vendredi et samedi 19 h – 23 h", photos:["bal-salle","bal-carnaval-1"],
      instagram:"lebalducoq", resa:"https://app.viteunetable.com/fr/reservation/le-bal-du-coq/", whatsapp:"33682920595", mailResa:"lebal@groupelecoq.com", groupeDes:12, carte:"cotillons" },

    { id:"bebert", video:"m-bebert", nom:"Chez Bébert", logo:"bebert.png", fond:"#F4F1EC", texte:"#1E1A18", accent:"#D42C26",
      cat:["bouillon"], type:"Le bouillon des Capus", ville:"Bordeaux · Capucins",
      accroche:"L'esprit du marché, à table.",
      texteLong:"Au cœur des Capucins, le ventre de Bordeaux : œuf mayo, poireaux vinaigrette, plats mijotés et desserts maison, préparés chaque jour avec les produits du marché voisin.",
      adresse:"2 rue des Douves, 33000 Bordeaux", tel:"05 56 92 10 78", mail:"chezbebert@groupelecoq.com",
      horaires:"Midi du mercredi au dimanche · soir du jeudi au samedi", photos:[],
      instagram:"", post:"https://www.instagram.com/p/C2P13c8KFNM/", resa:"", whatsapp:"", mailResa:"chezbebert@groupelecoq.com", groupeDes:10, carte:"" },

    { id:"poupoule", video:"m-poupoule", nom:"Poupoule", logo:"poupoule.png", fond:"#1F5C4D", texte:"#FFF7EC", accent:"#E0762A",
      cat:["bouillon"], type:"Bouillon béglais", ville:"Bègles · Terres Neuves",
      accroche:"Cantine populaire, bonne franquette.",
      texteLong:"Tapisseries rétro, grandes tables en bois et terrasse au soleil, sur le parvis du tram Terres Neuves. Œuf mayo à 3,30 €, plats autour de 12 €, carte qui change avec les saisons.",
      adresse:"4 place des Terres Neuves, 33130 Bègles", tel:"07 78 80 93 82", mail:"",
      horaires:"Du lundi au vendredi, 10 h – 15 h et 19 h – 21 h 30", photos:["pou-vert","pou-1","pou-terrasse"],
      instagram:"", resa:"", whatsapp:"33778809382", mailResa:"", groupeDes:15, carte:"poupoule" },

    { id:"coqnsmash", nom:"Coq n' Smash", logo:"coqnsmash-blanc.png", logoClair:"coqnsmash.png", video:"coqnsmash-teaser", webm:false, fond:"#6E0815", texte:"#FFF5E6", accent:"#F2C230",
      cat:["pub","fete"], type:"Pub · burgers · bières", ville:"Villenave-d'Ornon · Courréjean",
      accroche:"Pub. Burger. Beers. Le nouveau pub du Groupe Le Coq.",
      texteLong:"Smash burgers, fish & chips, chicken wings et assiettes à partager, pintes au comptoir, baby-foot et billard. Ouverture le 1er novembre 2026, place de Courréjean.",
      adresse:"17 place de Courréjean, 33140 Villenave-d'Ornon", tel:"07 63 02 59 76", mail:"",
      horaires:"Ouverture le 1er novembre 2026", photos:[],
      instagram:"", resa:"", whatsapp:"33763025976", mailResa:"", groupeDes:12, carte:"coqnsmash", nouveau:"Ouverture · 01/11" },

    { id:"guinguette", video:"m-guinguette", nom:"La Guinguette du Coq", logo:"guinguette.png", fond:"#F6E3C6", texte:"#2B1A10", accent:"#F28C38",
      cat:["jardin","fete"], type:"Apéro, terrasse, pétanque", ville:"Villenave-d'Ornon · bourg",
      accroche:"Les guirlandes du vieux bourg.",
      texteLong:"Une salle aux murs de pierre et une grande terrasse cachée à l'arrière : verres, tapas, boulodrome. Menu du jour à 19 € les midis en semaine, barbecue et concerts aux beaux jours.",
      adresse:"71 av. du Maréchal de Lattre de Tassigny, 33140 Villenave-d'Ornon", tel:"06 15 75 51 48", mail:"contact@guinguette.com",
      horaires:"Ouverte toute l'année · midi tous les jours, soir du lundi au samedi", photos:["gdc-tablee","gdc-terrasse","gdc-bbq"],
      instagram:"laguinguetteducoq", resa:"https://app.viteunetable.com/fr/reservation/la-guinguette-du-coq/", whatsapp:"33615755148", mailResa:"contact@guinguette.com", groupeDes:15, carte:"guinguette" },

    { id:"bdg", video:"m-bdg", nom:"Le Bistrot des Girondins", logo:"bistrot-rond.png", fond:"#F96EA7", texte:"#190684", accent:"#190684",
      cat:["jardin"], type:"Chartreuse gourmande · événements", ville:"Mérignac · domaine de Rocquevielle",
      accroche:"Le déjeuner d'affaires a trouvé son jardin.",
      texteLong:"Formule du jour à 26 € dans l'ancien centre d'entraînement des Girondins, jardin de plus de 400 m² et pétanque. Séminaires, groupes et soirées privées toute l'année ; Galaswinda l'été.",
      adresse:"107 av. Marcel Dassault, 33700 Mérignac", tel:"05 56 34 18 75", mail:"contact@bistrotdesgirondins.com",
      horaires:"Déjeuner du lundi au vendredi · événements sur demande", photos:["bdg-facade","bdg-assiette-automne","bdg-jardin-bbq"],
      instagram:"", resa:"", whatsapp:"33664523708", mailResa:"contact@bistrotdesgirondins.com", groupeDes:12, carte:"bdg" },

    { id:"madame", video:"m-madame", nom:"Madame Le Coq", logo:"madame-comp.png", fond:"#FBE3EA", texte:"#2A1018", accent:"#E8457A",
      cat:["traiteur"], type:"Traiteur événementiel", ville:"Gironde, Dordogne, Landes",
      accroche:"Le service sur mesure, du brunch au mariage.",
      texteLong:"Mariages, séminaires, cocktails dînatoires, brunchs et chef à domicile. Ateliers bar à ceviche, découpe de jambon ou plancha. Chaque prestation est construite selon votre budget.",
      adresse:"Laboratoire à Mérignac", tel:"", mail:"",
      horaires:"Sur devis", photos:["mlc-buffet","bdg-pause"],
      instagram:"", resa:"", whatsapp:"", mailResa:"", carte:"" }
  ],

  /* ---------- Bientôt ---------- */
  bientot: [
    { id:"casetta", video:"", nom:"La Casetta du Coq", logo:"casetta-marine.png", logoBlanc:"casetta-blanc.png", quand:"Automne 2026", lieu:"69 av. du Maréchal de Lattre de Tassigny, Villenave-d'Ornon",
      texte:"Le kiosque à pizzas du groupe : panuozzo et pâtes le midi en semaine, pizzeria le soir du mardi au samedi. 100 % à emporter, commande à la borne.",
      photos:["casetta-devanture","casetta-panuozzo","casetta-truffa"], carte:"casetta" }
  ],

  /* ---------- Nouveautés (les plus récentes en premier) ---------- */
  nouveautes: [
    { date:"2026-10-01", titre:"Octobre Rose : le service change de couleur", texte:"Tout le mois d'octobre, nos maisons s'habillent de rose pour parler dépistage. La suite arrive très vite.", photo:"", logo:"lecoq-noir.png", fond:"#FF2E93", lien:"#octobre-rose", maison:"Tout le groupe" },
    { date:"2026-10-20", titre:"Coq n' Smash, le pub du groupe, ouvre le 1er novembre", texte:"Smash burgers, fish & chips, wings et pintes au comptoir, baby-foot et billard : rendez-vous place de Courréjean.", photo:"coqnsmash-teaser-poster", logo:"", fond:"#6E0815", lien:"cartes.html#coqnsmash", maison:"Coq n' Smash" },
    { date:"2026-10-15", titre:"La Casetta arrive à Villenave-d'Ornon", texte:"Panuozzo le midi, pizza napolitaine le soir, à emporter. La carte de lancement est en ligne.", photo:"casetta-panuozzo", lien:"cartes.html#casetta", maison:"La Casetta" },
    { date:"2026-10-01", titre:"Les cartes d'automne sont là", texte:"Parmentier de paleron au porto, souris d'agneau, rigatoni aux cèpes et foie gras : toutes les nouvelles cartes en ligne.", photo:"pou-3", lien:"cartes.html", maison:"Toutes les maisons" },
    { date:"2026-06-01", titre:"Galaswinda, saison 2", texte:"Le jardin du Bistrot des Girondins redevient guinguette : tapas, cocktails maison, concerts, DJ sets et pétanque.", photo:"gala-petanque", lien:"#evenements", maison:"Bistrot des Girondins" }
  ],

  /* ---------- Soirées de la Guinguette ----------
     rendezvous : les formats réguliers · retro : la rétrospective (photo, date, titre) */
  guinguette: {
    rendezvous: [
      { titre:"Les concerts de l'été", texte:"Groupes en live sur la terrasse, les soirs de fin de semaine aux beaux jours.", photo:"soiree-concerts" },
      { titre:"Les soirées barbecue", texte:"La côte de bœuf passe à la braise, on se retrouve en grandes tablées.", photo:"gdc-bbq-1" },
      { titre:"Le marché nocturne", texte:"Producteurs, verres et musique : la terrasse se transforme le temps d'une soirée.", photo:"soiree-marche-nocturne" }
    ],
    retro: [
      { photo:"gdc-bbq-2", date:"Mai 2026", titre:"Barbecue sous les guirlandes" },
      { photo:"gdc-deco-1", date:"Mai 2026", titre:"La terrasse en tenue d'été" },
      { photo:"gdc-bbq-3", date:"Mai 2026", titre:"Côte de bœuf à la braise" },
      { photo:"gdc-deco-2", date:"Mai 2026", titre:"Lampions et nappes à carreaux" },
      { photo:"gdc-tablee", date:"2026", titre:"Les grandes tablées" },
      { photo:"gdc-vichy", date:"2026", titre:"Vichy et apéro" }
    ],
    note:"Programme des soirées à thème annoncé chaque semaine sur Instagram @laguinguetteducoq."
  },

  /* ---------- Soirées du Bal (rétrospective) ---------- */
  bal: {
    formats: ["soiree-classico","soiree-sacree-soiree","soiree-megamix"],
    retro: [
      { photo:"bal-seanpaul-2", date:"Mai 2026", titre:"Soirée Sean Paul" },
      { photo:"bal-carnaval-2", date:"Mars 2026", titre:"Carnaval" },
      { photo:"bal-seanpaul-3", date:"Mai 2026", titre:"Dancefloor plein" },
      { photo:"bal-carnaval-3", date:"Mars 2026", titre:"Paillettes et confettis" }
    ]
  },

  /* ---------- Événements au Bistrot des Girondins ---------- */
  evenements: {
    formats: [
      { titre:"Séminaire & journée d'étude", texte:"Salle dans la chartreuse, pauses et déjeuner au jardin, à quelques minutes de l'aéroport." },
      { titre:"Déjeuner d'affaires & groupes", texte:"Formule du jour à 26 €, tables réservées pour vos équipes et vos clients." },
      { titre:"Soirée d'entreprise", texte:"Cocktail dînatoire, DJ ou concert, pétanque et fléchettes dans le jardin." },
      { titre:"Anniversaire, mariage, fête de famille", texte:"La chartreuse et ses 400 m² de jardin privatisés, cuisine sur mesure." },
      { titre:"Galaswinda privatisée", texte:"L'été, la guinguette du jardin et ses 250 places pour vos grands événements." }
    ],
    photos:["bdg-jardin-bbq","mlc-buffet","bdg-tablee-tapas","bdg-pause"]
  },

  /* ---------- La brigade (sans noms, l'équipe au sens large) ---------- */
  brigade: {
    photos:["team-1","team-2","gdc-bar"],
    chiffres:[["45","personnes au service"],["8","maisons, une même brigade"],["7 j/7","du premier café au dernier slow"]],
    texte:"En cuisine, en salle, au bar, à la plonge et au pilotage : une brigade de choc qui passe d'une maison à l'autre, se dépanne et se forme ensemble. Un renfort qui manque à Bègles ? Il arrive de Villenave. Une table complète au Bal ? On vous attend à l'étage ou à la Guinguette."
  },

  /* ---------- Communication & marque ---------- */
  communication: {
    texte:"Une chargée de communication dédiée accompagne le développement de chaque marque, avec le studio Et Voilà! : identité visuelle, cartes de saison, shootings, réseaux sociaux et lancements d'ouvertures.",
    preuves:[["7 500+","abonnés gagnés par le Bal sans publicité payante"],["+80 %","au-dessus des objectifs du Bal la première année"],["10","identités de marque suivies, du logo à la carte"]],
    contact:"Partenariats, influence, collaborations : écrivez-nous."
  },

  /* ---------- Offres d'emploi (vide = seulement la candidature spontanée) ---------- */
  offres: [
    // { titre:"Chef de rang", maison:"guinguette", contrat:"CDI", heures:"39 h", debut:"Dès que possible", texte:"Service midi et soir, accueil des groupes…" }
  ],

  /* ---------- Revue de presse ---------- */
  presse: [
    { media:"Le Bonbon Bordeaux · TikTok", date:"2026", titre:"Poupoule, le bouillon qui fait le buzz", url:"https://www.tiktok.com/@le_bonbon_bordeaux/video/7586969399576366338" },
    { media:"Le Bonbon Bordeaux", date:"Juin 2025", titre:"Un bouillon festif et dansant en plein centre", url:"https://en.lebonbon.fr/bordeaux/stories/bouillon-cotillons-new-festive-dancing-restaurant" },
    { media:"Le Bonbon Bordeaux", date:"Juin 2025", titre:"Galaswinda, une guinguette festive dans un jardin", url:"https://en.lebonbon.fr/bordeaux/tops-spots/galaswinda-new-festive-guinguette-garden" },
    { media:"Le Bonbon Bordeaux", date:"Févr. 2025", titre:"Poupoule, un nouveau bouillon traditionnel français", url:"https://www.lebonbon.fr/bordeaux/actu/poupoule-nouveau-bouillon-traditionnel-francais-bordeaux/" },
    { media:"Les Pavés Bordelais", date:"Juil. 2024", titre:"Bal du Coq : danser comme en 1980 à Bordeaux" },
    { media:"Le Bonbon Bordeaux", date:"Juin 2024", titre:"Madame Le Coq, le traiteur qui cartonne", url:"https://en.lebonbon.fr/bordeaux/stories/madame-le-coq-creative-modern-caterer" },
    { media:"Petit Futé", date:"Guide 2026", titre:"Quatre adresses recommandées" }
  ]
};
