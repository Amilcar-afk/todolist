<?php

namespace App\EventListener;

use App\Entity\User;
use App\Service\EmailVerifier;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;

class SendMailRegistrationListener
{
    private EmailVerifier $emailVerifier;
    private MailerInterface $mailer;

    public function __construct(EmailVerifier $emailVerifier, MailerInterface $mailer)
    {
        $this->emailVerifier = $emailVerifier;
        $this->mailer = $mailer;
    }

    public function postPersist(LifecycleEventArgs $event): void
    {
        $entity = $event->getObject();

        if (!$entity instanceof User) {
            return;
        }

        if ($this->isTestEnvironment()) {
            $tokenVerification = $entity->getVerificationToken();
            $entity->setVerificationTokenTest($tokenVerification);
        }

        $email = (new TemplatedEmail())
            ->from(new Address('no-reply@example.com', 'todolist'))
            ->to($entity->getEmail())
            ->subject('Veuillez confirmer votre compte.')
            ->htmlTemplate('emails/confirmation_email.html.twig');

        $this->emailVerifier->sendEmailConfirmation('app_verify_email', $entity, $email);
        $this->mailer->send($email);
    }

    private function isTestEnvironment(): bool
    {git 
        return $_ENV['APP_ENV'] === 'test';
    }
}
