# Rapport de Projet

## Choix techniques : Explication des technologies utilisées et pourquoi

### Technologies Utilisées

- **Backend** : Node.js avec Express.js
  - Framework léger et rapide pour développer une API REST.
  - Middleware facile à configurer.
  - JWT pour l'authentification.
- **Base de données** : MongoDB avec Mongoose
  - Stockage NoSQL flexible.
  - Schéma de données adaptable aux besoins de l'application.
- **Frontend** : React avec Vite
  - Performances accrues avec Vite pour le développement.
  - Gestion efficace de l'état avec React Context et useState.
- **Stockage Cloud** : Cloudinary
  - Gestion d'images simplifiée avec API.
  - Optimisation automatique des images pour de meilleures performances.
- **Déploiemen**t : Render (Backend) & Vercel (Frontend)
  - Solutions gratuites et optimisées pour Node.js et React.
- **Sécurité** : JWT, bcrypt, reCAPTCHA
  - JWT pour la gestion sécurisée des sessions utilisateur.
  - bcrypt pour le hashage des mots de passe.
  - reCAPTCHA pour prévenir les attaques automatisées.

## Erreur :

### Table des erreurs :

<ul>
<li><a href = "#0" style="text-decoration:none">Erreur Postman pour l'authMiddleware.js du Backend</a></li>
<li><a href = "#1" style="text-decoration:none">Erreur de Déploiement sur Render:</a></li>
<li><a href = "#2" style="text-decoration:none">Erreur d'Authentification Admin pour React</a></li>
<li><a href = "#3" style="text-decoration:none">Erreur d'Affichage des Skills après Création sur le Dashboard React</a></li>
<li><a href = "#4" style="text-decoration:none">Erreur lors de la MAJ de la photo du skill</a></li>
<li><a href = "#5" style="text-decoration:none">Erreur de validation du token reCAPTCHA</a></li>
</ul>

<h2 id="0"> Erreur Postman pour l'authMiddleware.js du Backend</h2>

Lors de la comparaison du token avec le token secret, le test renvoyait false à cause d'un mauvais paramétrage de Postman.

**Solution** : Récupérer le token, puis dans l'onglet "Authorization" de Postman, sélectionner l'option "Bearer Token" et y coller le token récupéré.

<h2 id="1"> Erreur de Déploiement sur Render:</h2>

Le répertoire racine était laissé vide, ce qui a entraîné une erreur.

**Solution** : Remplir le champ "Root Directory" avec "backend".

<h2 id="2"> Erreur d'Authentification Admin pour React</h2>

Je n'arrivais pas à accéder au tableau de bord en tant qu'admin. Bien que j'étais admin, le token ne me permettait pas d'obtenir les informations complètes de l'utilisateur (je n'avais que l'ID de l'utilisateur).
**Solution** : Lors de la création du token dans le backend, j'ai ajouté le rôle de l'utilisateur au token. Ainsi, lors du décryptage du token, j'ai pu récupérer à la fois l'ID de l'utilisateur et son rôle.

<h2 id="3">Erreur d'Affichage des Skills après Création sur le Dashboard React</h2>

Je ne récupérais pas les données des skills car la réponse de response.data retournait uniquement l'utilisateur, et donc le skill ajouté n'était pas mis à jour.

**Solution** :

```
setSkills([...skills, response.data]);
const reloadedSkills = await axios.get(`${API_URL}/api/skills/`);
setSkills(reloadedSkills.data.skills);
```

**Explication** : Après l'ajout d'un skill, je refais une requête pour récupérer à jour la liste des skills et les afficher sur le dashboard.

<h2 id="4">Erreur lors de la MAJ de la photo du skill</h2>

Lors de la mise à jour d'un skill, l'ancienne image sur Cloudinary ne se supprime pas. En analysant le backend et en ajoutant un console.log(req.body.public_id), il a été constaté que la variable public_id est undefined. Cela signifie que l'ancien public_id de l'image n'est pas passé correctement dans la requête.
**Solution**:

Il faut s'assurer que l'ancien public_id (de l'image précédente) soit inclus dans la requête envoyée au backend. Cela permet à l'API de Cloudinary de connaître l'image à supprimer avant d'en télécharger une nouvelle.

```
if (editSkill.public_id) {
formData.append("public_id", editSkill.public_id);
}
```

<h2 id="5">Erreur de validation du token reCAPTCHA</h2>

Lors de la sauvegarde du token reCAPTCHA dans l'état, l'erreur suivante se produisait :

```
{
  "success": false,
  "error-codes": [
    "invalid-input-response"
  ]
}
```

Le problème est survenu parce que le token reCAPTCHA était stocké dans un objet avec la syntaxe incorrecte :

`setRecaptcha({ recaptcha: val })`

**Solution** :

Pour résoudre l'erreur, il fallait simplement stocker directement le token dans l'état sans le mettre dans un objet, ainsi :

`setRecaptcha(val)`

Cela a permis de récupérer et d'envoyer correctement le token reCAPTCHA, ce qui a résolu l'erreur "invalid-input-response".
