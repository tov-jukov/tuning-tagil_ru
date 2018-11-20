<?php

require_once( '../ApMailer/src/lib.php');

function param($name, $default = NULL) {
    return isset($_REQUEST[$name]) ? $_REQUEST[$name] : $default;
}

function html($data) {
    return htmlentities($data);
}

$errors   = [];
$messages = [];
$SENDER = 'm-style-nt';
$PASS = 'vcnbkmgfhjkm';

$defaultConfig = [
    'defaultFrom' => $SENDER,
    'onError'     => function($error) use (&$errors) { $errors[] = $error; echo '\n'.$error;},
    'afterSend'   => function($text) use (&$messages) { $messages[] = $text; echo '\n'.$text;},
    'transports'  => [
        
        'smtp' => ['smtp', 'host' => 'smtp.yandex.ru', 'ssl' => 'true', 'port' => '465', 'login' =>  $SENDER, 'password' => $PASS],
    ],
];

//'file' => ['file', 'dir'  => 'mails'],

$config = array_replace_recursive($defaultConfig, param('config', []));

$configValue = function ($key, $default = NULL) use ($config) {
    $key = '["'. strtr($key, ['.' => '"]["']) .'"]';
    return eval("return isset(\$config$key) ? \$config$key : \$default;");
};

$disableSmtp    = param('disableSmtp', false);
$messageFrom    = param('from'       , 'm-style-nt@yandex.ru');
//''
$messageTo      = param('to'         , 'm-style-nt@yandex.ru');
//$messageReplyTo = param('reply-to'   , '');
$file = 'logFile.txt';
//Добавим разделитель, чтобы мы смогли отличить каждую запись
/* temp file log - 1
$text = '=======================\n';
$text .= print_r('Вместо текста сюда можно прописать переменную!');
$text .= '\n';
$fOpen = fopen($file,'a'); //Открываем файл или создаём если его нет

fwrite($fOpen, $_SERVER["REQUEST_METHOD"]); //Записываем
fwrite($fOpen, $_POST['name']); //Записываем
fwrite($fOpen, $_POST['tel']); //Записываем
*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
$name = "<b>Имя: </b>" . strip_tags($_POST['name']) . "<br>";
$tel = "<b>Телефон: </b> " . strip_tags($_POST['tel']) . "<br>";
$email = "<b>Почта: </b> " . strip_tags($_POST['email']) . "<br>";
$text = "<b>Сообщение: </b> " . strip_tags($_POST['text']) . "<br>";
}
echo '<pre>';
var_dump($_POST)
echo '</pre>';
$agreement = "<br>Отправитель дал согласие на обработку персональных данных</b>";

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
//     if (isset($_POST['name']) ) {
//         if( empty($_POST['name'])) {
//             echo 'attantion';
//             die;
//         } else {
//             if (!empty($_POST['name'])) {
//                 $name = "<b>Имя: </b>" . strip_tags($_POST['name']) . "<br>";
//             }
            
//         }
//     }

//     if (isset($_POST['tel']) ) {
//         if( empty($_POST['tel'])) {
//             echo 'attantion';
//             die;
//         } else {
//             if (!empty($_POST['tel'])) {
//                 $tel = "<b>Телефон: </b> " . strip_tags($_POST['tel']) . "<br>";
//             }
//         }
//     }

//     if (isset($_POST['email']) ) {
//         if( empty($_POST['email'])) {
//             echo 'attantion';
//             die;
//         } else {
//             if (!empty($_POST['email'])) {
//                 $email = "<b>Почта: </b> " . strip_tags($_POST['email']) . "<br>";
//             }
//         } 
//     }
    
//     if (isset($_POST['agreement'])) {
//         $agreement = "<br><b>Даю согласие на обработку персональных данных</b>";
//     }  
        
    
    
//     if (isset($_POST['text'])) {
//         if (!empty($_POST['text'])) {
//             $text = "<b>Сообщение: </b> " . strip_tags($_POST['text']) . "<br>";
//         }
//     }

// }
/* temp file log - 2
fclose($fOpen);
*/
$messageSubject = param('subject' , 'Заявка с сайта');
$messageText    = param('text'    , '<p>Дорогой друг,</p><p>Спешу поделиться радостным известием!</p>'.$name.'</br>'.$tel.'</br>'.$email.'</br>'.$text.'<br>'. $agreement);

if ($disableSmtp) {
    unset($config['transports']['smtp']);
}

if (true) {
    Mailer()->init($config);
    
    $message = Mailer()->newHtmlMessage();
    
    if ($messageSubject) {
        $message->setSubject($messageSubject);
    }
    
    if ($messageFrom) {
        $message->setSenderEmail($messageFrom);
    }
    
    if ($messageTo) {
        $message->addRecipient($messageTo);
    }
    
    /*if ($messageReplyTo) {
        $message->addReplyTo($messageReplyTo);
    }*/
    
    //$message->addContent(file_get_contents('mail-header.html'));
    $message->addContent($messageText);
    //$message->addContent(file_get_contents('mail-footer.html'));
    //$message->addRelatedFile('signature.png');
    
    /*if (isset($_FILES['attachment']['size']) && $_FILES['attachment']['size'] > 0) {
        $message->addAttachmentFile(
            $_FILES['attachment']['tmp_name'], 
            $_FILES['attachment']['name'], 
            $_FILES['attachment']['type']
        );
    }*/
    
    if (Mailer()->sendMessage($message)) {
    echo 'Сообщение успешно отправлено.';
} else {
    echo 'Во время отправки возникли какие-то ошибки, проверьте логи для большей информации.';
}
 
}