define(
    [
        'jquery',
        'fancybox',
        'loadcss'
    ],
        function () {

            loadCSS('/vendor/fancybox/jquery.fancybox.min.css');

            $('.fancybox').fancybox();      // geral
            $('.galeriaFotos').fancybox();  // noticias internas
        }
);