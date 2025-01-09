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
    && docker-php-ext-install intl zip opcache pdo pdo_pgsql \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

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

# Configurer Xdebug pour le débogage
RUN echo "xdebug.mode=debug" > /usr/local/etc/php/conf.d/99-xdebug.ini \
    && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/99-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/99-xdebug.ini \
    && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/99-xdebug.ini \
    && echo "xdebug.idekey=PHPSTORM" >> /usr/local/etc/php/conf.d/99-xdebug.ini \
    && echo "xdebug.log=/var/www/html/xdebug.log" >> /usr/local/etc/php/conf.d/99-xdebug.ini


# Exposer le port pour le serveur PHP
EXPOSE 9000

# Commande pour démarrer le serveur PHP
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
