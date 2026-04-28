# Assistant Projet Quai West + Kormatek V5

Version corrigée : build Next.js OK + formulaire Netlify robuste.

## Publication

1. Remplacer les fichiers dans GitHub
2. Commit changes
3. Dans Netlify : Deploys > Trigger deploy > Clear cache and deploy site
4. Tester le formulaire
5. Vérifier : Forms > diagnostic-quai-west > Submissions

## Important

Le formulaire statique de détection Netlify est dans `public/forms.html`.
Le formulaire visible envoie les données via `fetch("/forms.html")`.
