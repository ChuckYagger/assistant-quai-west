# Assistant Projet Quai West + Kormatek Bois & Déco

Version Next.js prête pour Netlify.

## Ce que contient cette version

- Configurateur Quai West pour bateau, surf, moulage, carrosserie et stratification
- Parcours bois / terrasse orienté vers Kormatek Bois & Déco
- Liens Kormatek intégrés :
  - Demidekk Terrassfix
  - Treolje
  - Demidekk Cleantech
  - Protection du bois extérieur
- Calculs simples de quantité
- Formulaire Netlify Forms

## Installation locale

```bash
npm install
npm run dev
```

Puis ouvrir : http://localhost:3000

## Publication Netlify

1. Mettre le dossier sur GitHub
2. Netlify > Add new site > Import from GitHub
3. Build command : `npm run build`
4. Publish directory : `.next`
5. Deploy

## Modifier les liens produits

Ouvrir `app/page.js`, puis modifier l'objet `productLinks`.


## Correction Netlify Forms

Cette version force la détection du formulaire avec :

- `public/forms.html` : formulaire HTML statique détectable par Netlify
- `public/success.html` : page de confirmation après envoi
- formulaire React avec `method="POST"`, `data-netlify="true"`, `form-name` et `action="/success.html"`

Après déploiement, vérifier dans Netlify :
Site > Forms > diagnostic-quai-west


## Version V2 Kormatek

Modifications :
- Le parcours Kormatek ne pose plus la question générique "support principal".
- Le support est automatiquement considéré comme bois / sol / béton selon le choix Kormatek.
- Ajout de parcours :
  - Terrasse bois extérieure
  - Bardage / menuiserie / bois extérieur
  - Bois intérieur transparent / lasure
  - Peinture décorative intérieure murs/plafonds
  - Sol intérieur bois transparent / vernis
  - Sol intérieur opaque bois ou béton
  - Sol béton transparent / anti-poussière

Produits intégrés :
- Demidekk Terrassfix
- Treolje
- Demidekk Cleantech
- Panelakk
- Vegg & Tag 05
- Trestjerner Gulvlakk
- Trestjerner Betongolje
- Trestjerner Gulvmaling


## Version V3 - Correction envoi Netlify Forms

Cette version utilise un envoi AJAX en `application/x-www-form-urlencoded`, recommandé pour les formulaires React/Next.js avec Netlify Forms.

Le formulaire HTML statique reste dans `public/forms.html` pour la détection au build.
Le formulaire visible envoie maintenant les champs via `fetch("/")`.

Après déploiement :
1. Faire un hard refresh du site
2. Remplir un diagnostic
3. Envoyer le formulaire
4. Vérifier dans Netlify > Forms > diagnostic-quai-west > Submissions


## Version V4 - Correction CSV vide

Cette version corrige les CSV vides avec :
- envoi explicite vers `/forms.html`
- champs construits manuellement dans `handleLeadSubmit`
- tous les champs déclarés dans `public/forms.html`
- ajout des champs `quantites`, `panier_conseille`, `erreur_a_eviter`

Après remplacement sur GitHub :
1. Netlify > Deploys > Trigger deploy > Clear cache and deploy site
2. Tester une soumission
3. Vérifier Forms > diagnostic-quai-west > Submissions
