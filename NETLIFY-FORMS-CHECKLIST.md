# Checklist Netlify Forms

Si Netlify voit une soumission mais que le CSV est vide :

1. Vérifier que le dernier déploiement utilise bien cette version V4.
2. Ouvrir l’URL suivante dans le navigateur :
   `/forms.html`
   Elle doit afficher un formulaire HTML brut.
3. Dans Netlify > Forms, supprimer les anciens formulaires de test si nécessaire.
4. Redéployer le site avec "Clear cache and deploy site".
5. Faire un test depuis le vrai configurateur.
6. Vérifier : Netlify > Forms > diagnostic-quai-west > Submissions.
7. Pour les emails : Forms > Form notifications > Add notification > Email notification.

Dans cette V4 :
- le formulaire statique est dans `public/forms.html`
- le formulaire visible envoie vers `/forms.html`
- tous les champs sont sérialisés manuellement dans `handleLeadSubmit`
