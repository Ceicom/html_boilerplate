define(
    [
        'jquery',
        'templates/model.min',
    ],
    function () {

        cfw.funcs.init();

        var $wrapper = $('#wrapper');
        var getInfo = new getData();
            getInfo.wrapper = $wrapper;
            getInfo.type = $wrapper.attr('data-type') || undefined;
            getInfo.cat = $wrapper.attr('data-cat') || undefined;
            getInfo.callback = function () {

                cfw.dotdotdot.init({ element: '.element' });
                cfw.owlcarousel.init({ element: '.element' });
                cfw.matchheight.init({ element: '.element' });

            };

        $(document).on('cfw_funcs_loaded', function () {
            getInfo.init();
        });

    }
)