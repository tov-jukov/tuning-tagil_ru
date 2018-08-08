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
 $SENDER = 'tov-jukof';
 $PASS = '2201_2201';

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
$messageFrom    = param('from'       , 'tov-jukof@yandex.ru');//''
$messageTo      = param('to'         , '79826546532@ya.ru');
//$messageReplyTo = param('reply-to'   , '');
$messageSubject = param('subject'    , 'Заявка с сайта');
$messageText    = param('text'       , '<p>Дорогой друг,</p><p>Спешу поделиться радостным известием!</p>');

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
    echo '\nsend1';
    if (Mailer()->sendMessage($message)) {
    echo 'Сообщение успешно отправлено.';
} else {
    echo 'Во время отправки возникли какие-то ошибки, проверьте логи для большей информации.';
}
    echo '\nsend2';
}