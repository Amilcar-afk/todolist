<?php

namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class EmailVerifier
{
    private VerifyEmailHelperInterface $verifyEmailHelper;
    private UrlGeneratorInterface $router;
    private EntityManagerInterface $entityManager;

    public function __construct(VerifyEmailHelperInterface $helper, UrlGeneratorInterface $router, EntityManagerInterface $entityManager)
    {
        $this->verifyEmailHelper = $helper;
        $this->router = $router;
        $this->entityManager = $entityManager;
    }

    public function sendEmailConfirmation(string $verifyEmailRouteName, User $user, TemplatedEmail $email): void
    {
        $token = $user->getVerificationToken();

        // Générer l'URL avec l'ID et le token de l'utilisateur
        $signedUrl = $this->router->generate($verifyEmailRouteName, [
            'id' => $user->getId(),
            'token' => $token,
        ], UrlGeneratorInterface::ABSOLUTE_URL);

        $email->context([
            'signedUrl' => $signedUrl,
            'user' => $user
        ]);
    }

    public function handleEmailConfirmation(string $requestUri, User $user, string $tokenFromRequest): void
    {
        if ($user->getVerificationToken() !== $tokenFromRequest) {
            throw new \Exception('The link to verify your email is invalid. Please request a new link.');
        }

        $user->setIsVerified(true);
        $user->setVerificationToken(null);

        $this->entityManager->flush();
    }
}
