# Site du Groupe Le Coq

Site statique publié avec GitHub Pages.

- Contenu à modifier (horaires, offres d'emploi, réservations, réseaux, Octobre Rose…) : `assets/contenu.js`
- Cartes des maisons : `assets/cartes.js`
- Photos de la galerie : `assets/galerie.js`

Pour modifier : ouvrir le fichier sur GitHub › crayon « Edit » › « Commit changes ». Le site se met à jour en une minute.

## Audit d'octobre 2026

- Sécurité : politique CSP dans chaque page (aucun script en ligne), referrer strict, HTTPS forcé.
- SEO : balises canonical / Open Graph, données structurées (groupe + chaque maison), `sitemap.xml`, `robots.txt`, page `404.html`.
- Performance : photos et logos recompressés, dimensions d'images déclarées, scripts en `defer`.
- Octobre Rose se masque automatiquement après la date `jusquau` (contenu.js).
- Images de partage : `assets/og/`.
