$(function () {
    $('.burger').click(function () {
        $(this).toggleClass('burger_active');
        $('.header .top').toggleClass('top_active');
        $('.overlay').fadeToggle(300);
    });
    $('#address__button, #chooseBarbershop__close').click(function () {
        $('.chooseBarbershop').toggleClass('chooseBarbershop_active');
        $('.overlay').fadeToggle(300)
    });
    $('.overlay').click(function () {
        $('.header .top').removeClass('top_active');
        $('.burger').removeClass('burger_active');
        $('.chooseBarbershop').removeClass('chooseBarbershop_active');
        $('.overlay').fadeToggle(300)
    });
    $('.link-spy').click(function () {
       $('.burger').removeClass('burger_active');
       $('.overlay').fadeOut(300);
        $('.header .top').removeClass('top_active');
    });

    var linkSpy = $('.link-spy');
    linkSpy.click(function (e) {
        e.preventDefault();

        var currentLink = $(this)
        var href = currentLink.attr('href');
        var scrollTo = $(href);
        var offsetTop = scrollTo.offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop - 50
        }, 300);
        linkSpy.not(currentLink).removeClass('active');


        setTimeout(function () {
            currentLink.addClass('active');
        }, 300);

    })

// скрипт отвечающие за карту
    if ($('#map_content').length) {
        ymaps.ready(function (e) {
            var myCenter = [55.737403, 37.645245]
            if ($(window).width() < 950) {
                var myCenter = [55.737003, 37.648245]
            }
            var myMap = new ymaps.Map('map_content', {
                    center: myCenter,
                    zoom: 17,
                    controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl']
                }, {}),

                // Создаём макет содержимого.
                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                ),

                myPlacemark = new ymaps.Placemark([55.737403, 37.649245], {
                    hintContent: 'Барбершоп Bronson',
                    balloonContent: 'г. Москва, Гончарная Набережная, д. 9/16, с. 2'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: '../img/placemark-bronsons.png',
                    // Размеры метки.
                    iconImageSize: [87, 115],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-43, -115]
                }),

                myPlacemarkWithContent = new ymaps.Placemark([55.737403, 37.649245], {
                    hintContent: '',
                    balloonContent: '',
                    iconContent: ''
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: '',
                    // Размеры метки.
                    iconImageSize: [48, 48],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-24, -24],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [15, 15],
                    // Макет содержимого.
                    iconContentLayout: MyIconContentLayout
                });

            myMap.geoObjects
                .add(myPlacemark)
                .add(myPlacemarkWithContent);

            //myMap.behaviors.disable('scrollZoom');
        });
    }


});


