define(
    [
        'jquery',
        'loadcss',
        'components/formData.min'
    ],
    function () {

        loadcss('/css/tooltip.min.css');

        if ($('.g-recaptcha').length)
            require(['recaptcha']);

        require([
            'components/validaForm.min',
            'components/submitForm.min'
        ]);
    }
);