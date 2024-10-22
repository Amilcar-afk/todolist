<?php

namespace App\DataProvider;

use ApiPlatform\State\ProviderInterface;
use App\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use ApiPlatform\Metadata\Operation;

final class TaskCollectionDataProvider implements ProviderInterface
{
    private EntityManagerInterface $entityManager;
    private Security $security;

    public function __construct(EntityManagerInterface $entityManager, Security $security)
    {
        $this->entityManager = $entityManager;
        $this->security = $security;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): iterable
    {
        $user = $this->security->getUser();

        $taskRepository = $this->entityManager->getRepository(Task::class);
        return $taskRepository->findBy(['creator' => $user]);
    }
}
