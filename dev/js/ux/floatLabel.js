define(
    [
        'jquery'
    ],
    () => {
        $('.float-label input, .float-label textarea').blur(({ currentTarget }) => {
            if ($(currentTarget).val()) {
                $(currentTarget).parent().addClass('floating');
                return;
            }
            $(currentTarget).parent().removeClass('floating');
        });
    }
);