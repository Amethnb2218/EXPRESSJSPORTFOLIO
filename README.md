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
MONGO_URI=mongodb+srv://UTILISATEUR:MOT_DE_PASSE@CLUSTER.mongodb.net/expressjs_portfolio?retryWrites=true&w=majority&authSource=admin&appName=EXPRESSJSPORTFOLIO
USE_MEMORY_DB=false
MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1
```

### Configuration MongoDB Atlas

1. Creer un cluster sur MongoDB Atlas.
2. Dans `Database Access`, creer un utilisateur avec un mot de passe.
3. Dans `Network Access`, autoriser votre adresse IP.
4. Dans `Connect`, choisir le driver Node.js et copier la chaine `mongodb+srv://...`.
5. Coller cette chaine dans `MONGO_URI` du fichier `.env`.
6. Garder `USE_MEMORY_DB=false` pour utiliser Atlas.

Si le mot de passe contient des caracteres speciaux, il doit etre encode dans l'URL.
`authSource=admin` indique a MongoDB Atlas ou verifier l'utilisateur de connexion.
`MONGODB_DNS_SERVERS` force Node.js a utiliser des DNS publics si la resolution `mongodb+srv` echoue avec `querySrv ECONNREFUSED`.

Pour garder une demo locale sans Atlas, utiliser :

```env
PORT=5000
MONGO_URI=mongodb+srv://UTILISATEUR:MOT_DE_PASSE@CLUSTER.mongodb.net/expressjs_portfolio?retryWrites=true&w=majority&authSource=admin&appName=EXPRESSJSPORTFOLIO
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
