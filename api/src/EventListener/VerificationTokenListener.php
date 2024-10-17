<?php

namespace App\EventListener;

use App\Entity\User;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Symfony\Component\Uid\Uuid;

class VerificationTokenListener
{
    public function prePersist(PrePersistEventArgs $event): void
    {
        $entity = $event->getObject();

        if (!$entity instanceof User) {
            return;
        }

        if (!$entity->isVerified()) {
            $entity->setVerificationToken(Uuid::v4()->toRfc4122());
        }
    }
}
