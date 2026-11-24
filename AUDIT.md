# Audit du portfolio

Date : 5 octobre 2026

## État de livraison

- Architecture React/Vite/TypeScript : prête.
- Navigation multi-pages : prête, avec transitions animées.
- Contenu : centralisé dans `src/content/portfolio.ts`.
- Version mobile : mise en page adaptative prévue pour les petits écrans.
- Production : la commande `npm.cmd run build` doit rester verte avant toute mise en ligne.

## Points forts

- **Éditable sans développement** : les informations personnelles, projets, aptitudes, ambitions et parcours sont regroupés dans un seul fichier documenté.
- **Accueil concentré** : l’accueil n’est pas une page interminable ; il sert d’entrée visuelle, puis dirige vers les vraies pages de contenu.
- **Univers cohérent** : navigation flottante, sphère orbitale, maillage spatial et lumière bleue relient les pages entre elles.
- **Performance raisonnable** : pas de vidéo de fond ou de canvas lourd dans cette nouvelle interface. Les images chargées depuis des URL doivent être remplacées par des médias optimisés avant publication.

## À faire avant publication

1. Remplacer les données d’exemple dans `src/content/portfolio.ts` (notamment l’e-mail, les liens sociaux et les entrées « À personnaliser »).
2. Remplacer les quatre images Unsplash d’exemple par tes visuels dans `public/media/`.
3. Ajouter des textes alternatifs descriptifs aux images de projets si tu souhaites un niveau d’accessibilité maximal.
4. Installer une solution d’analytique respectueuse de la vie privée uniquement si elle est réellement utile.
5. Déployer sur Vercel, Netlify ou GitHub Pages avec une règle de réécriture vers `index.html` pour que les routes `/projets`, `/profil` et `/parcours` fonctionnent au rechargement.

## Risques et recommandations

- Les URL d’images externes sont pratiques pour la maquette mais dépendent d’un service tiers. Préfère tes fichiers locaux lors de la mise en ligne.
- Les liens de démonstration actuellement vides dans les projets ramènent vers la page courante. Renseigne `url` pour chaque projet publié.
- L’e-mail affiché est un placeholder : ne publie pas le site avant de le remplacer.
- Les animations respectent les interactions courantes, mais une phase de test manuel sur Safari mobile et Firefox reste recommandée avant la publication.
