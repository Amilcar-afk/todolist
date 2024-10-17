<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VerifyEmailController
{
    private EmailVerifier $emailVerifier;

    public function __construct(EmailVerifier $emailVerifier)
    {
        $this->emailVerifier = $emailVerifier;
    }

    #[Route('/verify-email', name: 'app_verify_email', methods: ['GET'])]
    public function verifyUserEmail(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
        $id = $request->get('id');
        $token = $request->get('token');

        // Vérification : Si l'ID est manquant
        if (null === $id || null === $token) {
            return new JsonResponse([
                'error' => 'User ID or token is missing.'
            ], Response::HTTP_BAD_REQUEST);
        }

        // Récupérer l'utilisateur correspondant à cet ID
        $user = $entityManager->getRepository(User::class)->find($id);

        // Vérification : Si l'utilisateur n'existe pas
        if (null === $user) {
            return new JsonResponse([
                'error' => 'User not found.'
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            // Tenter de valider l'e-mail
            $this->emailVerifier->handleEmailConfirmation($request->getUri(), $user, $token);
        } catch (\Exception $e) {
            // Retourner une erreur si la vérification échoue
            return new JsonResponse([
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }

        // Si la vérification réussit, mettre à jour l'utilisateur et renvoyer une réponse
        return new JsonResponse([
            'message' => 'Email verified successfully.',
            'verified' => true
        ], Response::HTTP_OK);
    }
}
