class getBannerFlutuanteData {
    init() {
        const me = this,
            r = $.ajax('/modulos/handlers/flutuante.ashx');

        r.then((data) => {
            if (Object.keys(data).length)
                me.doTemplate(data);
            else
                console.warn('retorno handler flutuante %cvazio ', 'color: red ');
        }, () => {
            console.warn('retorno handler flutuante %cinválido', 'color: red ');
        });

    }

    doTemplate(data) {
        const me = this;

        let url = '',
            html = '';

        if (data.Link) {
            const link = validaMail(data.link) ? `mailto:${data.link}` : !validaURL(data.link) ? `//${data.link}` : data.link;
            url = `data-modal-url="${link}"`;
        }

        html = `<a id="${me.modalID}" data-modal href="${data.img}" title="${data.title}'" ${url} data-modal-lock="false"></a>`;

        $('body').append(html);

        me.callback();

        return me;
    };
}
