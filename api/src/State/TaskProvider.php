<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use ApiPlatform\Metadata\CollectionOperationInterface;

final class TaskProvider implements ProviderInterface
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

    /**
     * @throws \DateMalformedStringException
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): null|array|object
    {
        $this->logger->info('TaskProvider is called.' . print_r($context['filters'],true));

        $resourceClass = $operation->getClass();

        if (Task::class !== $resourceClass) {
            return null;
        }

        $user = $this->security->getUser();

        if (!$user) {
            return null;
        }

        if ($operation instanceof CollectionOperationInterface) {
            $filters = $context['filters'] ?? [];

            $queryBuilder = $this->entityManager->getRepository(Task::class)
                ->createQueryBuilder('t')
                ->where('t.creator = :user')
                ->setParameter('user', $user);

            if (isset($filters['checked'])) {
                $queryBuilder->andWhere('t.checked = :checked')
                    ->setParameter('checked', $filters['checked']);
            }

            if (isset($filters['date']['before'])) {
                $beforeDate = new \DateTime($filters['date']['before']);
                $beforeDate->setTime(23, 59, 59);
                $queryBuilder->andWhere('t.date <= :beforeDate')
                    ->setParameter('beforeDate', $beforeDate);
            }

            if (isset($filters['date']['after'])) {
                $afterDate = new \DateTime($filters['date']['after']);
                $afterDate->setTime(0, 0, 0);
                $queryBuilder->andWhere('t.date >= :afterDate')
                    ->setParameter('afterDate', $afterDate);
            }

            return $queryBuilder->getQuery()->getResult();
        }

        return $this->entityManager->getRepository(Task::class)->find($uriVariables['id']);
    }
}
