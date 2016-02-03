define(
    [
        'jquery'
    ],
    function () {

        if ($('.g-recaptcha').length) require(['recaptcha']);
        require(['ux/validaForm.min', 'ux/submitForm.min']);

    }
);