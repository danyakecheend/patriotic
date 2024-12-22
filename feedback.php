<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (isset($_POST['consent'])) {
        $date = date('Y-m-d H:i:s');
        $feedback = "Дата: $date\nИмя: $name\nEmail: $email\nСообщение: $message\n\n";

        $filePath = 'feedback.txt';

        if (file_put_contents($filePath, $feedback, FILE_APPEND | LOCK_EX)) {
            echo "Спасибо! Ваше сообщение отправлено.";
        } else {
            echo "Произошла ошибка при сохранении сообщения. Попробуйте позже.";
        }
    } else {
        echo "Вы должны согласиться на обработку персональных данных.";
    }
} else {
    echo "Некорректный метод запроса.";
}
?>
