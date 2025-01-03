<?php

namespace App\Tests\Entity;

use App\Entity\User;
use PHPUnit\Framework\TestCase;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class UserTest extends TestCase
{
    /* Beginning of tests for getter and setter */

    public function testSetAndGetLastname(): void
    {
        $user = new User();
        $user->setLastname('Doe');
        
        $this->assertSame('Doe', $user->getLastname());
    }

    public function testSetAndGetFirstname(): void
    {
        $user = new User();
        $user->setFirstname('John');
        
        $this->assertSame('John', $user->getFirstname());
    }

    public function testSetAndGetEmail(): void
    {
        $user = new User();
        $user->setEmail('test@example.com');
        
        $this->assertSame('test@example.com', $user->getEmail());
    }

    public function testSetAndGetRoles(): void
    {
        $user = new User();
        $user->setRoles(['ROLE_ADMIN']);
        
        $this->assertSame([0 => 'ROLE_ADMIN', 1 => 'ROLE_USER'], $user->getRoles());
    }

    public function testSetAndGetPassword(): void
    {
        $user = new User();
        $user->setPassword('passwordCheck');
        
        $this->assertSame('passwordCheck', $user->getPassword());
    }

    public function testSetAndGetVerificationToken(): void
    {
        $user = new User();
        $token = 'verification_token';
        $user->setVerificationToken($token);
        
        $this->assertSame($token, $user->getVerificationToken());
    }

    public function testUserIsVerified(): void
    {
        $user = new User();
        $user->setIsVerified(true);
        
        $this->assertTrue($user->isVerified());
    }

    public function testGetUserIdentifier(): void
    {
        $user = new User();
        $user->setEmail('test@example.com');
        
        $this->assertSame('test@example.com', $user->getUserIdentifier());
    }

    /* End tests for getter and setter */

    public function testDefaultRoleUser(): void
    {
        $user = new User();
        
        // Ensure that every user has at least the ROLE_USER role
        $roles = $user->getRoles();
        $this->assertContains('ROLE_USER', $roles);
    }

    public function testAddAndRemoveTask(): void
    {
        $user = new User();
        $task = $this->createMock(\App\Entity\Task::class);
        $task->method('setCreator')->willReturnSelf();
        
        $user->addTask($task);
        
        $this->assertCount(1, $user->getTasks()); //if user have a task created
        
        $user->removeTask($task);
        
        $this->assertCount(0, $user->getTasks()); //if the task have been deleted 
    }

    // Additional tests could include ensuring the eraseCredentials method works as expected (clearing sensitive data)
    /*public function testEraseCredentials(): void
    {
        $user = new User();
        // Assuming you set a plainPassword or similar before calling eraseCredentials.
        // This test ensures that sensitive data is erased appropriately.
        $user->eraseCredentials();
        $this->assertNull($user->getPassword()); // assuming your implementation nulls sensitive data
    }*/
}
