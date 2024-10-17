<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\Address;

class SendTestEmailCommand extends Command
{
    private MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;

        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->setName('app:send-test-email')
            ->setDescription('Sends a test email to verify mailer functionality.')
            ->setHelp('This command allows you to send a test email to verify if the mailer is working correctly.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $email = (new TemplatedEmail())
            ->from(new Address('no-reply@example.com', 'Your App'))
            ->to('blackoscapos@gmail.com')
            ->subject('Test email')
            ->htmlTemplate('emails/confirmation_email.html.twig');

        $this->mailer->send($email);

        $output->writeln('Test email sent.');

        return Command::SUCCESS;
    }
}
