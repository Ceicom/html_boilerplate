define(
    [
        'cfw',
        'ux/msgForm.min'
    ],
    () => {

        if ($('.g-recaptcha').length)
            require(['recaptcha']);

        cfw.form.init();

    }
);
