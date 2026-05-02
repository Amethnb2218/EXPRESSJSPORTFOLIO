# EXPRESSJS PORTFOLIO

API REST de gestion de projets de portfolio avec Express JS et MongoDB.

## Installation

```bash
npm install
```

## Configuration

Creer un fichier `.env` a la racine du projet :

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expressjs_portfolio
USE_MEMORY_DB=false
```

Si MongoDB n'est pas installe localement, utiliser le mode demo :

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expressjs_portfolio
USE_MEMORY_DB=true
```

Avec `USE_MEMORY_DB=true`, l'API lance une base MongoDB temporaire en memoire. Les donnees sont supprimees quand le serveur s'arrete.

## Lancement

```bash
npm run dev
```

ou :

```bash
npm start
```

Le serveur demarre sur `http://localhost:5000`.
Le frontend React `reactportfolio` utilise le proxy Vite `/api` pour appeler ce backend.

## Routes

| Methode | Route | Description |
| --- | --- | --- |
| POST | `/api/projects` | Ajouter un projet |
| GET | `/api/projects` | Retourner tous les projets |
| GET | `/api/projects/:id` | Retourner les informations d'un projet |
| PUT | `/api/projects/:id` | Modifier un projet |
| DELETE | `/api/projects/:id` | Supprimer un projet |

## Exemple de body JSON

```json
{
  "libelle": "Jolofera - Plateforme SaaS Reservation & E-commerce",
  "image": "https://example.com/image.jpg",
  "categorie": "SaaS",
  "periode": "2024 - Present",
  "statut": "En production",
  "role": "Fondateur & Developpeur Full Stack",
  "lien": "https://jolofera.com",
  "technologies": ["React", "Node.js", "Express.js", "MongoDB"],
  "description": "Plateforme SaaS de reservation et e-commerce."
}
```
