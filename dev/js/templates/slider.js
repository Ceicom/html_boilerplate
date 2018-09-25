const getSliderData = () => { };

getSliderData.prototype.init = () => {

    const me = this,
        data = {
            type: me.type
        };

    const r = $.ajax({
        method: 'GET',
        url: '/modulos/handlers/xxxxxxxxxxxxx.ashx',
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

};

getSliderData.prototype.doTemplate = (data) => {

    const me = this;
    let html = ``;

    $.each(data, function (key, value) {
        const url = value.url ? 'href="' + (validaMail(value.url) ? 'mailto:' + value.url : validaURL(value.url) ? value.url + '" target="_blank" rel="noreferrer' : value.url) + '\"' : '';
        html += `<a ${url} title="${value.title}" style="background-image:url(${value.img});"></a>`;
    });

    return me.insertHtml(html);

};

getSliderData.prototype.insertHtml = function (html) {

    const me = this;

    if (typeof html === 'number') {
        let msg;

        switch (html) {
            case 1:
                msg = 'Sem informações disponíveis no momento.';
                break;
            default:
                msg = 'Falha ao recuperar informações, tente novamente.';
                break;
        }

        console.warn(`${me.type} Slider => ${msg}`);
    } else {
        me.wrapper.html(html);
        me.callback();
    }

    return me;

};