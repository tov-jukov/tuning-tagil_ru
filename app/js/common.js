$(function() {




// прелоадер
$(".preloader").fadeOut("slow");

// плавный переход по ссылкам [----

$('a[href^="#"]').on('click', function(event) {
    // отменяем стандартное действие
    event.preventDefault();
    
    var sc = $(this).attr("href"),
        dn = $(sc).offset().top;
    /*
    * sc - в переменную заносим информацию о том, к какому блоку надо перейти
    * dn - определяем положение блока на странице
    */
    
    $('html, body').animate({scrollTop: dn}, 1000);
    
    /*
    * 1000 скорость перехода в миллисекундах
    */
  });

// ----]




});

$(".toggle-mnu").click(function() {
    $(this).toggleClass("on");
    // $(".main-mnu").slideToggle();
    return false;
});

$(document).ready(function() {
    $('.menu-trigger').click(function() {
      $('nav ul').slideToggle(500);
    });//end slide toggle
    
    $(window).resize(function() {		
          if (  $(window).width() > 500 ) {			
              $('nav ul').removeAttr('style');
           }
      });//end resize
});//end ready