$(function () {
    //console.log("ready?");

    // прелоадер
    $(".preloader").fadeOut("slow");

    // [---- плавный переход по ссылкам _начало_

    $('a[href^="#"]:not(.menu-trigger,.button-red,.call-form--link,.sl-overlay--close)').on('click', function (event) {
        // отменяем стандартное действие
        event.preventDefault();

        var sc = $(this).attr("href"),
            dn = $(sc).offset().top;
        /*
         * sc - в переменную заносим информацию о том, к какому блоку надо перейти
         * dn - определяем положение блока на странице
         */

        $('html, body').animate({ scrollTop: dn }, 1000);

        /*
         * 1000 скорость перехода в миллисекундах
         */
    });

    // _конец_ плавный переход по ссылкам ---]

    // настройка параметров формы обратного звонка  
    $("body").smartLid({
        //Настройки
        callForm: true,
        requestForm: false,
        placeholderName: 'Введите ваше имя',
        callFormAddFile: false,
        requestFormAddFile: false
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

    // обработчик выпадающего меню для мобильной версии
    $(".menu-trigger").click(function () {
        //console.log("click");
        $("nav ul").slideToggle(500);
    });

    $(window).resize(function () {
        if ($(window).width() > 800) {
            $('nav ul').removeAttr('style');
        }
    });
    //end resize


    // gallery justifiedGallery (сетка галереи)

    $('#jg0').justifiedGallery({
        rowHeight: 200,
        justifyThreshold: 0.75,
        lastRow: 'justify',
        captions: false,
        randomize: false,
        margins: 10,
        waitThumbnailsLoad: false,
        selector: 'figure, div:not(.spinner)'
    });

    $('#jg1').justifiedGallery({
        rowHeight: 260,
        justifyThreshold: 0.75,
        lastRow: 'justify',
        captions: false,
        randomize: false,
        margins: 20,
        waitThumbnailsLoad: false,
        selector: 'figure, div:not(.spinner)'
        //, imagesAnimationDuration : 1
    });

    $('#jg2').justifiedGallery({
        rowHeight: 220,
        justifyThreshold: 0.75,
        lastRow: 'justify',
        captions: false,
        randomize: false,
        margins: 20,
        waitThumbnailsLoad: false,
        selector: 'figure, div:not(.spinner)'
        //, imagesAnimationDuration : 1
    });

    $('#jg3').justifiedGallery({
        rowHeight: 120,
        justifyThreshold: 0.75,
        lastRow: 'center',
        captions: false,
        randomize: false,
        margins: 8,
        waitThumbnailsLoad: false,
        selector: 'figure, div:not(.spinner)'
        //, imagesAnimationDuration : 1
    });

    // sizeRangeSuffixes: {
    //     100 : '_t', // used with images which are less than 100px on the longest side
    //     240 : '_m', // used with images which are between 100px and 240px on the longest side
    //     320 : '_n', // ...
    //     500 : '_y',
    //     640 : '_z',
    //     1024 : '_b' // used which images that are more than 640px on the longest side
    // },


    $(".header-audi").click(function () {

        $header = $(this);
        //getting the next element
        $content = $header.next();
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideToggle(500, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            
            $header.text(function () {
                //change text based on condition
                return $content.is(":visible") ? "Свернуть" : "Модельный ряд Audi";
            });
        });
    });

    $(".header-bmw").click(function () {

        $header = $(this);
        //getting the next element
        $content = $header.next();
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideToggle(500, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            
            $header.text(function () {
                //change text based on condition
                return $content.is(":visible") ? "Свернуть" : "Модельный ряд BMW";
            });
        });
    });

    $(".header-mersedes").click(function () {

        $header = $(this);
        //getting the next element
        $content = $header.next();
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideToggle(500, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            
            $header.text(function () {
                //change text based on condition
                return $content.is(":visible") ? "Свернуть" : "Модельный ряд Mercedes-Benz";
            });
        });
    });

    $(".header-toyota").click(function () {

        $header = $(this);
        //getting the next element
        $content = $header.next();
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideToggle(500, function () {
            //execute this after slideToggle is done
            //change text of header based on visibility of content div
            
            $header.text(function () {
                //change text based on condition
                return $content.is(":visible") ? "Свернуть" : "Модельный ряд Toyota";
            });
        });
    });













});




//===========
// gallery PhotoSwipe (параметры берутся из html)

$(document).ready(function () {
    initPhotoSwipeFromDOM('.justified-gallery');
});


var initPhotoSwipeFromDOM = function (gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if (figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };

            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if (index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function (index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        options.bgOpacity = 0.8;
        options.showHideOpacity = true;

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};



// execute above function


//-----------------

// $(".toggle-mnu").click(function() {
//     $(this).toggleClass("on");
//     // $(".main-mnu").slideToggle();
//     return false;
// });

// $(document).ready(function() {

// });//end ready




