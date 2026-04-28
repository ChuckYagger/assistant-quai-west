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


## Version V6 - Prix estimé panier

Ajout d’un bloc "Prix estimé du panier" dans la page résultat.

Important :
- Les prix sont indicatifs.
- La grille est modifiable dans `app/page.js`, fonction `estimateBasket`.
- Les champs `prix_estime_min` et `prix_estime_max` sont transmis à Netlify Forms.


## V8 design OK
Cette version conserve le design complet de la V6 et ajoute :
- suppression "Je ne sais pas"
- fil d’Ariane
- suppression Béton et Mouler
- objectifs carrosserie limités
- parcours moulage corrigé avec dimensions + RTV
- bloc piscine liner vers stratification polyester
- calcul surface piscine fond + parois + marge 8 %
- prix estimé panier conservé
- Netlify Forms conservé
