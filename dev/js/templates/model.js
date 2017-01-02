    var getData = function () {};

    getData.prototype.init = function () {

        var _ = this;

        if (!_.callback) _.callback = function () { };

        var r = $.ajax({
            url: '/modulos/handlers/xxxxxxxxxxxxxx.ashx'
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

    getData.prototype.doTemplate = function (data) {

        var html = '';

        $.each(data, function (key, value) {
            html += key + ' -> ' + value;
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
            this.callback();

        return this;
    }