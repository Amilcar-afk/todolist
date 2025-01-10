<?php

namespace App\Tests\Functional;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class AuthTest extends ApiTestCase
{
    public function testSuccessfulAuthentication(): void
    {
        // create user
        $uniqueEmail = 'testmail' . uniqid() . '@gmail.com';
        $password = 'azerty';
        $userCreated = $this->userRegistration($uniqueEmail, $password);
        $this->assertArrayHasKey('verificationTokenTest', $userCreated);

        $userId = $userCreated['id'];
        $userToken = $userCreated['verificationTokenTest'];

        // confirm email
        $this->verifyUserEmail($userId, $userToken);

        // try to authenticate
        $this->userLogin($uniqueEmail, $password);
    }

    public function userRegistration($email, $password): array
    {
        $client = static::createClient();

        //request to create a user
        try {
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

            // check response from request
            $this->assertResponseStatusCodeSame(201);

            $data = $response->toArray();
            $this->assertArrayHasKey('id', $data); //check user id created
            return $data;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function verifyUserEmail($userId, $token): void
    {
        $client = static::createClient();

        // Request to verify user email
        try {
            $client->request('GET', '/verify-email', [
                'query' => [
                    'id' => $userId,
                    'token' => $token,
                ],
            ]);

            // check response from request
            $this->assertResponseStatusCodeSame(200);

        } catch (\Exception $e) {
            $this->fail('Error during email verification: ' . $e->getMessage());
        }
    }

    public function userLogin($userMail, $userPassword): void
    {
        $client = static::createClient();
        try {
            $client->request('POST', '/auth', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/ld+json',
                ],
                'json' => [
                    'email' => $userMail,
                    'password' => $userPassword,
                ],
            ]);
            $this->assertResponseStatusCodeSame(200);

        } catch (\Exception $e) {
            $this->fail('Error during authentication: ' . $e->getMessage());
        }
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

    protected function tearDown(): void
    {
        parent::tearDown();
        static::ensureKernelShutdown(); // Assure la réinitialisation du kernel Symfony
    }
}
