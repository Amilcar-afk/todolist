<?php

namespace App\EventListener;

use App\Entity\User;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class PasswordHashListener
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function prePersist(PrePersistEventArgs $event): void
    {
        $entity = $event->getObject();

        if (!$entity instanceof User) {
            return;
        }

        $this->encodePassword($entity);
    }

    public function preUpdate(LifecycleEventArgs $event): void
    {
        $entity = $event->getObject();

        if (!$entity instanceof User) {
            return;
        }

        $this->encodePassword($entity);
        // Cette ligne est nécessaire pour informer Doctrine que le champ "password" a été modifié
        $em = $event->getEntityManager();
        $metadata = $em->getClassMetadata(get_class($entity));
        $em->getUnitOfWork()->recomputeSingleEntityChangeSet($metadata, $entity);
    }

    private function encodePassword(User $user): void
    {
        if (!$user->getPassword()) {
            return;
        }

        // Hachage du mot de passe
        $hashedPassword = $this->passwordHasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hashedPassword);
    }
}
