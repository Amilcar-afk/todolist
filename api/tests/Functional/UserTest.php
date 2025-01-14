<?php

namespace App\Tests\Functional;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use App\Factory\UserFactory;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Zenstruck\Foundry\Test\Factories;
use Zenstruck\Foundry\Test\ResetDatabase;

class UserTest extends ApiTestCase
{
    const HTTP_OK = 200;
    const HTTP_CREATED = 201;
    const HTTP_BAD_REQUEST = 400;
    const HTTP_UNAUTHORIZED = 401;

    use ResetDatabase, Factories;

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    public function testGetSingleUser(): void
    {
        // Create a fake user
        $fakeUser = UserFactory::createOne([
            'isVerified' => true,
            'password' => 'password'
        ]);
        $userId = $fakeUser->getId();
        $userEmail = $fakeUser->getEmail();
        $userPassword = "password";

        var_dump("mail");
        var_dump($userEmail);

        $userToken = $this->userLogin($userEmail, $userPassword);
        $this->assertResponseStatusCodeSame(self::HTTP_OK);

        static::createClient()->request('GET', '/api/users/' . $userId, [
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/ld+json',
                'Authorization' => 'Bearer ' . $userToken
            ]
        ]);

        $this->assertResponseStatusCodeSame(self::HTTP_OK);
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        $this->assertJsonContains([
            '@context' => '/api/contexts/User',
            '@type' => 'User',
            'id' => $userId,
        ]);
        $this->assertMatchesResourceItemJsonSchema(User::class);
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function userLogin($userMail, $userPassword): mixed
    {
        $client = static::createClient();
        $response = $client->request('POST', '/auth', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
            'json' => [
                'email' => $userMail,
                'password' => $userPassword,
            ],
        ]);
        $this->assertNotEmpty($response);
        $data = $response->toArray();
        var_dump("check data");
        var_dump($data);
        return $data["token"];
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
