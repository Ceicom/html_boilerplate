define(
    [
        'cfw',
        'templates/slider.min',
    ],
    function () {

        cfw.funcs.init();

        var wrapper = '#wrapper';
        var sliderInfo = new getSliderData();
            sliderInfo.wrapper = $(wrapper);
            sliderInfo.type = 'slider';
            sliderInfo.callback = function () {

                cfw.owlcarousel.init({
                    element: wrapper,
                    items: 1,
                    loop: $(wrapper).children().length > 1,
                    autoplay: true,
                    animateOut: 'fadeOut'
                });

            };

        $(document).one('cfw_funcs_loaded', function () {
            sliderInfo.init();
        });
    }
)