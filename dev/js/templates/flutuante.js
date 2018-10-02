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
            const link = validaMail(data.Link) ? `mailto:${data.Link}` : !validaURL(data.Link) ? `//${data.Link}` : data.Link;
            url = `data-modal-url="${link}"`;
        }

        html = `<a id="${me.modalID}" data-modal href="${data.Capa}" title="${data.Titulo}'" ${url} data-modal-lock="false"></a>`;

        $('body').append(html);

        me.callback();

        return me;
    };
}