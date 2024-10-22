<?php

namespace App\EventListener;

use App\Entity\Task;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class CheckCreatorListener
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function postLoad(Task $task, LifecycleEventArgs $event): void
    {
        $user = $this->security->getUser();

        if ($task->getCreator() !== $user) {
            throw new AccessDeniedHttpException('Vous n\'êtes pas autorisé à accéder à ces ou cette tâches.');
        }
    }
}