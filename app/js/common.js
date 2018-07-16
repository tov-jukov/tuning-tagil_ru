$(function() {
//console.log("ready?");

// прелоадер
$(".preloader").fadeOut("slow");

// плавный переход по ссылкам [----

$('a[href^="#"]:not(.menu-trigger,.button-red,.call-form--link,.sl-overlay--close)').on('click', function(event) {
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
        //console.log("click");
         $("nav ul").slideToggle(500);
    });

    $(window).resize(function() {
        if (  $(window).width() > 800 ) { 
            $('nav ul').removeAttr('style');
         }
    });
    //end resize


   // gallery



    $('#jg0').justifiedGallery({
        rowHeight : 200,
        justifyThreshold: 0.75,
        lastRow : 'justify',
        captions: false,
        randomize: false,
        margins : 10,
        waitThumbnailsLoad: false,
        selector:'figure, div:not(.spinner)'
    });

    // $('#tj0').justifiedGallery().on('jg.complete', function (e) {
    //     photoSwipe();
    // });


    // sizeRangeSuffixes: {
    //     100 : '_t', // used with images which are less than 100px on the longest side
    //     240 : '_m', // used with images which are between 100px and 240px on the longest side
    //     320 : '_n', // ...
    //     500 : '',
    //     640 : '_z',
    //     1024 : '_b' // used which images that are more than 640px on the longest side
    // },




});

//------------------


$( document ).ready(function() {
    var items = []; // array of slide objects that will be passed to PhotoSwipe()
    // for every figure element on the page:
    $('figure').each( function() {
      // get properties from child a/img/figcaption elements,
      var $figure = $(this),
        $a    = $figure.find('a'),
        $src  = $a.attr('href'),
        $title  = $figure.find('figcaption').html(),
        $msrc = $figure.find('img').attr('src');
      // if data-size on <a> tag is set, read it and create an item
      if ($a.data('size')) {
        var $size   = $a.data('size').split('x');
        console.log( $size);
        console.log( $a.data('size'));
        var item = {
          src   : $src,
          w   : $size[0],
          h     : $size[1],
          title   : $title,
          msrc  : $msrc
        };
      // if not, set temp default size then load the image to check actual size
      } else {
        var item = {
          src   : $src,
          w   : 800, // temp default size
          h     : 600, // temp default size
          title   : $title,
          msrc  : $msrc
        };
        // load the image to check its dimensions
        // update the item as soon as w and h are known (check every 30ms)
        var img = new Image(); 
        img.src = $src;
        var wait = setInterval(function() {
          var w = img.naturalWidth,
            h = img.naturalHeight;
          if (w && h) {
            clearInterval(wait);
            item.w = w;
            item.h = h;
          }
        }, 30);
        }
      // Save the index of this image then add it to the array
      var index = items.length;
      items.push(item);
      // Event handler for click on a figure
      $figure.on('click', function(event) {
        event.preventDefault(); // prevent the normal behaviour i.e. load the <a> hyperlink
        // Get the PSWP element and initialise it with the desired options
        var $pswp = $('.pswp')[0];
        var options = {
          index: index, 
          bgOpacity: 0.8,
          showHideOpacity: true
        }
        new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options).init();
      }); 
    });
  });























//-----------------

// $(".toggle-mnu").click(function() {
//     $(this).toggleClass("on");
//     // $(".main-mnu").slideToggle();
//     return false;
// });

// $(document).ready(function() {

// });//end ready

// function photoSwipe() {
//     var items = [];

//     $('.mason__item').each(function() {
//         var $pic = $(this);
//         var $pswp = $('.pswp')[0];
//         console.log($pic.data('size2'))

//         // Get the details (src, width, height) for each image and save them in an array
//         // $pic.each(function() {
//             var $href   = $(this).data('href'),
//                 $size   = $(this).data('dimensions').split('x'),
//                 $width  = $size[0],
//                 $height = $size[1];

//             var item = {
//                 src : $href,
//                 w   : $width,
//                 h   : $height
//             };

//             items.push(item);
//         // });

//         // Add a click handler for each image to initialize the PhotoSwipe gallery
//         $pic.on('click', function(event) {
//             event.preventDefault();

//             var $index = $(this).index();
//             var options = {
//                 index: $index,
//                 bgOpacity: 0.7,
//                 showHideOpacity: true
//             }

//             // Initialize PhotoSwipe
//             var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
//             lightBox.init();
//         });
//     }); 
// }

// (function($) {
//     $(document).ready(function() {
//         $(".mason").mason({
//             itemSelector: ".mason__item",
//             ratio: 1.5,
//             sizes: [
//                 [1,1],
//                 [1,2],
//                 [2,1],
//                 [2,2]
//             ],
//             // promoted: [
//             //     ['mason__item--promo-v1', 3, 3],
//             //     ['mason__item--promo-v2', 1, 3],
//             //     ['mason__item--promo-v3', 3, 2]
//             // ],
//             columns: [
//                 [0,480,1],
//                 [480,780,2],
//                 [780,1080,3],
//                 [1080,1320,4],
//                 [1320,1680,5]
//             ],
//             filler: {
//                 itemSelector: '.mason__filler',
//                 filler_class: 'mason__custom-fill'
//             },
//             layout: 'fluid',
//             gutter: 5
//         }, function() {
//             photoSwipe()
//         });
//     });
// })(jQuery);

// $(document).ready(function() {
//     var test = {size: 1200, columns: 10};
//     var test2 = {size: 700, columns: 8};
//     var grid = $("#mosaic-grid").mosaic({
//         tileModel: '.sizer',
//         columns: 3,
//         gutter: 1,
//         heightFromWidth: true,
//         breakpoints: [test, test2]
//     });

//     $(".link").click(function() {
//         $(".active").removeClass("active");
//         $(this).addClass("active"); 
//     });
// });

$(window).load(function(){    

    $(".basicExample2").click(function () {

        var pswpElement = document.querySelectorAll('.pswp')[0];
        var items = [];

        $(".basicExample2").each(function () {
            var size = $(this).attr("data-size").split('x');
            items.push({
                src: $(this).attr("href"),
                w: size[0],
                h: size[1],
              title: 'Something'
            });

        });

        var options = {
            index: $(this).parent().index()
        };
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
        return false;

    });

});

$('.picture').each( function() {
    var $pic     = $(this),
        getItems = function() {
            var items = [];
            $pic.find('a').each(function() {
                var $href   = $(this).attr('href'),
                    $size   = $(this).data('size').split('x'),
                    $width  = $size[0],
                    $height = $size[1];
 
                var item = {
                    src : $href,
                    w   : $width,
                    h   : $height
                }
 
                items.push(item);
            });
            return items;
        }
 
    var items = getItems();
});

var $pswp = $('.pswp')[0];
$pic.on('click', 'figure', function(event) {
    event.preventDefault();
     
    var $index = $(this).index();
    var options = {
        index: $index,
        bgOpacity: 0.7,
        showHideOpacity: true
    }
     
    // Initialize PhotoSwipe
    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
    lightBox.init();
});