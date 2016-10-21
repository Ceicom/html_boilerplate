define(
    [
        'loadcss',
        'jquery',
        'cfw'
    ],
    function () {

        // exemplo outro identificador
        //if ($('#js-form-news')) {
        //    validaForm({ idForms: '#js-form-news' });
        //}

        // .formee
        if ($('.formee')) { validaForm(); }
    }
);