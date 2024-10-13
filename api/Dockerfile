# Dockerfile pour API Platform

# Utiliser PHP avec Composer
FROM php:8.3-fpm

# Mise à jour des packages et installation des dépendances
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install intl zip opcache pdo pdo_pgsql

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/html

# Initialiser le projet Symfony et API Platform s'ils n'existent pas
RUN if [ ! -f composer.json ]; then \
    composer create-project symfony/skeleton . --no-interaction; \
    composer require api --no-interaction; \
    fi

# Copier uniquement les fichiers du projet après initialisation
COPY . .

# Installer les dépendances PHP de l'API
RUN composer install --no-interaction --prefer-dist --no-scripts --no-progress

# Exposer le port pour le serveur PHP
EXPOSE 9000

# Commande pour démarrer le serveur PHP
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
