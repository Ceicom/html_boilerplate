define(
    [
        'cfw',
        'templates/model.min',
    ],
    function () {

        cfw.funcs.init();

        var wrapper = '#wrapper',
            getInfo = new getData();
            getInfo.wrapper = $(wrapper);
            getInfo.type = $(wrapper).attr('data-type');
            getInfo.limit = $(wrapper).attr('data-limit');
            getInfo.id = $(wrapper).attr('data-id');
            getInfo.callback = function (type) {

                cfw.dotdotdot.init({
                    element: '.element',
                    watch: true
                });

                cfw.owlcarousel.init({
                    element: '.element'
                });

                cfw.matchheight.init({
                    element: '.element'
                });

                cfw.lightgallery.init({
                    element: '.images-list',
                    fullScreen: true,
                    zoom: true,
                    share: true
                });

                cfw.fancybox.init({
                    element: '[data-fancybox]' // default
                });

                require(['addthis']);
            };

        $(document).one('cfw_funcs_loaded', function () {
            getInfo.init();
        });

    }
)