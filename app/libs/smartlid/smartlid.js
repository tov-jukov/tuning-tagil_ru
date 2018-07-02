(function () {
  // Опции
  // Подключен ли к сайту fontawesome - иконический шрифт. Если нет, то будут выводиться обычные картинки.
  // true - подключен, false - не подключен

  var fontAwesome = false;

  // Путь к картинкам, если не подулючен к сайту fontawesome
  if (!fontAwesome) {
    var callFormIcon = '<img src="../libs/smartlid/img/phone.svg" height="16">';
    var requestFormIcon = '<img src="../libs/smartlid/img/envelope.svg" height="16">';
    var basketFormIcon = '<img src="../libs/smartlid/img/phone.svg" height="16">';
  }

  // Подключение формы обратного звонка
  // true - выводить формы, false - не выводить
  var callForm = true;

  // Подключение формы с возможностью отправить сообщение
  // true - выводить формы, false - не выводить
  var requestForm = true;

  // Подключение корзины к landing page (пока не реализовано)
  // true - выводить формы, false - не выводить
  var basketForm = false;

  // Внешний вид форм (стилевое оформление) -- 
  //  'dark-space', 'maya-the-bee'
  var styleForm = 'dark-space';

  // Заголовок формы для заказа обратного звонка
  var callFormTitle = "Закажите обратный звонок, и наш консультант свяжется с вами";
  // Путь к иконке формы для заказа обратного звонка
  var callFormImg = '<img src="../libs/smartlid/img/call.svg">';

  // Заголовок формы для отправки заявки (сообщения)
  var requestFormTitle = "Оставьте заявку, и наш консультант свяжется с вами";
  // Путь к иконке формы для отправки заявки (сообщения)
  var requestFormImg = '<img src="../libs/smartlid/img/mail.svg">';

  // Заголовок формы с корзиной покупок (не реализовано)
  //var basketFormTitle = "Корзина";

  // placeholder для ввода имени
  var placeHolderName = "Введите ваше имя";

  //Обязательно ли поле с именем для заполнения? true - да, false - нет;
  var requiredName = true;

  // placeholder для ввода телефона
  var placeHolderTel = "Введите ваш телефон";

  //Обязательно ли поле с телефоном для заполнения? true - да, false - нет;
  var requiredTel = true;

  // placeholder для ввода почты
  var placeHolderMail = "Введите ваш email";

  //Обязательно ли поле с вводом почты для заполнения? true - да, false - нет;
  var requiredMail = true;

  // placeholder для ввода сообщения
  var placeHolderText = "Введите сообщение";
  //Обязательно ли поле с вводом текста/комментарием для заполнения? true - да, false - нет;
  var requiredText = false;

  // Конец настроек

  var quantityElements = callForm + requestForm + basketForm;
  var styleOverlay = styleForm + '-overlay';
  var sourse = document.referrer;

  var view = {

    displayButton: function (div) {
      $('body').append(div);
    },

    displayOverlay: function (overlay) {
      $('body').append(overlay);
    },

    displayCallForm: function (div) {
      $('body').append(div);
    },

    displayRequestForm: function (div) {
      $('body').append(div);
    },

    displayAnswerForm: function (data, message, formTitle) {
      message.html(data);
      console.log(data);
      formTitle.css("display", "none");
      setTimeout(function () {
        formTitle.css("display", "block");
        message.html('');
        console.log(data);
      }, 3000);
    }
  };

  var controller = {
    sendForm: function () {
      $('.sl-form').submit(function () {
        // Получение ID формы
        var formID = $(this).attr('id');
        // Добавление решётки к имени ID
        var formNm = $('#' + formID);
        var message = $(formNm).find(".msgs");
        var formTitle = $(formNm).find(".form-title--title");
        $.ajax({
          type: "POST",
          url: 'smartlid/php/mail.php',
          data: formNm.serialize(),
          success: function (data) {
            // Вывод сообщения об успешной отправке или ошибке на стороне клиента
            view.displayAnswerForm(data, message, formTitle);
          },
          error: function (jqXHR, text, error) {
            // Вывод сообщения об ошибке отправки на стороне сервера
            $('.msgs').html(error);
            $('.formTitle').css("display", "none");
            setTimeout(function () {
              $('.formTitle').css("display", "block");
              $('.msgs').html('');
            }, 3000);
          },
          complete: function (data) {
            $('input').not(':input[type=submit], :input[type=hidden]').val('');
            $('textarea').val('');
          }
        });
        return false;
      });
    },
    setFormInfo: function () {
      $(".sl-form--button").click(function () {
        $("input[name*='formInfo']").val($(this).attr("title"));
      });
    },

    setFormReferer: function () {
      $(".sl-form--button").click(function () {
        $("input[name*='formReferer']").val(sourse);
      });
    }
  };

  var model = {
    fa: fontAwesome,
    cf: callForm,
    rf: requestForm,
    rft: requestFormTitle,
    bf: basketForm,
    style: styleForm + ' sl-form--wrapper',


    createButton: function () {

      var div = $('<div>');
      var input = $('<input>');
      var label = $('<label>');
      var ul = $('<ul>');
      var li = $('<li>');
      var a = $('<a>');
      var span = $('<span>');

      div.append(input).append(label).append(ul);

      div.attr({
        id: 'smartLidBtn',
        class: 'smartLidBtn'
      });
      input.attr({
        id: 'toggle-input',
        class: 'toggle-input',
        type: 'checkbox'
      });

      label.attr({
        for: 'toggle-input'
      });
      if (this.fa) {
        label.attr('class', 'toggle');
      } else {
        label.attr('class', 'toggle-img');
      }
      span.attr('class', 'rings');
      label.append(span);
      span.clone().appendTo(label);
      span.clone().appendTo(label);
      ul.attr('class', 'btn-list');

      for (var i = 1; i <= quantityElements; i++) {
        var li = $('<li>');
        var a = $('<a>');
        ul.append(li);
        li.append(a);
        if (this.cf && i == 1) {
          li.attr('class', 'callForm');
          a.attr('href', '#sl-overlay-cf');
          if (this.fa) {
            a.html('<i class="fa fa-phone" aria-hidden="true"></i>');
          } else {

            a.attr('class', 'call-form--link');
            a.html(callFormIcon);
          }
          var item = 'sl-overlay-cf';
          this.createOverlay(item);
          continue;
        }
        if ((this.rf && i == 2 && this.cf) || (this.rf && this.cf == false && i == 1)) {
          li.attr('class', 'requestForm');
          a.attr('href', '#sl-overlay-rf');
          if (this.fa) {
            a.html('<i class="fa fa-envelope-o" aria-hidden="true"></i>');
          } else {
            a.html(requestFormIcon);
            a.attr('class', 'call-form--link');
          };
          var item = 'sl-overlay-rf';
          this.createOverlay(item);
          continue;
        }
        if ((this.bf && i == 3 && this.rf && this.cf) || (this.bf && this.rf == false && this.cf == false && i == 1) || (this.bf && (this.cf == false || this.rf == false) && i == 2)) {
          li.attr('class', 'basketForm');
          a.attr('href', '#sl-overlay-bf');
          if (this.fa) {
            a.html('<i class="fa fa-shopping-basket" aria-hidden="true"></i>');
          } else {
            a.html(basketFormIcon);
            a.attr('class', 'call-form--link');
          }
          var item = 'sl-overlay-bf';
          this.createOverlay(item);
          break;
        }
      }
      view.displayButton(div);
    },

    createOverlay: function (item) {
      var overlay = $('<div>').appendTo('body');
      overlay.attr({
        id: item,
        class: 'sl-overlay',
      });

      overlay.addClass(styleOverlay);



      switch (item) {
      case 'sl-overlay-cf':
        overlay.append(this.createCallForm());
        break;
      case 'sl-overlay-rf':
        overlay.append(this.createRequestForm());
        break;
      case 'sl-overlay-bf':
        overlay.append(this.createBasketForm());
        break;
      }

      view.displayOverlay(overlay);

    },

    createRequestForm: function () {
      if (this.rf) {
        var div = $('<div>');
        var p = $('<p>');
        var form = $('<form>');
        var formTitle = $('<div>');
        var inpName = $('<input>');
        var inpMail = $('<input>');
        var inpText = $('<textarea>');
        var formInfo = $('<input>');
        var formReferer = $('<input>');
        var formBtn = $('<button>');
        var formTitleIcon = $('<div>');
        var formTitleText = $('<div>');
        var a = $('<a>');
        var msgs = $('<div>');
        var copyright = $('<p>');
        var copyrightLink = $('<a>');

        div.append(form);
        form.append(formTitle);
        form.append(msgs);
        formTitle.append(formTitleIcon);
        formTitle.append(formTitleText);
        formTitleText.append(p);
        p.html(requestFormTitle);
        p.attr('class', 'form-title--title');

        msgs.attr('class', 'msgs');

        form.append(inpName).append(inpMail).append(inpText).append(formInfo).append(formReferer).append(formBtn).append(a);
        div.append(copyright);
        copyright.append(copyrightLink);


        a.attr({
          class: 'sl-overlay--close',
          href: '#modal-close'
        }).html('×');

        div.attr('class', this.style);
        form.attr({
          method: 'POST',
          id: 'secondForm',
          class: 'sl-form',
          autocomplete: 'off'
        });

        formTitleIcon.attr('class', 'form-title--icon').html(requestFormImg);
        formTitleText.attr('class', 'form-title--text');
        inpName.attr({
          type: 'text',
          name: 'uname',
          class: 'sl-form--input',
          placeholder: placeHolderName,
        });

        if (requiredName) {
          inpName.attr('required', 'required');
        }

        inpMail.attr({
          type: 'email',
          name: 'uemail',
          class: 'sl-form--input',
          placeholder: placeHolderMail,

        });
        if (requiredMail) {
          inpMail.attr('required', 'required');
        }
        inpText.attr({
          type: 'text',
          name: 'utext',
          class: 'sl-form--input',
          placeholder: placeHolderText
        });
        if (requiredText) {
          inpText.attr('required', 'required');
        }


        formInfo.attr({
          type: 'hidden',
          name: 'formInfo'
        });

        formReferer.attr({
          type: 'hidden',
          name: 'formReferer'
        });

        formBtn.attr({
          class: 'sl-form--button',
          title: 'Заявка с сайта',
          type: 'submit'
        });

        copyright.attr('class', 'copyright-wprapper');
        copyrightLink.attr({
          href: 'http://smartlanding.biz/smartlid',
        }).html('SmartLid');
        formBtn.html('Отправить');

        view.displayRequestForm(div);
        controller.setFormInfo();
        controller.setFormReferer();
        controller.sendForm();
        return div;
      };
    },

    createCallForm: function () {
      if (this.cf) {
        var div = $('<div>');
        var p = $('<p>');
        var form = $('<form>');
        var formTitle = $('<div>');
        var inpName = $('<input>');
        var inpTell = $('<input>');
        var formInfo = $('<input>');
        var formReferer = $('<input>');
        var formBtn = $('<button>');
        var formTitleIcon = $('<div>');
        var formTitleText = $('<div>');
        var a = $('<a>');
        var msgs = $('<div>');
        var copyright = $('<p>');
        var copyrightLink = $('<a>');

        div.append(form).append(copyright);
        div.attr('class', this.style);
        form.append(formTitle).append(msgs).append(inpName).append(inpTell).append(formInfo).append(formReferer).append(formBtn).append(a);
        formTitle.append(formTitleIcon).append(formTitleText);
        formTitleText.append(p);
        p.html(callFormTitle).attr('class', 'form-title--title');
        msgs.attr('class', 'msgs');



        copyright.append(copyrightLink);

        a.attr({
          class: 'sl-overlay--close',
          href: '#modal-close'
        }).html('×');


        form.attr({
          method: 'POST',
          id: 'firstForm',
          class: 'sl-form',
          class: 'sl-form',
          autocomplete: 'off'
        });

        formTitleIcon.attr({
          class: 'form-title--icon'
        }).html(callFormImg);
        formTitleText.attr('class', 'form-title--text');

        inpName.attr({
          type: 'text',
          name: 'uname',
          class: 'sl-form--input',
          placeholder: placeHolderName
        });

        if (requiredName) {
          inpName.attr('required', 'required');
        }
        inpTell.attr({
          type: 'tel',
          name: 'uphone',
          class: 'sl-form--input',
          pattern: '^[ 0-9]+$',
          placeholder: placeHolderTel
        });

        if (requiredTel) {
          inpTell.attr('required', 'required');
        }

        formInfo.attr({
          type: 'hidden',
          name: 'formInfo'
        });

        formReferer.attr({
          type: 'hidden',
          name: 'formReferer'
        });

        formBtn.attr({
          class: 'sl-form--button',
          title: 'Заказали обратный звонок',
          type: 'submit'
        });

        copyright.attr('class', 'copyright-wprapper');
        copyrightLink.attr({
          href: 'http://smartlanding.biz/smartlid',
        }).html('SmartLid');

        formBtn.html("Отправить");

        view.displayCallForm(div);
        controller.setFormInfo();
        controller.setFormReferer();
        controller.sendForm();
        return div;
      };
    }
  };
  model.createButton();
})();

