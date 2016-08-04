define([

    'jquery'

],function () {

    function modal(wrapper) {
        this.wrapper = $('.cfw-modal');
        this.body = $('body');
    }

    modal.prototype.init = function () {
        var _ = this;

        _.wrapper.on('close', function () {
            _.close();
        });

        return _.open();
    }

    modal.prototype.open = function () {
        var _ = this;

        _.wrapper
            .find('.cfw-modal__conteudo').html(_.content.html()).end()
            .fadeIn('fast', function () {
                _.body.addClass('modal-open');

                $(window).trigger('cfw-modal-open');
            });

        return this;
    }

    modal.prototype.close = function () {
        var _ = this;

        _.wrapper.fadeOut('fast', function () {
            _.body.removeClass('modal-open');
            _.wrapper.off('close callClose');

            $(window).trigger('cfw-modal-close');
        });

        return this;
    }

    /**********************************/

    function generateHtml() {

        if (!$('.cfw-modal').length) {

            var html =
                '<div class="cfw-modal" id="js-modal" hidden>' +
                '    <div class="cfw-modal__pos-conteudo">' +
                '        <button class="cfw-modal__close-btn js-close-modal" type="button" title="Fechar"></button>' +
                '        <div class="cfw-modal__conteudo"></div>' +
                '    </div>' +
                '</div>';

            $('form').append(html);
        }
    }

    generateHtml();

    /**********************************/

    var form = new modal();

    $('form').on('click', '[data-modal]', function (e) {
        //e.preventDefault();
        form.content = $($(this).attr('data-modal'));
        form.init();

        /* exclusivo agenda sponte*/
        if ($(this).attr('data-idcat')) location.hash = $(this).attr('href').slice(1);
        /******************************/

    });

    $(document).on('click', function (e) {
        var $el = $(e.target);

        if (($el.hasClass('js-close-modal') || !$el.closest('.cfw-modal__conteudo').length) && $('body').hasClass('modal-open')) {
            if ($('.cfw-modal:visible').length) $('.cfw-modal:visible').trigger('close');
        }
    });

    $(document).on('keyup', function (e) {
        if ($('.cfw-modal:visible').length && e.keyCode == 27) $('.cfw-modal:visible').trigger('close');
    });

    /**********************************/

});