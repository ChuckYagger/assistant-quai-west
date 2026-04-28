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
