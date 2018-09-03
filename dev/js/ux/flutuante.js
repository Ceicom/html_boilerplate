define(
    [
        'cfw',
        'templates/flutuante.min'
    ],
    function () {

        // funcs module
        cfw.funcs.init();

        // start
        const getBanner = new getBannerFlutuanteData();

        $(document).one('cfw_funcs_loaded', function () {
            getBanner.init();
        });
    }
);