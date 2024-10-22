<?php

namespace App\EventListener;

use App\Entity\Task;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Symfony\Bundle\SecurityBundle\Security;

class TaskCreatorListener
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function prePersist(PrePersistEventArgs $args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof Task) {
            return;
        }

        if ($this->security->getUser() && $entity->getCreator() === null) {
            $entity->setCreator($this->security->getUser());
        }
    }
}
