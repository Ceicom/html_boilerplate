define(
    [
        'cfw'
    ],
    function () {

        cfw.funcs.init();

        $(document).one('cfw_funcs_loaded', function () {

            var getBannerFlutuanteData = function () { };

            getBannerFlutuanteData.prototype.init = function () {

                var _ = this;
                var r = $.ajax({
                    url: '/modulos/handlers/flutuante.ashx'
                });

                r.then(function (data) {
                    if (Object.keys(data).length)
                        _.doTemplate(data);
                    else
                        console.warn('retorno handler flutuante %cvazio ', 'color: red ');
                }, function () {
                    console.warn('retorno handler flutuante %cinválido', 'color: red ');
                });

            }

            getBannerFlutuanteData.prototype.doTemplate = function (data) {

                var url = '';

                if (data.link) {
                    url = validaMail(data.link) ? 'mailto:' + data.link : !validaURL(data.link) ? '//' + data.link : data.link;
                    url = 'data-modal-url="' + url + '"';
                }

                var _ = this;
                var html = '<a id="flutuante_banner_2017" data-modal href="' + data.img + '" title="' + data.title + '" ' + url + ' data-modal-lock="false"></a>';

                $('body').append(html);
                cfw.cmodal.init();

                var si = setInterval(function () {
                    if (typeof (cModal) == 'function') {
                        clearInterval(si);
                        $('body').find('#flutuante_banner_2017').trigger('click');
                    }
                }, 100);

            }

            /* initialize */
            var getBanner = new getBannerFlutuanteData();
                getBanner.init();

        });
    }
);
