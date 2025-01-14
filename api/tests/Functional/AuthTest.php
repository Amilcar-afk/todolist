<?php

namespace App\Tests\Functional;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class AuthTest extends ApiTestCase
{
    const HTTP_OK = 200;
    const HTTP_CREATED = 201;
    const HTTP_BAD_REQUEST = 400;
    const HTTP_UNAUTHORIZED = 401;

    /* ---------- All Tests ----------- */

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    public function testSuccessfulAuthentication(): void
    {
        // create user
        $uniqueEmail = 'testmail' . uniqid() . '@gmail.com';
        $password = 'azerty';
        $userCreated = $this->userRegistration($uniqueEmail, $password);
        // check response from request
        $this->assertResponseStatusCodeSame(self::HTTP_CREATED);
        $this->assertArrayHasKey('id', $userCreated);
        $this->assertArrayHasKey('verificationTokenTest', $userCreated);

        $userId = $userCreated['id'];
        $userToken = $userCreated['verificationTokenTest'];
        $this->assertNotEmpty($userId);
        $this->assertNotEmpty($userToken);

        // confirm email
        $this->verifyUserEmail($userId, $userToken);

        // try to authenticate
        $this->userLogin($uniqueEmail, $password);
        $this->assertResponseStatusCodeSame(self::HTTP_OK);
    }

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    public function testAuthenticationFailsWithInvalidCredentials(): void
    {
        // create user
        $uniqueEmail = 'testmail' . uniqid() . '@gmail.com';
        $password = 'azerty';
        $userCreated = $this->userRegistration($uniqueEmail, $password);
        $this->assertResponseStatusCodeSame(self::HTTP_CREATED);
        $this->assertArrayHasKey('id', $userCreated);
        $this->assertArrayHasKey('verificationTokenTest', $userCreated);

        $userId = $userCreated['id'];
        $userToken = $userCreated['verificationTokenTest'];
        $this->assertNotEmpty($userId);
        $this->assertNotEmpty($userToken);

        // confirm email
        $this->verifyUserEmail($userId, $userToken);
        $this->assertResponseStatusCodeSame(self::HTTP_OK);

        // try to authenticate
        $this->userLogin($uniqueEmail, "wrongpassword");
        $this->assertResponseStatusCodeSame(self::HTTP_UNAUTHORIZED);
    }
    /** -------- End All Tests -------- */

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws DecodingExceptionInterface
     * @throws ClientExceptionInterface
     */
    public function userRegistration($email, $password): array
    {
        $client = static::createClient();

        //request to create a user
        $response = $client->request('POST', '/api/users', [
            'headers' => [
                'Content-Type' => 'application/ld+json',
                'Accept' => 'application/ld+json',
            ],
            'json' => [
                'email' => $email,
                'password' => $password,
                'firstname' => 'John',
                'lastname' => 'Doe',
            ],
        ]);
        $this->assertNotEmpty($response);
        $data = $response->toArray();
        var_dump("data before registration Auth test");
        var_dump($data);
        $this->assertArrayHasKey('id', $data); //check user id created
        return $data;
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function verifyUserEmail($userId, $token): void
    {
        $client = static::createClient();

        // Request to verify user email
        $client->request('GET', '/verify-email', [
            'query' => [
                'id' => $userId,
                'token' => $token,
            ],
        ]);

    }

    /**
     * @throws TransportExceptionInterface
     */
    public function userLogin($userMail, $userPassword): void
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
        var_dump("user login response in Auth test");
        var_dump($response->toArray());
    }

}
