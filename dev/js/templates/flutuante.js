const getBannerFlutuanteData = () => { };

getBannerFlutuanteData.prototype.init = function () {
    const me = this,
        r = $.ajax({
            url: '/modulos/handlers/flutuante.ashx'
        });

    r.then(function (data) {
        if (Object.keys(data).length)
            me.doTemplate(data);
        else
            console.warn('retorno handler flutuante %cvazio ', 'color: red ');
    }, function () {
        console.warn('retorno handler flutuante %cinválido', 'color: red ');
    });

};

getBannerFlutuanteData.prototype.doTemplate = function (data) {
    const me = this;
    let url = '',
        html = '';

    if (data.link) {
        const link = validaMail(data.link) ? `mailto:${data.link}` : !validaURL(data.link) ? `//${data.link}` : data.link;
        url = `data-modal-url="${link}"`;
    }

    html = `<a id="flutuante_banner_2017" data-modal href="${data.img}" title="${data.title}'" ${url} data-modal-lock="false"></a>`;

    $('body').append(html);
    cfw.cmodal.init();

    var si = setInterval(function () {
        if (typeof cModal === 'function') {
            clearInterval(si);
            $('body').find('#flutuante_banner_2017').trigger('click');
        }
    }, 100);

    return me;
};