define(
    [
        'cfw',
        'ux/msgForm.min'
    ],
    function () {

        if ($('.g-recaptcha').length)
            require(['recaptcha']);

        cfw.form.init();

    }
);
