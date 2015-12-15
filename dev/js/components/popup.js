define(
    [
        'jquery',
        'fancybox',
        'loadcss'
    ],
    function () {

        if ($('[name="banner"]').length) {

            var value = $('[name="banner"]').val().split('|');

            if (value[0].length > 1) {

                var style = loadCSS('/vendor/fancybox/jquery.fancybox.min.css');

                if (!value[1]) value[1] = 'javascript:;';

                var banner = value[0];
                var link = value[1];

                $.fancybox.open(
                    [{
                        href: banner
                    }],
                    {
                        maxWidth: 800,
                        maxHeight: 600,
                        fitToView: false,
                        width: '70%',
                        height: '70%',
                        openEffect: 'none',
                        closeEffect: 'none'
                    });

                $('body').on('click', '.fancybox-image', function (e) {
                    e.preventDefault();

                    if (link.indexOf('javascript') >= 0) $.fancybox.close(true);
                    else location.href = link;

                });

            }
        }

    }
)