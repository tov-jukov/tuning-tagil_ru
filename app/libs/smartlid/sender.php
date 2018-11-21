<?php

require_once "SendMailSmtpClass.php"; // подключаем класс

$mailSMTP = new SendMailSmtpClass('m-style-nt@yandex.ru', 'vcnbkmgfhjkm', 'ssl://smtp.yandex.ru', 465, "UTF-8");
// $mailSMTP = new SendMailSmtpClass('zhenikipatov@yandex.ru', '', 'ssl://smtp.yandex.ru', 465, "windows-1251");
// $mailSMTP = new SendMailSmtpClass('monitor.test@mail.ru', '***', 'ssl://smtp.mail.ru', 465, "UTF-8");
// $mailSMTP = new SendMailSmtpClass('red@mega-dev.ru', '***', 'ssl://smtp.beget.com', 465, "UTF-8");
// $mailSMTP = new SendMailSmtpClass('red@mega-dev.ru', '***', 'smtp.beget.com', 2525, "windows-1251");
// $mailSMTP = new SendMailSmtpClass('red@mega-dev.ru', '***', 'ssl://smtp.beget.com', 465, "utf-8");
//$mailSMTP = new SendMailSmtpClass('red@mega-dev.ru', '***', 'smtp.beget.com', 2525, "utf-8");
// $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'порт', 'кодировка письма');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = "<b>Имя: </b>" . strip_tags($_POST['name']) . "<br>";
    $tel = "<b>Телефон: </b> " . strip_tags($_POST['tel']) . "<br>";
    $email =  isset($_POST['email']) ? "<b>Почта: </b> " . strip_tags($_POST['email']) . "<br>" : "";
    $text = isset($_POST['text']) ? "<b>Сообщение: </b> " . strip_tags($_POST['text']) . "<br>" : "";
}

$agreement = "<b>Дополнительно:</b> Отправитель дал согласие на обработку персональных данных</b>";
$messageSubject = 'Заявка с сайта';

//  = param('subject' , 'Заявка с сайта');
$messageText    = '<p>Заявка на обратный звонок:</p>'.$name.'</br>'.$tel.'</br>'.$email.'</br>'.$text.'<br>'. $agreement;

//param('text'    , '<p>Заявка на обратный звонок:</p>'.$name.'</br>'.$tel.'</br>'.$email.'</br>'.$text.'<br>'. $agreement);

// от кого
$from = array(
    "Сайт", // Имя отправителя
    "m-style-nt@yandex.ru" // почта отправителя
);
// кому отправка. Можно указывать несколько получателей через запятую
$to = 'm-style-nt@yandex.ru';

// добавляем файлы
//$mailSMTP->addFile("test.jpg");


// отправляем письмо
$result =  $mailSMTP->send($to, $messageSubject, $messageText , $from); 
// $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Отправитель письма');

if($result === true){
    echo 'Сообщение успешно отправлено.';
}
else{
    echo 'Во время отправки возникли какие-то ошибки, проверьте логи для большей информации.' . $result;
}
