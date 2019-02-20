define(
    [
        'jquery'
    ],
    () => {

        // ajax terminou!? do something...
        $(document).ajaxStop(() => {
            console.info('ajax request finished');
        });

    }
);