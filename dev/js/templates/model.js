class getData {
    init() {
        const me = this,
            data = {
                limit: me.limit || undefined,
                type: me.type || undefined,
                id: me.id || undefined
            };

        const r = $.ajax({
            method: 'GET',
            url: '/modulos/handlers/[name].ashx',
            data: data
        });

        r.then((data) => {
            if (Object.keys(data).length)
                me.doTemplate(data);
            else
                me.insertHtml(1);
        }, () => {
            me.insertHtml(2);
        });
    }

    doTemplate(data) {
        const me = this;

        let html = ``;

        console.info(data);

        $.each(data, (key, value) => {
            html += ``;
        });

        return me.insertHtml(html);
    }

    insertHtml(html) {
        const me = this;

        let error = false;

        if (typeof html === 'number') {
            error = true;

            switch (html) {
                case 1:
                    html = `<div class="msg-box is-info">Sem informações disponíveis no momento.</div>`;
                    break;
                default:
                    html = `<div class="msg-box is-error">Falha ao recuperar informações, tente novamente.</div>`;
                    break;
            }
        }

        me.wrapper.html(html);

        if (!error)
            me.callback(me.type);

        return me;
    }
}