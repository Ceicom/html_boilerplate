define(
    [
        'cfw',
        'templates/model.min'
    ],
    () => {

        // vars
        const wrapper = '#wrapper',
              getInfo = new getData();

        // funcs module
        cfw.funcs.init();

        // start
        getInfo.wrapper = $(wrapper);
        getInfo.type = $(wrapper).attr('data-type');
        getInfo.limit = $(wrapper).attr('data-limit');
        getInfo.id = $(wrapper).attr('data-id');
        getInfo.callback = type => {

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

        // callback
        $(document).one('cfw_funcs_loaded', () => {
            getInfo.init();
        });

    }
);