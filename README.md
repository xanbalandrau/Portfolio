<div align="center">

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

</div>

<h2 align="center">
  Portfolio Website<br/>
  <a href="https://projet-portfolio-final.vercel.app/" target="_blank">Demo du projet ici</a>
</h2>
<div align="center">
  <img alt="Demo" src="./ressources/demo.png" />
</div>

## Description :

Vous allez concevoir une application **MERN** permettant aux utilisateurs de gérer et afficher leurs compétences via un portfolio dynamique. L'application devra être sécurisée, responsive (mobile-first) et conforme aux exigences RGPD avec un système de gestion des cookies (Tarteaucitron.js) et un Captcha (Google reCAPTCHA ou Tarteaucitron) pour sécuriser l’authentification.

Voici les [instruction](/ressources/Eval%20Backend.pdf) de l'évaluation.

## Table des matières

- [Description :](#description-)
- [Table des matières](#table-des-matières)
- [Features](#features)
- [Technologies:](#technologies)
- [Déploiement:](#déploiement)
- [Snapshot Mobile:](#snapshot-mobile)
  - [Dashboard Admin](#dashboard-admin)
- [Installation:](#installation)
  - [Procédure d'installation :](#procédure-dinstallation-)
  - [Installation et lancement du back-end :](#installation-et-lancement-du-back-end-)
  - [Installation et lancement du front-end :](#installation-et-lancement-du-front-end-)
- [Amélioration future](#amélioration-future)
- [Auteur:](#auteur)

## Features

- 🎨 **Interface moderne et responsive**
- 📱 **Interface mobile-first**
- 🔒 **Système d'authentification sécurisé**
- 📝 **Gestion des compétences et du profil**
- 📧 **Envoi d'e-mails automatisés**
- 🍪 **Gestion des cookies conforme au RGPD**
- 📊 **Journalisation des activités (logging)**
- ⚙️ **Paramètres personnalisables**
- 👩‍💻 **Tableau de bord administrateur**

## Technologies:

Ce projet a été construit avec les technologies suivantes :

[![My Skills](https://skillicons.dev/icons?i=vscode,npm,git,github,javascript,nodejs,express,mongodb,postman,vite,react,css,bootstrap,vercel)](https://skillicons.dev)

- nodejs et express pour le back
- vite + react pour le front

## Déploiement:

- [Vercel Front-End Deployment](https://projet-portfolio-final.vercel.app/)
- [Render Back-end Deployment](https://portfolio-ofmh.onrender.com)

## Snapshot Mobile:

### Dashboard Admin

<img src="./ressources/dashboard.png" width="250">

## Installation:

### Procédure d'installation :

Cloner le repository:

`git clone https://github.com/xanbalandrau/Portfolio.git`

### Installation et lancement du back-end :

1. Allez dans le dossier "backend"

- `cd backend `

2. Installez toutes les dépendances pour le back-end:

- `npm install`

3. Créez et configurez votre .env (pour plus de détails lire le readme du backend).

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

3. Créez et configurez votre .env (pour plus de détails lire le readme du client)

4. Lancer le front-end:

- `npm run dev`

Le front-end sera lancé à l'URL:
`http://localhost:5173`

## Amélioration future

- Ajout photo de profil pour l'utilisateur
- Ajout description (bio) de l'utilisateur
- ~~Ajout spinner pour la connexion et la création d'un compte~~
- ~~Configurer l'envoie de mail pour validation du user et reset password (pour l'instant en local avec mailtrap)~~
- Possibilité pour admin de voir les portfolio des users
- Pouvoir s'inscrire directement avec google ou github

## Auteur:

Xan Balandrau : [**GitHub**](https://github.com/xanbalandrau/)
