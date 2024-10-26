<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class TaskProcessor implements ProcessorInterface
{
    private EntityManagerInterface $entityManager;
    private Security $security;
    private LoggerInterface $logger;

    public function __construct(EntityManagerInterface $entityManager, Security $security, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->security = $security;
        $this->logger = $logger;
    }

    public function process($data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        if (!$data instanceof Task) {
            return;
        }

        $user = $this->security->getUser();
        if ($data->getCreator() !== $user) {
            // Optionnel : Log une tentative d'update non autorisée
            $this->logger->warning("Unauthorized update attempt by user {$user->getId()}");
            return;
        }

        // Appeler flush pour sauvegarder les modifications
        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }
}
