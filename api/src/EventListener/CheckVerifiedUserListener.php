<?php

namespace App\EventListener;

use App\Entity\User;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class CheckVerifiedUserListener
{
    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        $user = $event->getAuthenticationToken()->getUser();

        if ($user instanceof User) {
            if (!$user->isVerified()) {
                throw new AccessDeniedHttpException('Votre compte n\'a pas encore été vérifié.');
            }
        }
    }
}
