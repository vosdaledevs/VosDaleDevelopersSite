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
    $mail->Username = 'user_email'; // change the user email
    $mail->Password = 'user_password'; //change the user password
    $mail->setFrom($json->userEmail, 'Usuario sitio');
    //$mail->addReplyTo('reply-box@hostinger-tutorials.com', 'Your Name');
    $mail->addAddress('haroldesptru@gmail.com', 'Admin Site');
    $mail->Subject = 'Pregunta | vosdaledevelopment.website';
    //$mail->msgHTML(file_get_contents('message.html'), __DIR__);
    //$mail->AltBody = 'This is a plain text message body';
    //$mail->addAttachment('test.txt');
    $mail->Body = $json->userQuestion;

    if (!$mail->send()) {
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message sent!';
    }
}
