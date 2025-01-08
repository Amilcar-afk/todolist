<?php

namespace App\Tests\Functional;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use App\Factory\UserFactory;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UserTest extends ApiTestCase
{
    use ResetDatabase, Factories;

    public function testGetUserCollection(): void
    {
        // Crée plusieurs utilisateurs fictifs
        UserFactory::createMany(10);

        $response = static::createClient()->request('GET', '/api/users');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Vérifie que le JSON retourné contient des utilisateurs
        $this->assertJsonContains([
            '@context' => '/contexts/User',
            '@type' => 'Collection',
        ]);

        // Vérifie le nombre d'éléments retournés
        $this->assertCount(10, $response->toArray()['hydra:member']);

        // Valide le schéma JSON de la collection
        $this->assertMatchesResourceCollectionJsonSchema(User::class);
    }

    /*public function testCreateUser(): void
    {
        $response = static::createClient()->request('POST', '/users', ['json' => [
            'email' => 'test@example.com',
            'password' => 'SecurePassword123',
            'roles' => ['ROLE_USER'],
        ]]);

        $this->assertResponseStatusCodeSame(201);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Vérifie le contenu du JSON retourné
        $this->assertJsonContains([
            '@context' => '/contexts/User',
            '@type' => 'User',
            'email' => 'test@example.com',
            'roles' => ['ROLE_USER'],
        ]);

        $this->assertMatchesResourceItemJsonSchema(User::class);
    }

    public function testCreateInvalidUser(): void
    {
        $response = static::createClient()->request('POST', '/users', ['json' => [
            'email' => 'invalid-email',
        ]]);

        $this->assertResponseStatusCodeSame(422);
        $this->assertJsonContains([
            '@context' => '/contexts/ConstraintViolationList',
            '@type' => 'ConstraintViolationList',
            'violations' => [
                ['propertyPath' => 'email', 'message' => 'This value is not a valid email address.'],
                ['propertyPath' => 'password', 'message' => 'This value should not be blank.'],
            ],
        ]);
    }

    public function testUpdateUser(): void
    {
        // Crée un utilisateur fictif
        $user = UserFactory::createOne(['email' => 'test@example.com']);

        $client = static::createClient();
        $iri = $this->findIriBy(User::class, ['email' => 'test@example.com']);

        // Met à jour le rôle de l'utilisateur
        $client->request('PATCH', $iri, [
            'json' => ['roles' => ['ROLE_ADMIN']],
            'headers' => ['Content-Type' => 'application/merge-patch+json'],
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => $iri,
            'email' => 'test@example.com',
            'roles' => ['ROLE_ADMIN'],
        ]);
    }

    public function testDeleteUser(): void
    {
        // Crée un utilisateur fictif
        $user = UserFactory::createOne(['email' => 'delete@example.com']);

        $client = static::createClient();
        $iri = $this->findIriBy(User::class, ['email' => 'delete@example.com']);

        // Supprime l'utilisateur
        $client->request('DELETE', $iri);

        $this->assertResponseStatusCodeSame(204);

        // Vérifie que l'utilisateur n'existe plus dans la base de données
        $this->assertNull(
            static::getContainer()->get('doctrine')->getRepository(User::class)->findOneBy(['email' => 'delete@example.com'])
        );
    }*/
}
