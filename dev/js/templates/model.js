const getData = () => {};

getData.prototype.init = function () {
    const me = this,
        data = {
            limit: me.limit || undefined,
            type: me.type || undefined,
            id: me.id || undefined
        };

    const r = $.ajax({
        method: 'GET',
        url: '/modulos/handlers/xxxxxxxxxxxxxx.ashx',
        data: data
    });

    r.then(function (data) {
        if (Object.keys(data).length)
            me.doTemplate(data);
        else
            me.insertHtml(1);
    }, function () {
        me.insertHtml(2);
    });
};

getData.prototype.doTemplate = function (data) {
    const me = this;
    let html = ``;

    console.info(data);

    $.each(data, function (key, value) {
        html += ``; // use es6 templates
    });

    return me.insertHtml(html);
};

getData.prototype.insertHtml = function (html) {
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
};