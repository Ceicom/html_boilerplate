define(
    [
        'jquery',
        'loadcss',
        '/vendor/lightGallery/js/lightgallery.min.js',
    ],
        function () {

            // http://sachinchoolur.github.io/lightGallery/docs/

            require([

                //'/vendor/lightGallery/js/lg-fullscreen.min.js',
                //'/vendor/lightGallery/js/lg-thumbnail.min.js',
                //'/vendor/lightGallery/js/lg-video.min.js',
                //'/vendor/lightGallery/js/lg-autoplay.min.js',
                '/vendor/lightGallery/js/lg-zoom.min.js',
                '/vendor/lightGallery/js/lg-hash.min.js',
                //'/vendor/lightGallery/js/lg-pager.min.js',
                '/vendor/lightGallery/js/jquery.mousewheel.min.js'

            ], function () {
                loadCSS('/vendor/lightGallery/css/lightgallery.min.css');

                $('#lightgallery').lightGallery({
                    //selector: 'this',
                    getCaptionFromTitleOrAlt: false,
                    download: false
                });
            })
            
        }
);