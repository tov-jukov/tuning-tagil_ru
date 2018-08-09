// "use strict";
(function ($) {
    var defaults = {
        //******************************* Общие настройки  *******************************

        //** Включить форму обратного звонка? true|false
        callForm: true,

        //** Включить форму c отправкой сообщения? true|false
        requestForm: true,

        // Расположение кнопок: smartlid_left | smartlid_right
        position: ' smartlid_right',

        //** Отслеживание заполнение формы в целях Яндекс Метрики. 
        // XXXXXX - код счеткичка в Метрике
        // SMARTLID - ID цели

        counter: function () {
            // yaCounter40976409.reachGoal('SMARTLID');
        },

        //** Стиливое оформление формы 'dark-space', вскоре появятся и другие цвета
        styleForm: ' dark-space',

        //** Иконка главной кнопки, которая вызывает другие кнопки
        navBtnIcon: '<img src="../libs/smartlid/img/line-menu.svg" height="18" width="18" alt="">',

        //** Иконка кнопки, которая вызывает модальное окно с формой обратного звонка
        callFormBtnIcon: '<img src="../libs/smartlid/img/phone.svg" height="18" width="18" alt="">',

        //** Иконка кнопки, которая вызывает модальное окно с формой отправки сообщения
        requestFormBtnIcon: '<img src="../libs/smartlid/img/envelope.svg" height="18" width="18" alt="">',

        //** Placeholder для полей
        placeholderName: 'Введите ваше имя',
        placeholderPhone: 'Введите ваш телефон',
        placeholderMail: 'Введите ваш email',
        placeholderText: 'Введите ваше сообщение',

        //** Checkbox согласия с разрешением на обработку персональных данных true|false
        agreement: true,

        //** Должен ли быть отмечен checkbox с разрешением на обработку персональных данных по умолчанию? true|false
        agreementIsActive: false,

        //** Cсылка на лицензионное соглашение
        agreementLink: '#',


        //******************************* Настройка формы обратного звонка *******************************

        //** Заголовок формы
        callFormTitle: 'Оставьте ваш номер телефона, и наш консультант свяжется с вами',

        //** Текст кнопки отправляющей форму
        buttonTextCallForm: 'Отправить',

        //** Картинка в модальном окне
        callFormIcon: '../libs/smartlid/img/call.svg',

        //** Включить поле с отправкой файла? true | false
        callFormAddFile: false,


        //******************************* Настройка формы с возможностью отправить сообщение *******************************

        //** Заголовок формы
        requestFormTitle: 'Оставьте сообщение, и наш консультант свяжется с вами',

        //** Текст кнопки отправляющей форму
        buttonTextRequestForm: 'Отправить',

        //** Картинка в модальном окне с формой отправки заявки
        requestFormIcon: '../libs/smartlid/img/mail.svg',

        //** Включить поле с отправкой файла? true | false
        requestFormAddFile: false,

        //** Включить поле с вводом телефона? true | false
        requestFormTelInput: true,

        //******************************* Недоступные для визуального редактора настройки *******************************

        //** Сообщение при заполнении не всех обязательных полей
        attantion: '<p class="smartlid__respond-fail">Внимание! Вы заполнили не все обязательные поля</p>',

        //** Сообщение при ошибке отправки файла
        failfile: '<p class="smartlid__respond-fail">Ошибка отправки файла, попробуйте еще раз</p>',

        //** Сообщение при успешной отправке сообщения
        successmsgs: '<p class="smartlid__respond-success">Спасибо за обращение. Сообщение успешно отправлено</p>',

        //** Сообщение при неудачной отправке письма
        failmsgs: '<p class="smartlid__respond-fail">Сообщение не отправлено, попробуйте еще раз</p>',

        //** Текст ссылки лицензионного соглашения
        agreementText: 'Я <span class="toggle--on">принимаю</span><span class="toggle--off">не принимаю</span> условия пользовательского соглашения',

        //** Определение источника перехода
        referrer: document.referrer,
    };

    var methods = {

        init: function (options) {
            var settings = $.extend(defaults, options);
            methods.setRef();


            return this.each(function () {
                $(this).append(methods.showButtons());
            });
        },

        setRef: function () {
            if ((defaults.referrer).length) {
                var ref = new URL(defaults.referrer);
                if (location.host !== ref.host) {
                    localStorage.setItem('userRef', ref.host);
                }
            } else {
                localStorage.setItem('userRef', 'Не удалось определить источник перехода на сайт');
            }
        },

        createButtons: function () {

            let smartLid = $('<div>').attr({
                class: 'smartlid' + defaults.position
            });

            let smartLidNavButton = $('<button>').attr({
                class: 'smartlid__nav-button',
            }).html(defaults.navBtnIcon);

            let smartLidRounds = $('<span>').attr({
                class: 'smartlid__rings'
            });

            let smartLidModalButtons = $('<div>').attr({
                class: 'smartlid__modal-buttons'
            });

            if (defaults.callForm) {
                let smartLidCallButton = $('<button>');
                smartLidCallButton.attr({
                    class: 'smartlid__call-button',
                }).html(defaults.callFormBtnIcon);
                smartLidModalButtons.append(smartLidCallButton);

                smartLidCallButton.click(function () {
                    methods.showModal(methods.createCallForm().attr('class'));
                });

                // Для вызова модального окна своей ссылкой
                $('.smartlid__call-button_custom').click(function () {
                    methods.showModal(methods.createCallForm().attr('class'));
                });

            };

            if (defaults.requestForm) {
                let smartLidRequestButton = $('<button>');
                smartLidModalButtons.append(smartLidRequestButton);
                smartLidRequestButton.attr({
                    class: 'smartlid__request-button',
                }).html(defaults.requestFormBtnIcon);

                smartLidRequestButton.click(function () {
                    methods.showModal(methods.createRequestForm().attr('class'));
                });
                // Для вызова модального окна своей ссылкой
                $('.smartlid__request-button_custom').click(function () {
                    methods.showModal(methods.createRequestForm().attr('class'));
                });
            };

            if (defaults.contactForm) {
                let smartLidContactButton = $('<button>');
                smartLidModalButtons.append(smartLidContactButton);
                smartLidContactButton.attr({
                    class: 'smartlid__contact-button',
                }).html(defaults.contactAreaBtnIcon);
            };

            smartLidNavButton.click(function () {
                smartLidModalButtons.toggleClass("smartlid_open");
            });

            smartLidRounds.appendTo(smartLidNavButton);
            smartLidRounds.clone().appendTo(smartLidNavButton);
            smartLidRounds.clone().appendTo(smartLidNavButton);
            smartLid.append(smartLidNavButton).append(smartLidModalButtons);

            return smartLid;
        },

        createModal: function (params) {
            let smartLidModal = $('<div>').attr({
                class: 'smartlid__modal' + defaults.styleForm,
            });

            if (params == methods.createCallForm().attr('class')) {
                setTimeout(function () {
                    smartLidModal.fadeIn(function () {
                        $(this).append(methods.createCallForm().addClass('smartlid__form_open').append(methods.closeModal(smartLidModal)));
                    });
                }, 500);
            };

            setTimeout(() => {
                smartLidModal.addClass('smartlid__modal_open');
            }, 1000);

            if (params == methods.createRequestForm().attr('class')) {
                setTimeout(function () {
                    smartLidModal.fadeIn(function () {
                        $(this).append(methods.createRequestForm().addClass('smartlid__form_open').append(methods.closeModal(smartLidModal)));
                    });
                }, 500);
            };

            return smartLidModal;
        },

        closeModal: function (smartLidModal) {

            let smartLidCloseButton = $('<button>').attr({
                class: 'smartlid__close-button',
            }).html('×');

            smartLidCloseButton.click(function (event) {
                event.preventDefault();
                smartLidModal.fadeOut(function () {
                    $(this).remove();
                })
            });

            $(smartLidModal).mouseup(function (e) {
                var div = $(".smartlid__form");
                if (!div.is(e.target) &&
                    div.has(e.target).length === 0) {
                    smartLidModal.fadeOut(function () {
                        $(this).remove();
                    });
                };
            });

            return smartLidCloseButton;
        },

        autoCloseModal: function (params) {

        },

        createCallForm: function () {
            let callForm = $('<form>').attr({
                class: 'smartlid__form smartlid__form_call',
                method: 'POST',
                id: 'callForm',
                autocomplete: 'off',
                enctype: 'multipart/form-data',
            });

            let formImages = $('<img>').attr({
                class: 'smartlid__form-icon',
                alt: 'Обратный звонок',
                src: defaults.callFormIcon,
                width: 100,
            });

            let formTitle = $('<div>').attr({
                    class: 'smartlid__form-title'
                })
                .append($('<p>').attr({
                    class: 'smartlid__default-msgs'
                }).html(defaults.callFormTitle))
                .append($('<div>').attr({
                    class: 'smartlid__respond-msgs'
                }))
                .append($('<div>').attr({
                    class: 'smartlid__preloader'
                }));

            let inpName = $('<input>').attr({
                class: 'smartlid__input smartlid__input_name',
                type: 'text',
                name: 'name',
                placeholder: defaults.placeholderName,
            });

            let inpTel = $('<input>').attr({
                class: 'smartlid__input smartlid__input_tel',
                type: 'tel',
                name: 'tel',
                placeholder: defaults.placeholderPhone,
            });

            let inpRef = $('<input>').attr({
                class: 'smartlid__input smartlid__input_ref',
                type: 'hidden',
                name: 'ref',
                value: localStorage.getItem('userRef'),
            });



            if (defaults.agreement) {
                var checkboxWrapper = $('<div>').attr({
                    class: 'smartlid__checkbox-wrapper'
                });

                var inpCheckbox = $('<input>').attr({
                    class: 'smartlid__checkbox smartlid__checkbox_agreement',
                    type: 'checkbox',
                    name: 'agreement',
                    id: 'smartlid__checkbox_agreement',
                    value: 'Принимаю',
                    checked: defaults.agreementIsActive,
                });

                let inputCheckboxLabel = $('<label>').attr({
                    for: 'smartlid__checkbox_agreement',
                    class: 'smartlid__label smartlid__label_agreement'
                });

                let checkboxLink = $('<a>').attr({
                    class: 'agreement-link',
                    href: defaults.agreementLink,
                    target: '_blank'

                }).html(defaults.agreementText);

                checkboxWrapper.append(inpCheckbox).append(inputCheckboxLabel.append(checkboxLink));
            };

            if (defaults.callFormAddFile) {
                var fileWrapper = $('<div>').attr({
                    class: 'smartlid__file-wrapper'
                });
                var fileName = $('<input>').attr({
                    class: 'smartlid__input smartlid__file-name',
                    placeholder: 'Прикрепить файл',
                    disabled: 'disabled',
                });
                let inputFileLabel = $('<label>').attr({
                    for: 'smartlid__input_file',
                    class: 'smartlid__label smartlid__label_file'
                }).html('Выбрать');

                let inpFile = $('<input>').attr({
                    class: 'smartlid__input smartlid__input_file',
                    type: 'file',
                    name: 'files[]',
                    id: 'smartlid__input_file'
                }).change(function () {
                    fileName.val($(this).val().replace(/.*\\/, ""));
                });
                fileWrapper.append(fileName).append(inputFileLabel).append(inpFile);
                // fileWrapper.hide();
            }

            let formButton = $('<button>').attr({
                class: 'smartlid__form-button',
                type: 'submit',
                name: 'sendingForm'
            }).html(defaults.buttonTextCallForm);

            formButton.click(function (event) {
                event.preventDefault();
                if (defaults.agreement) {
                    if (inpCheckbox.is(":checked")) {
                        methods.sendMail($(callForm).attr('id'));
                    } else {
                        formTitle.find('.smartlid__default-msgs').css('display', 'none');
                        formTitle.find('.smartlid__respond-msgs').html('<p class="smartlid__respond-fail">Вы не приняли условия пользовательского соглашения</p>');
                        setTimeout(() => {
                            formTitle.find('.smartlid__default-msgs').css('display', 'block');
                            formTitle.find('.smartlid__respond-msgs').html('');
                        }, 4000);
                    }
                } else {
                    methods.sendMail($(callForm).attr('id'));
                }
            });

            callForm.append(formImages).append(formTitle).append(inpName).append(inpTel).append(inpRef).append(fileWrapper).append(checkboxWrapper).append(formButton);

            return callForm;
        },

        createRequestForm: function () {
            let requestForm = $('<form>').attr({
                class: 'smartlid__form smartlid__form_request',
                method: 'POST',
                id: 'requestForm',
                autocomplete: 'off',
                enctype: 'multipart/form-data'
            });

            let formImages = $('<img>').attr({
                class: 'smartlid__form-icon',
                alt: 'Форма обратной связи',
                src: defaults.requestFormIcon,
                width: 100,
            });

            let formTitle = $('<div>').attr({
                    class: 'smartlid__form-title'
                })
                .append($('<p>').attr({
                    class: 'smartlid__default-msgs'
                }).html(defaults.requestFormTitle))
                .append($('<div>').attr({
                    class: 'smartlid__respond-msgs'
                }))
                .append($('<div>').attr({
                    class: 'smartlid__preloader'
                }));

            let inpName = $('<input>').attr({
                class: 'smartlid__input smartlid__input_name',
                type: 'text',
                name: 'name',
                placeholder: defaults.placeholderName,
            });
            if (defaults.requestFormTelInput) {
                var inpTel = $('<input>').attr({
                    class: 'smartlid__input smartlid__input_tel',
                    type: 'tel',
                    name: 'tel',
                    placeholder: defaults.placeholderPhone,
                });
            }

            let inpMail = $('<input>').attr({
                class: 'smartlid__input smartlid__input_mail',
                type: 'email',
                name: 'email',
                placeholder: defaults.placeholderMail,
            });

            let inpText = $('<textarea>').attr({
                class: 'smartlid__input smartlid__input_text',
                placeholder: defaults.placeholderText,
                name: 'text'
            });

            let inpRef = $('<input>').attr({
                class: 'smartlid__input smartlid__input_ref',
                type: 'hidden',
                name: 'ref',
                value: localStorage.getItem('userRef'),
            });

            if (defaults.agreement) {
                var checkboxWrapper = $('<div>').attr({
                    class: 'smartlid__checkbox-wrapper'
                });

                var inpCheckbox = $('<input>').attr({
                    class: 'smartlid__checkbox smartlid__checkbox_agreement',
                    type: 'checkbox',
                    name: 'agreement',
                    value: 'Принимаю',
                    id: 'smartlid__checkbox_agreement'
                });

                let inputCheckboxLabel = $('<label>').attr({
                    for: 'smartlid__checkbox_agreement',
                    class: 'smartlid__label smartlid__label_agreement'
                });

                let checkboxLink = $('<a>').attr({
                    class: 'agreement-link',
                    href: defaults.agreementLink,
                    target: '_blank'

                }).html(defaults.agreementText);

                checkboxWrapper.append(inpCheckbox).append(inputCheckboxLabel.append(checkboxLink));
            };

            if (defaults.requestFormAddFile) {
                var fileWrapper = $('<div>').attr({
                    class: 'smartlid__file-wrapper'
                });
                var fileName = $('<input>').attr({
                    class: 'smartlid__input smartlid__file-name',
                    placeholder: 'Прикрепить файл',
                    disabled: 'disabled',
                });
                let inputFileLabel = $('<label>').attr({
                    for: 'smartlid__input_file',
                    class: 'smartlid__label smartlid__label_file'
                }).html('Выбрать');

                let inpFile = $('<input>').attr({
                    class: 'smartlid__input smartlid__input_file',
                    type: 'file',
                    name: 'files[]',
                    id: 'smartlid__input_file'
                }).change(function () {
                    fileName.val($(this).val().replace(/.*\\/, ""));
                });
                fileWrapper.append(fileName).append(inputFileLabel).append(inpFile);
                // fileWrapper.hide();
            }

            let formButton = $('<button>').attr({
                class: 'smartlid__form-button',
                type: 'submit',
                name: 'sendingForm'
            }).html(defaults.buttonTextRequestForm);

            formButton.click(function (event) {
                event.preventDefault();
                if (defaults.agreement) {
                    if (inpCheckbox.is(":checked")) {
                        methods.sendMail($(requestForm).attr('id'));
                    } else {
                        formTitle.find('.smartlid__default-msgs').css('display', 'none');
                        formTitle.find('.smartlid__respond-msgs').html('<p class="smartlid__respond-fail">Вы не приняли условия пользовательского соглашения</p>');
                        setTimeout(() => {
                            formTitle.find('.smartlid__default-msgs').css('display', 'block');
                            formTitle.find('.smartlid__respond-msgs').html('');
                        }, 4000);
                    }
                } else {
                    methods.sendMail($(requestForm).attr('id'));
                }

            });

            requestForm.append(formImages).append(formTitle).append(inpName).append(inpTel).append(inpMail).append(inpRef).append(fileWrapper).append(inpText).append(checkboxWrapper).append(formButton);

            return requestForm;
        },

        sendMail: function (formid) {
            var formId = "#" + formid;
            var fd = new FormData(document.querySelector(formId));

            $.ajax({
                url: "/libs/smartlid/sender.php",
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                beforeSend: function () {

                    $(formId).find('.smartlid__preloader').css('display', 'block');
                    $(formId).find('.smartlid__default-msgs').css('display', 'none');
                    $(formId).find('.smartlid__form-button').prop('disabled', true);
                    $(formId).find('.smartlid__respond-msgs').html('Отправка письма');
                },
                success: function (data) {
                    $(formId).find('.smartlid__preloader').css('display', 'none');
                    switch (data) {
                        case 'attantion':
                            $(formId).find('.smartlid__respond-msgs').html('').append(defaults.attantion);
                            break;
                        case 'successmsgs':
                            $(formId).find('.smartlid__respond-msgs').html('').append(defaults.successmsgs);
                            break;
                        case 'failmsgs':
                            $(formId).find('.smartlid__respond-msgs').html('').append(defaults.failmsgs);
                            break;
                        case 'failfile':
                            $(formId).find('.smartlid__respond-msgs').html('').append(defaults.failfile);
                            break;
                    }

                    setTimeout(() => {
                        $(formId).find('.smartlid__default-msgs').css('display', 'block');
                        $(formId).find('.smartlid__respond-msgs').html('');
                        $(formId).find('.smartlid__form-button').prop("disabled", false);

                    }, 4000);

                },
                complete: function (data) {
                    if (data.responseText == 'successmsgs') {
                        $(formId).find($('input').not(':input[type=hidden]')).val('');
                        $(formId).find($('textarea').val(''));
                    }
                    defaults.counter();
                },

            });
        },

        showModal: function (formClass) {

            return $('body').append(methods.createModal(formClass));
        },

        showButtons: function () {

            return methods.createButtons();
        },
    };
    
    $.fn.smartLid = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод ' + method + ' не найден');
        }
    };
}(jQuery));