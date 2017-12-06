    var getSliderData = function () {};

    getSliderData.prototype.init = function () {

        var _ = this;

        var data = {};
            data.type = _.type;

        var r = $.ajax({
            method: 'GET',
            url: '/modulos/handlers/xxxxxxxxxxxxx.ashx',
            data: data
        });

        r.then(function (data) {
            if (Object.keys(data).length)
                _.doTemplate(data);
            else
                _.insertHtml(1);
        }, function () {
            _.insertHtml(2);
        });

    }

    getSliderData.prototype.doTemplate = function (data) {

        var html = '';

        $.each(data, function (key, value) {
            var url = value.url ? 'href="' + (validaMail(value.url) ? 'mailto:' + value.url : validaURL(value.url) ? value.url + '" target="_blank" rel="noreferrer' : value.url) + '\"' : '';
            html += '<a ' + url + ' title="' + value.title + '" style="background-image:url(' + value.img + ');"></a>';
        });

        return this.insertHtml(html);
    }

    getSliderData.prototype.insertHtml = function (html) {

        var error = false;

        if (typeof (html) == 'number') {
            error = true;
            var msg;

            switch (html) {
                case 1:
                    msg = 'Sem informações disponíveis no momento.';
                    break;
                default:
                    msg = 'Falha ao recuperar informações, tente novamente.';
                    break;
            }

            console.warn(this.type + 'Home: ' + msg);
        } else {
            this.wrapper.html(html);
            this.callback();
        }

        return this;
    }