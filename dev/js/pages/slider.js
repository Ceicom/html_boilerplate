define(
    [
        'cfw',
        'templates/slider.min'
    ],
    () => {

        // vars
        const wrapper = '#wrapper',
              sliderInfo = new getSliderData();

        // funcs module
        cfw.funcs.init();

        // start
        sliderInfo.wrapper = $(wrapper);
        sliderInfo.type = 'slider';
        sliderInfo.callback = () => {

            cfw.owlcarousel.init({
                element: wrapper,
                items: 1,
                loop: $(wrapper).children().length > 1,
                autoplay: true,
                animateOut: 'fadeOut'
            });

        };

        // callback
        $(document).one('cfw_funcs_loaded', () => {
            sliderInfo.init();
        });
    }
);