define(
    [
        'cfw',
        'templates/flutuante.min'
    ],
    () => {

        const modalID = 'ceicom_promo_flutuante';

        // funcs module
        cfw.funcs.init();

        // start
        const getBanner = new getBannerFlutuanteData();

        getBanner.modalID = modalID;
        getBanner.callback = () => {

            cfw.cmodal.init();

            const si = setInterval(() => {
                if (typeof cModal === 'function') {
                    clearInterval(si);
                    $('body').find(`#${modalID}`).trigger('click');
                }
            }, 100);

        };

        $(document).one('cfw_funcs_loaded', () => {
            getBanner.init();
        });

    }
);