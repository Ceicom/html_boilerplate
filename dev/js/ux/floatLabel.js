define(
    [
        'jquery'
    ],
    () => {
        $('.float-label :input').blur(({ currentTarget }) => {
            if ($(currentTarget).val()) {
                $(currentTarget).parent().addClass('floating');
                return;
            }
            $(currentTarget).parent().removeClass('floating');
        });
    }
);