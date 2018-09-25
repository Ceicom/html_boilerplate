define(
    [
        'cfw',
        'templates/model.min'
    ],
    () => {

        // funcs module
        cfw.funcs.init();

        const wrapper = '#js-xxxx-wrapper',
            getInfo = new getData();

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
                element: '[data-fancybox]' // default, se for esse seletor pode remover essa linha
            });

            require(['addthis']);
        };

        $(document).one('cfw_funcs_loaded', () => {
            getInfo.init();
        });

    }
);