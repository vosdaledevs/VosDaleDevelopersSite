<?php

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;


$mail = new PHPMailer(); // creating instance of phpmailer

header('Content-Type: application/json, charset=UTF-8');

$json = json_decode(file_get_contents("php://input")); // receiving json data and convert to PHP object


if($_SERVER['REQUEST_METHOD'] == "POST"){ // verify the connection method
    $mail->isSMTP();
    $mail->SMTPDebug = 1;
    $mail->SMTPAuth = true;
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPSecure = 'tls';
    $mail->Username = 'vosdaledevs@gmail.com'; // change the user email
    $mail->Password = 'email_password'; //change the user password
    $mail->setFrom('algun@correo.com', 'Pregunta usuario sitio web');
    //$mail->addReplyTo('reply-box@hostinger-tutorials.com', 'Your Name');
    $mail->addAddress('vosdaledevs@gmail.com', 'Admin Site');
    $mail->Subject = 'Pregunta | vosdaledevps.website';
    //$mail->msgHTML(file_get_contents('message.html'), __DIR__);
    //$mail->AltBody = 'This is a plain text message body';
    //$mail->addAttachment('test.txt');
    $mail->Body = "correo de: $json->userEmail \n\nContenido:\n$json->userQuestion";

    if (!$mail->send()) {
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message sent!';
    }
}
