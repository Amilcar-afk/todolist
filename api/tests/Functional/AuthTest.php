<?php

namespace App\Tests\Functional;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class AuthTest extends ApiTestCase
{
    public function testSuccessfulAuthentication(): void
    {
        $uniqueEmail = 'testmail' . uniqid() . '@gmail.com';
        $client = static::createClient();

        // Étape 1 : Créer un utilisateur
        $client->request('POST', '/api/users', [
            'headers' => [
                'Content-Type' => 'application/ld+json',
                'Accept' => 'application/ld+json',
            ],
            'json' => [
                'email' => $uniqueEmail,
                'password' => 'azerty',
                'firstname' => 'John',
                'lastname' => 'Doe',
            ],
        ]);

        $this->assertResponseIsSuccessful();

        // Récupérer les données utilisateur
        var_dump("ici");
        var_dump($client->getResponse());
        var_dump("ici2");
        var_dump($client->getResponse()->getContent());
        $data = json_decode($client->getResponse()->getContent(), true);
        $userId = $data['id'];

        var_dump($data);

        // Simuler un vrai token d'activation (vous pouvez le récupérer via votre application ou le générer)
        $token = $data->getVerificationToken(); // Ajoutez une méthode qui récupère un vrai token ici
        // Étape 2 : Vérifier l'adresse e-mail via le contrôleur
        $client->request('GET', '/verify-email', [
            'query' => [
                'id' => $userId,
                'token' => $token, // Remplacer par le token réel généré dans votre implémentation
            ],
        ]);

        $this->assertResponseIsSuccessful();

        // Étape 3 : Authentification via /auth
        $response = $client->request('POST', '/auth', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/ld+json',
            ],
            'json' => [
                'email' => $uniqueEmail,
                'password' => 'azerty',
            ],
        ]);

        $this->assertResponseIsSuccessful();

        $data = $response->toArray();
        $this->assertArrayHasKey('token', $data);
        $this->assertNotEmpty($data['token']);
    }

    /*public function testAuthenticationFailsWithInvalidCredentials(): void
    {
        // Requête avec des identifiants invalides
        $response = static::createClient()->request('POST', '/auth', [
            'json' => [
                'email' => 'invalid@example.com',
                'password' => 'wrongpassword',
            ],
        ]);

        // Vérifiez que la réponse est une erreur 401
        $this->assertResponseStatusCodeSame(401);
        $data = $response->toArray();

        // Vérifiez le message d'erreur
        $this->assertArrayHasKey('message', $data);
        $this->assertEquals('Invalid credentials.', $data['message']);
    }*/
}
