# Portfolio futuriste — guide rapide

Ce projet est un portfolio React/Vite multi-pages. L’accueil est volontairement court et immersif ; les contenus importants ont leur propre page : **Projets**, **Profil**, **Parcours** et **Contact**.

## Lancer le front

```powershell
npm.cmd install
npm.cmd run dev
```

La commande ouvre automatiquement le navigateur sur `http://127.0.0.1:5173`.

Pour générer la version de production :

```powershell
npm.cmd run build
```

## Où renseigner tes informations

Tout le contenu éditable est dans [src/content/portfolio.ts](src/content/portfolio.ts) :

- `profile` : nom, adresse e-mail, ville, réseaux, phrase d’accroche et rôles animés ;
- `projects` : titre, année, domaine, description, image et lien de chaque projet ;
- `skills` : aptitudes, niveau et jauge (score de 0 à 100) ;
- `ambitions` : vision et objectifs ;
- `journey` : parcours, formations, expériences et mots-clés.

Les valeurs actuelles sont des exemples. Remplace-les simplement, sans toucher au reste du code.

## Ajouter tes images

1. Dépose tes fichiers dans `public/media/`.
2. Dans `src/content/portfolio.ts`, indique le chemin : `image: '/media/nom-de-ton-image.jpg'`.
3. Utilise des images larges et optimisées (WebP recommandé, idéalement moins de 500 Ko).

## Pages

| URL | Contenu |
| --- | --- |
| `/` | Accueil immersif + navigation vers les pôles du portfolio |
| `/projets` | Grille de projets et études de cas |
| `/profil` | Présentation, aptitudes et ambitions |
| `/parcours` | Chronologie de ton parcours |
| `/contact` | E-mail et réseaux sociaux |

## Personnalisation visuelle

Le style futuriste est regroupé dans [src/enhanced.css](src/enhanced.css). Les variables principales sont en haut du fichier (`--ink`, `--electric`, `--cyan`). Tu peux y changer l’univers colorimétrique sans modifier les composants.
