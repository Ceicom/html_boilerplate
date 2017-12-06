    var getData = function () {};

    getData.prototype.init = function () {

        var self = this;

        var data = {};
            data.limit = this.limit || undefined;
            data.type = this.type || undefined;
            data.id = this.id || undefined;

        var r = $.ajax({
            method: 'GET',
            url: '/modulos/handlers/xxxxxxxxxxxxxx.ashx',
            data: data
        });

        r.then(function (data) {
            if (Object.keys(data).length)
                self.doTemplate(data);
            else
                self.insertHtml(1);
        }, function () {
            self.insertHtml(2);
        });

    }

    getData.prototype.doTemplate = function (data) {

        var html = '';

        $.each(data, function (key, value) {
            html += '';

            console.info(key);
            console.info(value);
            console.info('--------');
        });

        return this.insertHtml(html);
    }

    getData.prototype.insertHtml = function (html) {

        var error = false;

        if (typeof (html) == 'number') {
            error = true;

            switch (html) {
                case 1:
                    html = '<div class="msg-box is-info">Sem informações disponíveis no momento.</div>';
                    break;
                default:
                    html = '<div class="msg-box is-error">Falha ao recuperar informações, tente novamente.</div>';
                    break;
            }
        }

        this.wrapper.html(html);

        if (!error)
            this.callback(this.type);

        return this;
    }