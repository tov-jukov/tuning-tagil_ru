$(function() {
console.log("ready?");
// прелоадер
$(".preloader").fadeOut("slow");

// плавный переход по ссылкам [----

$('a[href^="#"]:not(.menu-trigger)').on('click', function(event) {
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

    // $('.menu-trigger').click(function() {
    //     $('.smenu').slideToggle(500);
    // console.log("нажали")
    // });//end slide toggle
    
    // $(window).resize(function() {		
    //         if (  $(window).width() > 500 ) {			
    //             $('nav ul').removeAttr('style');
    //         }
    // });//end resize

    $(".menu-trigger").click(function(){
        console.log("click");
         $("nav ul").slideToggle(500);
    });

    $(window).resize(function() {     
        if (  $(window).width() > 500 ) {           
            $('nav ul').removeAttr('style');
         }
    });//end resize


});

// $(".toggle-mnu").click(function() {
//     $(this).toggleClass("on");
//     // $(".main-mnu").slideToggle();
//     return false;
// });

// $(document).ready(function() {

// });//end ready
