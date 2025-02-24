<div align="center">

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

</div>

<h2 align="center">
  Portfolio Website<br/>
  <a href="" target="_blank">Demo here</a>
</h2>
<div align="center">
  <img alt="Demo" src="" />
</div>

## Description :

Vous allez concevoir une application **MERN** permettant aux utilisateurs de gérer et afficher leurs compétences via un portfolio dynamique. L'application devra être sécurisée, responsive (mobile-first) et conforme aux exigences RGPD avec un système de gestion des cookies (Tarteaucitron.js) et un Captcha (Google reCAPTCHA ou Tarteaucitron) pour sécuriser l’authentification.

## Table des matières

- [Description :](#description-)
- [Table des matières](#table-des-matières)
- [Features](#features)
- [Technologies:](#technologies)
- [Déploiement:](#déploiement)
- [Snapshot:](#snapshot)
  - [Mobile](#mobile)
  - [Dashboard Admin](#dashboard-admin)
- [Installation:](#installation)
  - [Procédure d'installation :](#procédure-dinstallation-)
  - [Installation et lancement du back-end :](#installation-et-lancement-du-back-end-)
  - [Installation et lancement du front-end :](#installation-et-lancement-du-front-end-)
- [Amélioration future](#amélioration-future)
- [Auteur:](#auteur)

## Features

- 🎨 **Interface moderne et responsive**
  Design élégant et adaptatif, avec support des thèmes sombre et clair pour une expérience utilisateur personnalisée.
- 🔒 **Système d'authentification sécurisé**
  Connexion et inscription sécurisées avec hachage de mot de passe (bcrypt) et tokens JWT pour une protection optimale des données utilisateurs.
- 👩‍💻 **Tableau de bord administrateur**
  Gestion centralisée des utilisateurs, des compétences (skills) et des paramètres de l'application pour les administrateurs.
- 📱 **Interface mobile-friendly**
  Une expérience utilisateur optimisée pour les appareils mobiles, avec un design fluide et intuitif.
- 🔄 **Chargement dynamique du contenu**
  Affichage fluide des données grâce à des requêtes asynchrones et une mise à jour dynamique de l'interface.
- 📝 **Gestion des compétences et du profil**
  Ajout, modification et suppression des compétences (skills) par les utilisateurs, avec validation et notation optionnelles.
- 📧 **Envoi d'e-mails automatisés**
  Fonctionnalités d'envoi d'e-mails pour la vérification de compte, la réinitialisation de mot de passe et les notifications.
- 🍪 **Gestion des cookies conforme au RGPD**
  Intégration de tarteaucitron.js pour une gestion transparente et conforme des cookies.
- 📊 **Journalisation des activités (logging)**
  Utilisation de Winston pour enregistrer les logs d'activité et les erreurs, facilitant le débogage et la maintenance.
- ⚙️ **Paramètres personnalisables**
  Options pour personnaliser le thème, la forme des compétences (skills) et d'autres préférences utilisateur.

## Technologies:

Ce projet a été construit avec les technologies suivantes :

[![My Skills](https://skillicons.dev/icons?i=vscode,npm,git,github,javascript,nodejs,express,mongodb,postman,vite,react,css,bootstrap,vercel)](https://skillicons.dev)

- nodejs et express pour le back
- vite + react pour le front

## Déploiement:

- [Vercel Front-End Deployment]()
- [Render Back-end Deployment]()

## Snapshot:

### Mobile

<img src="" width="1200">

### Dashboard Admin

![Dashboard]()

## Installation:

### Procédure d'installation :

Cloner le repository:

`git clone https://github.com/xanbalandrau/Portfolio.git`

### Installation et lancement du back-end :

1. Allez dans le dossier "backend"

- `cd backend `

2. Installez toutes les dépendances pour le back-end:

- `npm install`

3. Créez et configurez votre .env (pour plus de détails lire le readme.md du backend)

4. Lancez le back-end :

- `npm start`
- `npm run dev` pour les développeurs

Le back-end sera lancé à l'URL:
`http://localhost:5000`

### Installation et lancement du front-end :

1. Aller dans le dossier "client"

- `cd client`

1. Installer toutes les dépendances pour le front-end:

- `npm install`

3. Créez et configurez votre .env (pour plus de détails lire le readme.md du client)

4. Lancer le front-end:

- `npm start`

Le front-end sera lancé à l'URL:
`http://localhost:5173`

## Amélioration future

- Ajout photo de profil pour l'utilisateur
- Ajout description (bio) de l'utilisateur

## Auteur:

Xan Balandrau : [**GitHub**](https://github.com/xanbalandrau/)
