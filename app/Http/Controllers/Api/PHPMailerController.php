<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Models\CodigoEmail;
use App\Http\Controllers\Controller;

class PHPMailerController extends Controller
{
      public function envia_email(Request $request){

      $input = $request->all();
      // alterando o config app rodar "php artisan config:cache"
      $mail = new PHPMailer(true);
      try {

          // Email server settings (app/config)
          //$mail->SMTPDebug = 1; break json_econde
          $mail->isSMTP();
          $mail->Host = config('app.host_mail.mail_host');
          $mail->SMTPAuth = true;
          $mail->Username = config('app.host_mail.mail_username');   //  sender username
          $mail->Password = config('app.host_mail.mail_password');  // sender password
          $mail->SMTPSecure = 'ssl';                  // encryption - ssl/tls
          $mail->Port = 465;                          // port - 587/465
          $mail->setFrom(config('app.host_mail.mail_from_address'), config('app.host_mail.mail_from_name'));
          $mail->addAddress($input["email"]);
          //$mail->addAddress('atiladdsantos4@gmail.com');

          // $mail->addAddress($request->emailRecipient);
          // $mail->addCC($request->emailCc);
          // $mail->addBCC($request->emailBcc);

          //$mail->addReplyTo('atiladdsantos4@gmail.com', 'Atila Santos');
          /*
          if(isset($_FILES['emailAttachments'])) {
              for ($i=0; $i < count($_FILES['emailAttachments']['tmp_name']); $i++) {
                  $mail->addAttachment($_FILES['emailAttachments']['tmp_name'][$i], $_FILES['emailAttachments']['name'][$i]);
              }
          }
          */


          $mail->isHTML(true);                // Set email content format to HTML

          //$mail->Subject = $request->emailSubject;


          if(isset($input["recebido"])){
                $mail->Subject = 'Agendamento Recebido';
                $img = $input["qrcode"];
                $base64Data = substr($img, strpos($img, ",") + 1);
                $mail->addStringAttachment(base64_decode($base64Data), 'qrcode.png', 'base64', 'image/png');
                $mailData = [
                    'empresa'=> $input["empresa"],
                    'title'=> 'Este é o titulo',
                    'nome' => $input["nome"],
                    'dia' => date('d'),
                    'mes' => date('m'),
                    'ano' => date('Y'),
                    'horario' => $input["horario"],
                    'dia_extenso' => $input["dia_extenso"],
                    'profissional' => $input["profissional"],
                    'servico' => $input["servico"],
                    'tratamento' => $input["tratamento"],
                    'cadastro' => $input["cadastro"],
                    'qrcodecopia'=> $input["qrcodecopia"],
                    // 'empresa'=> $input["empresa"],
                    // 'title'=> 'Este é o titulo',
                    // 'nome' => 'Atila Santos',
                    // 'dia' => date('d'),
                    // 'mes' => date('m'),
                    // 'ano' => date('Y'),
                    // 'horario' => date('H:i'),
                    // 'dia_extenso' => 'Segunda',
                    // 'medico' => 'Juarez Emmanuel',
                    // 'especialidade' => 'Corte de Cabelo',
                    // 'tratamento' => 'Corte de Cabelo com Máquina',
                    // 'cadastro' => date('Y/m/d H:i:s'),
                ];
                //C:\Apache24\htdocs\projetos\inertia-react\resources\views\mail\geraAguardando.blade.php
                $corpo_email = view('mail.geraAguardando', [ 'agenda' => $mailData ])->render();
                $mail->Body    = $corpo_email;

          } else {
            //$mail->Body    = $request->emailBody;
            //     $corpo_email = view('email.recebido', [
            //     "nome_site" => $par->getParam('NOME_SITE'),
            //     "nome" => $request->get('nome'),
            //     "contato" => $request->get('email'),
            //     "assunto"=> $request->get('assunto') ,
            //     "mensagem" => $request->get('mensagem') ]
            //    )->render();
                $mail->Subject = 'Código de Confirmção';
                $number =  rand(100000,999999);
                $mailData = [
                'empresa'=> $input["empresa"],
                'title'=> 'Este é o titulo',
                'n1' => substr($number,0,1),
                'n2' => substr($number,1,1),
                'n3' => substr($number,2,1),
                'n4' => substr($number,3,1),
                'n5' => substr($number,4,1),
                'n6' => substr($number,5,1),
                ];
                $corpo_email = view('mail.geraCodigo', [ 'mailData' => $mailData])->render();
                $mail->Body    = $corpo_email;

            // $mail->AltBody = plain text version of email body;
           }
         if( !$mail->send() ) {
                $response = [
                    'success' => false,
                    'message' => 'Problemas no envio do email',
                    'data'    => $mail->ErrorInfo
                ];
                //return back()->with("failed", "Email not sent.")->withErrors($mail->ErrorInfo);
          }
          else {
                //coe_id_coe,coe_email,coe_codigo,coe_confirma,coe_created_at,coe_updated_at,coe_deleted_at
                // $cod = new CodigoEmail();
                // $cod->coe_email = $input["email"];
                // $cod->coe_codigo = $number;
                // $cod->coe_confirma = 'N';
                // $cod->save();
                $response = [
                    'success' => true,
                    'message' => 'Email enviado com Sucesso',
                ];
          }
          return response()->json($response, 200);

      } catch (Exception $e) {
          dd($e);
          return back()->with('error','Message could not be sent.');
      }
    }

}
