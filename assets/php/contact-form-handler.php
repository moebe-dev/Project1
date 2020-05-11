<?php
    $name = $_POST["name"];
    $visitor_email = $_POST["email"];
    $message = $_POST["message"];

    $email_form = "random123@yahoo.com";

    $email_subject = "New Form Submisson";

    $email_body = "User Name: $name.\n". "User Email: $visitor_email.\n". "user Message: $message.\n";

    $to = "random123@gmail.com";

    $headers = "Form: $email_form \r\n";

    $headers .= "Reply-To: $visitor_email \r\n";

    mail($to, $email_subject, $email_body, $headers);

    header("Location: /../../../contact.html")
?>
