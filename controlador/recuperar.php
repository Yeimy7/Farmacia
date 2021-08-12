<?php
include_once '../modelo/Usuario.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

$usuario = new Usuario();
if ($_POST['funcion'] == 'verificar') {
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $usuario->verificar($email, $dni);
}
if ($_POST['funcion'] == 'recuperar') {
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $codigo = generar(10);
    $usuario->reemplazar($codigo, $email, $dni);

    $mail = new PHPMailer(true);

    try {

        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp-mail.outlook.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'yeimylc@outlook.com';                     //SMTP username
        $mail->Password   = 'Contramicrosoft77';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
        $mail->Port       = 587;
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('yeimylc@outlook.com', 'Sistema administrativo');
        $mail->addAddress($email);     //Add a recipient

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Restablecer contraseña';
        $mail->Body    = 'La nueva contraseña es: <b>' . $codigo . '</b>';
        $mail->SMTPDebug = false;
        $mail->do_debug = false;
        $mail->send();
        echo 'enviado';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

function generar($longitud)
{
    $key = '';
    $patron = '1234567890abcdefghijklmnopqrstuvwxyz';
    $max = strlen($patron) - 1;
    for ($i = 0; $i < $longitud; $i++) {
        $key .= $patron{
            mt_rand(0, $max)};
    }
    return $key;
}
