<?php

// src/State/TaskDataPersister.php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class TaskDataPersister implements ProcessorInterface
{
    private EntityManagerInterface $entityManager;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if (!$data instanceof Task) {
            return $data;
        }

        // Ajoute ici toute logique spécifique avant la sauvegarde
        $user = $this->security->getUser();
        if ($user) {
            $data->setCreator($user);
        }

        $this->entityManager->persist($data);
        $this->entityManager->flush();

        return $data;
    }

    public function supports(Operation $operation, array $context = []): bool
    {
        return $operation->getClass() === Task::class && in_array($operation->getMethod(), ['POST', 'PUT', 'PATCH']);
    }
}
