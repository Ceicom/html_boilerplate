define(
    [
        'ie/html.min',
        'loadcss'
    ],
    function (ie) {
        
        var style = loadCSS('//api.ceicom.com.br/libs/cFw/css/ie8-/ie8.min.v1.css');
        onloadCSS(style, function () {
            document.body.innerHTML = ie.html;
        });
    }
);