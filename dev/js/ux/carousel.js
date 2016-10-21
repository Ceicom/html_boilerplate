define(
    [
        'jquery',
        'owlcarousel',
        'loadcss'
    ],
        function () {

            // http://www.owlcarousel.owlgraphic.com/docs/api-options.html

            loadCSS('/vendor/owl.carousel/owl.carousel.min.css');

            /* variaveis */
            var $wrapper = $('.js-carousel');

            $wrapper.each(function () {
                var options = {};

                /* options // exemplo de como setar opções no carousel */
                if ($(this).hasClass('is-internal')) {
                    options = {
                        items: 3,
                        autoplay: true,
                        autoplayTimeout: 3500,
                        autoplayHoverPause: true,
                        margin: 0,
                        loop: false,
                        onInitialize: function () {
                            $('#nav-joint').show();
                        },
                        responsive: {
                            0: {
                                items: 1,
                            },
                            470: {
                                items: 2,
                            },
                            640: {
                                items: 3,
                            },
                        }
                    }
                }

                /* executa */
                $(this).owlCarousel(options);
            });

            /* navegação */
            $('.js-carousel--nav').on('click', 'button', function (e) {
                e.preventDefault();
                $wrapper.trigger($(this).attr('class') + '.owl.carousel');
            });
        }
);