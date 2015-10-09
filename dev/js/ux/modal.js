define(
    [
        'jquery',
        'fancybox',
        'loadcss'
    ],
        function ($, fancybox) {

            var style = loadCSS('/vendor/fancybox/jquery.fancybox.min.css');
            onloadCSS(style, function () {
                $('.fancybox').fancybox();      // geral
                $('.galeriaFotos').fancybox();  // noticias internas
            });
        }
);