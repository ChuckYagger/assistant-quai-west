# Assistant Quai West + Kormatek — V8 Piscine complète

Version corrigée avec design complet conservé et bloc piscine complet.

## Inclus

- Design complet de la version stable
- Étape 1 sans “Je ne sais pas”
- Fil d’Ariane
- Suppression de Béton dans les supports généraux
- Suppression de Mouler dans les objectifs généraux
- Peinture carrosserie limitée à Peindre / Finition esthétique
- Parcours moulage corrigé avec dimensions objet
- Recommandation RTV pour petits objets
- Bloc piscine complet : formes courantes + dimensions + surface fond/parois/marge
- Liste matériel piscine issue de la logique du fichier Excel fourni
- Prix estimé panier
- Netlify Forms avec champs complets

## Piscine

Le calcul reprend :
- surface = fond + parois + 8 % de marge
- résine polyester iso 172 = surface / 10 x 20 kg
- mat 300 = surface x 0,7 kg
- gelcoat Iso NPG = surface x 0,6 kg
- catalyseur = (résine + gelcoat) x 2 %
- styrène paraffiné = 2 L
- acétone = 24 L
- styrène monomère = surface / 10 L
- pâte pigmentaire blanc = surface / 10 kg


## V8.1 Piscine directe

- Parcours piscine direct : Projet → Forme du bassin → Dimensions → Résultat.
- Texte d’aide ajouté sous la question de forme du bassin.


## V9 - Niveau supprimé du parcours

- La question "Quel est votre niveau ?" est supprimée du diagnostic.
- Le niveau est maintenant optionnel dans le formulaire final.
- Ajout d’un bloc "Conseil Quai West" pour améliorer la conversion.
- Objectif : raccourcir le tunnel tout en gardant la segmentation lead.


## V10 - Tunnel optimisé bateau / surf / carrosserie

Optimisations :
- Bateau : suppression de la question "objectif", car l’utilisateur a déjà choisi réparation coque.
- Surf : suppression de la question "objectif" et du support général ; on garde uniquement le type de planche.
- Carrosserie : suppression de la question "objectif" et du support général ; on va directement vers la finition.
- Objectifs déduits automatiquement dans le résultat.
- Moins d’étapes, moins de friction, tunnel plus orienté conversion.
