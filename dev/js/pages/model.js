define(
    [
        'jquery',
        'objectSize',
        'templates/model.min',
    ],
    function () {

        var getInfo = new getData();
            getInfo.wrapper = $('#wrapper');
            getInfo.callback = function () { };
            getInfo.init();

    }
)