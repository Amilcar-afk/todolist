# Dockerfile pour React.js

# Étape 1: Utiliser l'image Node.js
FROM node:22.9.0-alpine

# Créer un dossier de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port pour React.js
EXPOSE 3000
