define(
    [
        'jquery',
        'owlcarousel',
        'loadcss'
    ],
        function ( $, owlCarousel) {

            var style = loadCSS('/vendor/owl.carousel/owl.carousel.min.css');

            /* variaveis */
            var $wrapper = $('.js-carousel');
            var options = {};

            /* options // exemplo de como setar opções no carousel */
            if ($wrapper.hasClass('is-internal')) {
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
            $wrapper.owlCarousel(options);

            /* navegação */
            $('.js-carousel--nav').on('click', 'button', function (e) {
                e.preventDefault();
                $wrapper.trigger($(this).attr('class') + '.owl.carousel');
            });
        }
);