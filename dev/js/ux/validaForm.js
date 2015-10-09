define(
    [
        'loadcss',
        'jquery',
        'cfw'
    ],
    function () {

        loadCSS('/css/tooltip.min.css');

        // exemplo outro identificador
        //if ($('#js-form-news')) {
        //    validaForm({ idForms: '#js-form-news' });
        //}

        // .formee
        if ($('.formee')) { validaForm(); }
    }
);