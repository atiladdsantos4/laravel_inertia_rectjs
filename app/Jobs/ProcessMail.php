<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\PHPMailerController;

class ProcessMail implements ShouldQueue
{
    use Queueable;

    private $email;
    private $empresa;
    private $recebido;


    /**
     * Create a new job instance.
     */
    public function __construct(Request $request)
    {
       $this->email = $request->input('email');
       $this->empresa = $request->input('empresa');
       $this->recebido = $request->input('recebido');
    }

    /**
     * Execute the job.
     */
    public function handle(Request $request): void
    {
        $mail = new PHPMailerController();
        $mail->envia_email($request);
        // Write your time-consuming logic here (e.g., API requests, processing files)
        logger()->info('Email esta sendo processado in background!');
    }
}
