# Back-end

## Introduction

Voici le back-end d'un portfolio développée avec Node.js et MongoDB.
Il permet de gérer les utilisateurs, leurs compétences et leurs paramètres.

## Prérequis

- Node.js installé
- npm (gestionnaire de paquets)
- MongoDb (Une base de données configurée)
- Cloudinary (Avoir un compte pour récuperer l'API)
- Un compte email (j'ai utilisé Mailtrap pour les tests)

## Dépendance installé

```
"dependencies": {
        "axios": "^1.7.9",
        "bcrypt": "^5.1.1",
        "cloudinary": "^2.5.1",
        "cors": "^2.8.5",
        "dotenv": "^16.4.7",
        "express": "^4.21.2",
        "express-async-handler": "^1.2.0",
        "fs": "^0.0.1-security",
        "gitignore": "^0.7.0",
        "helmet": "^8.0.0",
        "joi": "^17.13.3",
        "jsonwebtoken": "^9.0.2",
        "mongoose": "^8.10.1",
        "morgan": "^1.10.0",
        "multer": "^1.4.5-lts.1",
        "nodemailer": "^6.10.0",
        "nodemon": "^3.1.9",
        "winston": "^3.17.0"
      }
```

- **axios** : Bibliothèque pour effectuer des requêtes HTTP vers des APIs externes ou internes.
- **bcrypt** : Utilisé pour le hachage sécurisé des mots de passe.
- **cloudinary** : Service de gestion des médias (images, vidéos) dans le cloud, permet de stocker, manipuler et diffuser des fichiers multimédias.
- **cors** : Middleware pour gérer les requêtes cross-origin (CORS), permettant à un serveur d'accepter des requêtes provenant de domaines différents.
- **dotenv** : Charge les variables d'environnement à partir d'un fichier .env, utile pour la configuration sécurisée de l'application.
- **express** : Framework pour construire des applications web et des APIs en Node.js.
- **express-async-handler** : Simplifie la gestion des erreurs dans les routes asynchrones avec Express.
- **fs** : Module natif de Node.js pour interagir avec le système de fichiers (lecture, écriture, etc.).
- **gitignore** : Utilitaire pour générer des fichiers .gitignore afin d'exclure certains fichiers du contrôle de version Git.
- **helmet** : Middleware pour sécuriser les applications Express en définissant divers en-têtes HTTP.
- **joi** : Bibliothèque de validation des données, souvent utilisée pour valider les entrées utilisateur.
- **jsonwebtoken** : Utilisé pour créer et vérifier des tokens JWT (JSON Web Tokens), souvent pour l'authentification.
- **mongoose** : Bibliothèque pour modéliser les objets MongoDB et interagir avec la base de données.
- **morgan** : Middleware de logging pour Express, enregistre les requêtes HTTP pour le débogage.
- **multer** : Middleware pour gérer le téléversement (upload) de fichiers dans les applications Express.
- **nodemailer** : Bibliothèque pour envoyer des emails depuis une application Node.js.
- **nodemon** : Outil pour redémarrer automatiquement l'application Node.js lors de la modification des fichiers, utile en développement.
- **winston** : Bibliothèque de logging flexible pour Node.js, permet de gérer les logs de manière structurée.

## Installation

1. Allez dans le dossier backend si ce n'est pas déjà fait :

```bash
cd backend
```

2. Installez les dépendances :

```bash
npm install
```

3. Créez puis configurez le fichier .env :

```ini
PORT = 5000
MONGO_URI = <votre URI de connexion MongoDB>
CLOUD_NAME = <votre nom de compte Cloudinary>
API_KEY = <votre clé API Cloudinary>
API_SECRET = <votre clé secrète API Cloudinary>
JWT_SECRET = <votre clé secrète pour JWT>
API_URL = <votre URL du backend>
RECAPTCHA_SECRET_KEY = <votre clé secrète reCAPTCHA>
EMAIL_HOST= <votre service SMTP>
EMAIL_USER= <votre adresse e-mail>
EMAIL_PASS= <mot de passe d'application ou mot de passe SMTP>
EMAIL_PORT= <465 pour SSL ou 587 pour TLS par exemple>
```

4. Lancez le serveur:

```bash
npm start
```

Pour lancer en mode développement :

```bash
npm run dev
```

## Utilisation

Pour se connecter en tant que admin :

```bash
    email : admin@gmail.com,
    password : adminpassword
```

Exemple de requête (dans le terminal) pour se connecter :

```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: applicat
ion/json" -d '{"email": "admin@gmail.com", "password": "adminpassword"}'
```

Réponse attendue :

```json
{
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "_id": "67b89e0eebbbf9d655d648dd",
    "name": "admin",
    "email": "admin@gmail.com",
    "password": "$2b$10$hPCs9CwBH6wTW.yCNRSZeO9SlzYzahs5GURY7RnsB7VugasV/UMtW",
    "role": "admin",
    "skill": ["67b89e2debbbf9d655d648e2"],
    "createdAt": "2025-02-21T15:38:54.164Z",
    "updatedAt": "2025-02-21T15:39:25.271Z",
    "__v": 0
  }
}
```

## Structure du projet

```
.
├── node_modules                    # Dépendances installées par npm
├── uploads                         # Dossier pour stocker les fichiers téléchargés
├── logs                            # Dossier pour les logs
│   ├── all.log                     # Log principal
|
├── src/
│   ├── config/                     # Configuration des services externes (DB, Cloud, etc.)
│   │   ├── db.js                   # Configuration de la base de données MongoDB
│   │   ├── logger.js               # Configuration du logger (Winston ou autre)
│   ├── controllers/                # Contrôleurs pour gérer la logique métier
│   │   ├── auth.controller.js      # Gestion de l'authentification (inscription, login)
│   │   ├── setting.controller.js   # Logique de gestion des paramètres
│   │   ├── skill.controller.js     # Logique de gestion des compétences
│   ├── middleware/                 # Middlewares pour diverses fonctionnalités
│   │   ├── authMiddleware.js       # Vérifie si l'utilisateur est authentifié
│   │   ├── errorHandler.js         # Gestion des erreurs globales
│   │   ├── morganMiddleware.js     # Logger des requêtes HTTP avec Morgan
│   │   ├── recaptchaMiddleware.js  # Vérifie la validité du reCAPTCHA
│   │   ├── tokenGenerator.js       # Génère un token d'authentification
│   ├── models/                     # Modèles Mongoose représentant les entités de la base de données
│   │   ├── Setting.js              # Modèle pour les paramètres de l'application
│   │   ├── Skills.js               # Modèle pour les compétences
│   │   ├── Users.js                # Modèle pour les utilisateurs
│   ├── routes/                     # Routes pour accéder aux différents services de l'API
│   │   ├── auth.routes.js          # Routes d'authentification (login, register)
│   │   ├── setting.routes.js       # Routes pour la gestion des paramètres
│   │   ├── skill.routes.js         # Routes pour la gestion des skills
│   ├── services/                   # Service qui utilise des services externe
│   │   ├── emailService.js         # Service pour l'envoi d'e-mails
│   ├── validations/                # Fichiers de validation des entrées de l'utilisateur
│   │   ├── authValidation.js       # Validation des données d'authentification
│   │   ├── skillValidation.js      # Validation des données pour les compétences
│   ├── .env                        # Variables d'environnement
│   ├── .gitignore                  # Fichiers à ignorer par git
│   ├── package.json                # Dépendances et configuration du projet
│   ├── README.md                   # Documentation du projet
│   ├── server.js                   # Point d'entrée principal du serveur
```

## API Endpoints

| Méthode    | Endpoint                          | Login | Admin | Description                              |
| ---------- | --------------------------------- | ----- | ----- | ---------------------------------------- |
| **GET**    | `/api/auth/`                      | ✅    | ✅    | Liste des utilisateurs                   |
| **GET**    | `/api/auth/:id`                   | ✅    | ❌    | Afficher skill d'un utilisateur          |
| **GET**    | `/api/auth//verify/:token`        | ❌    | ❌    | Envoie un email de vérification          |
| **POST**   | `/api/auth/register`              | ❌    | ❌    | Créer un utilisateur                     |
| **POST**   | `/api/auth/login`                 | ❌    | ❌    | Se connecter                             |
| **POST**   | `/api/auth/logout`                | ✅    | ❌    | Se déconnecter                           |
| **POST**   | `/api/auth/forgot-password`       | ❌    | ❌    | Envoie email pour reset son mot de passe |
| **POST**   | `/api/auth/reset-password/:token` | ❌    | ❌    | Mettre à jour son mot de passe           |
| **DELETE** | `/api/auth/:id`                   | ✅    | ✅    | Supprimer un utilisateur                 |
| **POST**   | `/api/skill/addSkill`             | ✅    | ❌    | Ajouter un skill à l'utilisateur         |
| **PUT**    | `/api/skill/:id`                  | ✅    | ❌    | Mettre à jour un skill                   |
| **DELETE** | `/api/skill/:id`                  | ✅    | ❌    | Supprimer un skill                       |
| **GET**    | `/api/setting/`                   | ✅    | ❌    | Liste du setting utilisateur             |
| **PUT**    | `/api/setting/theme`              | ✅    | ❌    | Mettre à jour le thème                   |
| **PUT**    | `/api/setting/skill`              | ✅    | ❌    | Mettre à jour le la forme des skills     |

Voir [Postman collection](https://documenter.getpostman.com/view/42547154/2sAYdcqruV) sur le navigateur.

## Sécurité

### Validation de l'email:

Utilisation de nodemailer pour la vérification de l'utilisateur. Un token est généré puis envoyé par email lors de l'inscription. En cliquant sur le lien, l'utilisteur sera vérifié. Ansi, 'isVerified'(dans le model User) passera en true.

### Authentification:

Utilisation de JWT pour l'authentification. Un token est généré lors de la connexion et est inclus dans le header de la requetes.

### Autorisation:

Certaines routes sont réservées aux utilisateurs ou aux administrateurs. Le middleware `authMiddleware.js` vérifie le rôle de l'utilisateur avant d'autoriser l'accès.

### reCAPTCHA:

Intégration de reCAPTCHA pour prévenir les bots.

## Auteur:

Xan Balandrau : [**GitHub**](https://github.com/xanbalandrau/)
