<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/libs/smartlid/php/phpmailer/phpmailer.php');
    
    // Основные настройки для отправки письма
     
    // *********** Если используете SMTP

    // ** Пример для SMTP-YANDEX.
    //const HOST = 'ssl://smtp.yandex.ru';
    //const LOGIN = 'tov-jukof@ya.ru';
    //const PASS = '2201_2201';
    //const PORT = 465;


    /// ** Пример для SMTP-MAIL.RU
    // const HOST = 'ssl://smtp.mail.ru';
    // const LOGIN = 'sender@mail.ru';
    // const PASS = 'XXXXXXXXXXX';
    // const PORT = 465;




    // ** Раскомментируйте (уберите слеши) и заполните данные, как в примере выше, а также не забудьте раскоментировать строку с require_once...
    
    // const HOST = '';
    // const LOGIN = '';
    // const PASS = '';
    // const PORT = '';
    // require_once($_SERVER['DOCUMENT_ROOT'] . '/smartlid/php/phpmailer/smtp.php');
    const SENDER = 'tov-jukof@ya.ru';
    const CATCHER = 'tov_jukov@mail.ru';
    //const CATCHER2 = 'tov_jukov@mail.ru';
    const SUBJECT = 'Заявка с сайта';
    const SUCCESSMSGS = 'Спасибо за обращение. Сообщение успешно отправлено';
    const FAILMSGS = 'Сообщение не отправлено, попробуйте еще раз';
    const FAILFILE = 'Ошибка отправки файла, попробуйте еще раз';
    const ATTENTION = 'Внимание! Вы заполнили не все обязательные поля';
    const AGREMENTATTANTION = 'Вы не приняли условия пользовательского соглашения';
    const CHARSET = 'UTF-8';


    // const CATCHER2 = 'catcher2@list.ru';
   

    $nameIsRequired = false;
    $telIsRequired = true;
    $emailIsRequired = true;
    // $textIsRequired = false;
    ?>