define(
    [
        'jquery',
        'loadcss',
        'components/formData.min'
    ],
    function () {

        loadCSS('/css/tooltip.min.css');

        if ($('.g-recaptcha').length)
            require(['recaptcha']);

        require([
            'components/validaForm.min',
            'components/submitForm.min'
        ]);
    }
);
