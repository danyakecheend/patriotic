<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $feedback = "Имя: $name\nEmail: $email\nСообщение: $message\n---\n";


    $file = 'feedback.txt';

    file_put_contents($file, $feedback, FILE_APPEND | LOCK_EX);
    

    echo "<h2>Спасибо за ваше сообщение!</h2>";
    echo "<a href='index.html'>Вернуться на главную страницу</a>";
} else {

    echo "<h2>Ошибка! Пожалуйста, заполните форму.</h2>";
    echo "<a href='index.html'>Вернуться на главную страницу</a>";
}
?>
