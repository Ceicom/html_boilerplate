define(
    [
        'cfw',
        'templates/slider.min'
    ],
    () => {

        // vars
        const wrapper = '#js-slider-wrapper';
        const sliderInfo = new getSliderData();

        // funcs module
        cfw.funcs.init();

        // start
        sliderInfo.wrapper = $(wrapper);
        sliderInfo.type = $(wrapper).attr('data-type');
        sliderInfo.time = $(wrapper).attr('data-delay');
        sliderInfo.callback = () => {
            cfw.owlcarousel.init({
                element: wrapper,
                items: 1,
                loop: false,        // não funciona com os videos do youtube devido a ele clonar elementos com o mesmo ID
                autoplay: false,    // o autoplay é feito internamente com a função setTimerSlider
                onInitialized: () => sliderInfo.dealYoutubeSlides(),
                onTranslate: () => sliderInfo.pauseYoutubeSlides(),
                onTranslated: () => sliderInfo.setTimerSlider()
            });
        };

        // callback
        $(document).one('cfw_funcs_loaded', () => {
            sliderInfo.init();
        });
    }
);