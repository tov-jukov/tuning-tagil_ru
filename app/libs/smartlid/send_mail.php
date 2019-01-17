<?php
require_once( 'lib.php');
echo getcwd() . "\n";

function param($name, $default = NULL) {
    return isset($_REQUEST[$name]) ? $_REQUEST[$name] : $default;
}

function html($data) {
    return htmlentities($data);
}

$errors   = [];
$messages = [];
 $SENDER = '0k';//$SENDER = 't@mail.ru';

 $PASS = 'yandexiv325401iv';//'vjqgfhjkm';
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
$messageFrom    = param('from'       , 'k@yandex.ru');//''
$messageTo      = param('to'         , 'k@mail.ru');
//$messageReplyTo = param('reply-to'   , 'fablk@mail.ru');
$messageSubject = param('subject'    , 'Re: очень важная новость');
$messageText    = param('text'       , '<p>Дорогой друг,</p><p>Спешу поделиться радостным известием!</p>');

if ($disableSmtp) {
    unset($config['transports']['smtp']);
}
echo '\n0send';
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