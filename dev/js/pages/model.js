define(
    [
        'jquery',
        'templates/model.min',
    ],
    function () {

        var $wrapper = $('#wrapper');

        var getInfo = new getData();
            getInfo.wrapper = $wrapper;
            getInfo.type = $wrapper.attr('data-type') || undefined;
            getInfo.cat = $wrapper.attr('data-cat') || undefined;
            getInfo.callback = function () { };
            getInfo.init();

    }
)