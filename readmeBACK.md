# API Backend - GIFT-SQUAD

### Présentation

Ce dépôt contient le serveur API de l'application Gift Squad. Il gère l'authentification des utilisateurs, les événements (Secret Santa, Anniversaire, Liste de Noël), les listes de cadeaux, les contributions financières, les invitations et les notifications push.

---

### Prérequis

Avant d'installer le backend, assurez-vous d'avoir :

- Node.js version 18 ou supérieure → nodejs.org
- npm (inclus avec Node.js)
- Un compte MongoDB Atlas → mongodb.com/atlas pour la base de données
- Un compte Cloudinary → cloudinary.com pour le stockage des images

---

### Installation

1. Cloner le dépôt :

```
git clone https://github.com/Reacteur-Giftsquad/Gift-squad-back
cd Gift-squad-back
```

2. Installer les dépendances :

```
npm install
```

3. Configurer les variables d'environnement :

   Créer un fichier `.env` à la racine (voir section Configuration)

4. Lancer le serveur :

```
node index.js
```

---

### Configuration

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```
PORT=3000
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

### Authentification

L'authentification utilise un système de token généré à l'inscription (via `uid2`). Le token est retourné lors du signup et du login. Il est stocké côté client et utilisé pour identifier l'utilisateur.

Les mots de passe sont hashés avec `crypto` (SHA256 + salt).

---

### Notifications push

Le backend envoie des notifications push via l'API Expo Push (`https://exp.host/--/api/v2/push/send`). Quand un utilisateur accepte une invitation, une notification est envoyée à l'organisateur. Le push token est enregistré sur le profil utilisateur via `PUT /user/modify/:id`.

---

### Routes disponibles

#### User

| Méthode | Route             | Description                            |
| ------- | ----------------- | -------------------------------------- |
| POST    | /user/signup      | Inscription (retourne token + user)    |
| POST    | /user/login       | Connexion (retourne token + user)      |
| GET     | /user/:id         | Récupérer un utilisateur               |
| PUT     | /user/modify/:id  | Modifier un utilisateur (ou pushToken) |

**Exemple POST /user/signup :**

Request body :
```json
{
  "firstname": "Armand",
  "lastname": "Bireaud",
  "pseudo": "Prodigy75",
  "email": "armand@example.com",
  "password": "motdepasse"
}
```

Response :
```json
{
  "data": {
    "token": "abc123...",
    "user": {
      "_id": "69cd12df...",
      "firstname": "Armand",
      "pseudo": "Prodigy75",
      "email": "armand@example.com"
    }
  }
}
```

#### Event

| Méthode | Route                              | Description                                        |
| ------- | ---------------------------------- | -------------------------------------------------- |
| POST    | /events/create                     | Créer un événement                                 |
| PUT     | /events/modify/:id                 | Modifier un événement                              |
| GET     | /events                            | Récupérer les événements d'un user (query: userId) |
| GET     | /events/:id                        | Récupérer un événement par ID                      |
| DELETE  | /events/:id                        | Supprimer un événement                             |
| POST    | /events/draw/:id                   | Effectuer le tirage Secret Santa                   |
| DELETE  | /events/:id/remove-user/:userId    | Retirer un participant                             |

#### Gift

| Méthode | Route                   | Description                            |
| ------- | ----------------------- | -------------------------------------- |
| POST    | /gift/create            | Créer un cadeau (multipart/form-data)  |
| PUT     | /gift/modify/:id        | Modifier un cadeau (multipart/form-data) |
| GET     | /gift/:id               | Récupérer un cadeau par ID             |
| GET     | /gift/                  | Récupérer tous les cadeaux             |
| GET     | /gift/event/:eventId    | Récupérer les cadeaux d'un événement   |
| DELETE  | /gift/:id               | Supprimer un cadeau                    |
| POST    | /gift/:id/reserve       | Réserver un cadeau                     |
| POST    | /gift/:id/unreserve     | Annuler la réservation                 |

#### Invitation

| Méthode | Route                      | Description                          |
| ------- | -------------------------- | ------------------------------------ |
| POST    | /invitation/send           | Envoyer une invitation               |
| GET     | /invitation/:userId        | Récupérer les invitations d'un user  |
| POST    | /invitation/:id/accept     | Accepter une invitation              |
| POST    | /invitation/:id/refuse     | Refuser une invitation               |

#### Contribution

| Méthode | Route                          | Description                            |
| ------- | ------------------------------ | -------------------------------------- |
| POST    | /contribution/create           | Créer une contribution                 |
| GET     | /contribution/event/:eventId   | Récupérer les contributions d'un event |

---

### Stack technique

- Node.js / Express
- MongoDB / Mongoose
- Cloudinary (stockage images)
- Expo Push API (notifications)

---

### Support

Pour toute question technique, contacter l'équipe de développement
