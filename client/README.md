# Front-end

## Introduction

Voici le front-end d'un portfolio développé avec Vite et React.
Il permet de s'inscrire, de se connecter et de gérer un portfolio.

## Prérequis

- npm (gestionnaire de paquets)
- Connaissance React

## Dépendance installé

```json
"dependencies": {
    "axios": "^1.7.9",
    "bootstrap": "^5.3.3",
    "dotenv": "^16.4.7",
    "jwt-decode": "^4.0.0",
    "react": "^19.0.0",
    "react-bootstrap": "^2.10.9",
    "react-dom": "^19.0.0",
    "react-google-recaptcha": "^3.1.0",
    "react-hook-form": "^7.54.2",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.2.0",
    "react-tsparticles": "^2.12.2",
    "tarteaucitronjs": "^1.19.0",
    "tsparticles-slim": "^2.12.0"
  }
```

- **axios** : Utilisé pour effectuer des requêtes HTTP vers des API ou des serveurs.
- **bootstrap** : Framework CSS pour créer des interfaces utilisateur modernes et responsives.
- **dotenv** : Permet de charger les variables d'environnement à partir d'un fichier .env.
- **jwt-decode** : Décode les tokens JWT pour accéder aux informations utilisateur.
- **react** : Bibliothèque principale pour construire des interfaces utilisateur interactives.
- **react-bootstrap** : Intègre les composants Bootstrap dans des applications React.
- **react-dom** : Permet de rendre des composants React dans le DOM.
- **react-google-recaptcha** : Intègre Google reCAPTCHA pour protéger les formulaires contre les robots.
- **react-hook-form** : Simplifie la gestion des formulaires et la validation des données.
- **react-icons** : Fournit une collection d'icônes populaires pour les interfaces React.
- **react-router-dom** : Gère la navigation et le routage dans une application React.
- **react-tsparticles** : Ajoute des animations de particules interactives aux pages web.
- **tarteaucitronjs** : Outil de gestion des cookies conforme au RGPD.
- **tsparticles-slim** : Version légère de tsparticles pour les animations de particules

## Installation

1. Allez dans le dossier `client` si ce n'est pas déjà fait :

```bash
cd client
```

2. Installez les dépendances :

```bash
npm install
```

3. Créez puis configurez le fichier .env :

```ini
VITE_API_URL = <votre URL du backend>
VITE_RECAPTCHA_SITE_KEY = <votre clé public de reCAPTCHA>
```

4. Lancez le serveur:

`npm run dev`

L'application sera accessible à http://localhost:5173/ par défaut.

## Utilisation

Pour se connecter sur le dashboard :

```bash
email : admin@gmail.com
password : adminpassword
```

## Structure du projet

Ce projet suit une architecture modulaire et bien organisée en React, facilitant la scalabilité et la maintenance.

```ini
/frontend
│── /dist                           # Fichiers générés après le build
│── /node_modules                   # Dépendances installées
│── /public                         # Ressources statiques
│   ├── portfolio-design.png
│   ├── portfolio-dev.png
│   ├── portfolio-photographe.png
│   ├── portfolio-professionnel.png
|
│── /src                            # Dossier source principal
│   ├── /admin                      # Composants et pages admin
│   │   ├── Dashboard.jsx
|   |
│   ├── /assets                     # Images, gif et autres ressources
│   │   ├── moon-7946.gif
│   │   ├── stars-12673.gif
|   |
│   ├── /components                 # Composants réutilisables
│   │   ├── /card                   # Composants de cartes
│   |   │   ├── Skill.css
│   |   │   ├── SkillCards.jsx
│   |   │   ├── SkillCircle.jsx
│   │   ├── /partials               # Composants partiels (navbar, footer...)
│   |   │   ├── /footer
│   |   │   |   ├── Footer.css
│   |   │   |   ├── Footer.jsx
│   |   │   ├── /navbar
|   │   │       ├── Navbar.css
|   │   │       ├── Navbar.jsx
│   │   ├── /theme                  # Gestion des thèmes (sombre/clair)
│   |   │   ├── DarkTheme.jsx
│   |   │   ├── LightTheme.jsx
│   │   ├── CookiesButton.jsx
│   │   ├── logoutButton.jsx
│   │   ├── SettingsButton.jsx
|   |
│   ├── /context                    # Contexte global (ex: Authentification)
|   |   ├── AuthContext.jsx
|   |
│   ├── /hooks                      # Hooks personnalisés
|   |   ├── OngletTitle.js
|   |
│   ├── /pages                      # Pages principales de l'application
│   |   ├── /dashboardUser
│   |   │   ├── dashboardUser.jsx
│   |   ├── /forget-password
│   |   │   ├── Forgot.jsx
│   |   │   ├── Reset.jsx
│   |   ├── /home
│   |   │   ├── Home.css
│   |   │   ├── Home.jsx
│   |   ├── /login
│   |   │   ├── Login.css
│   |   │   ├── Login.jsx
│   |   ├── /portfolio
│   │   |   ├── Portfolio.css
│   │   |   ├── Portfolio.jsx
│   │   ├── /register
│   │       ├── Register.jsx
|   |
│   ├── /routes                      # Gestion des routes
│   │   ├── AdminProtectedRoutes.jsx
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoutes.jsx
|   |
│   ├── App.css
|   ├── App.jsx                     # Composant principal de l'application
│   ├── main.jsx                    # Point d'entrée de l'application
│   ├── variables.css
|
│── .env
│── .gitignore
│── eslint.config.js
│── index.html
│── package.json
│── README.md
│── vercel.json
│── vite.config.js

```

## Exemple d'appel API avec Axios

Voici comment effectuer un appel API avec axios pour récupérer des données utilisateur :

```bash
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/auth/`);
        console.log(response.data.users);
    } catch {
        console.error("Error fetching users:", error);
    }
};
```

## Développement

### Ajout d'un nouveau composant

1. Créer un fichier MonComposant.jsx dans /components.
2. Ajouter le code suivant :

```bash
import React from 'react';

const MonComposant = () => {
  return <div>Mon nouveau composant</div>;
};

export default MonComposant;
```

3.  L'importer dans une page ou un autre composant :

```bash
  import MonComposant from '../components/MonComposant';
```

### Gestion des Routes

- Les routes sont définies dans /routes/AppRoutes.jsx.
- Pour ajouter une nouvelle route, modifier ce fichier en ajoutant :

```bash
<Route path="/nouvelle-page" element={<NouvellePage />} />
```
