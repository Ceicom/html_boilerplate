define(
    [
        'jquery',
        'loadcss',
        'sweetalert',
    ],
    function () {

        //<div class="g-recaptcha" data-sitekey="6Lc9tP8SAAAAAKfA4Hwpo0QredfWcVlMxgIxUUnk"></div>

        loadCSS('/vendor/sweetalert/sweet-alert.min.css');
        $('.btnSend').removeAttr('disabled');

        // envia dados do formulário para enviar email
        var ajaxForm = function ($form, $btn) {

            var type = $form.attr('id');

            $.ajax({
                type: 'POST',
                url: '/modulos/handlers/formularios.ashx?type='+type,
                data: $('form').serialize(),
                //beforeSend: function () {
                //    $form.find('.loading-full').fadeIn('fast');
                //}
            })
            .done(function (data) {

                console.info(data);

                var msg;
                switch (+data) {
                    case 0:
                        msg = { title: 'Ops', text: 'Preencha todos os campos, tente novamente.', type: 'info' };
                        break;
                    case 1:
                        msg = { title: 'Sucesso', text: 'Mensagem enviada com sucesso, aguarde, em breve retornaremos o contato!', type: 'success' };
                        // zera form e reseta captcha
                        grecaptcha.reset();
                        $form.find('input:not([type=submit]), textarea').val('');
                        break;
                    default:
                        msg = { title: 'Erro', text: 'Ocorreu um erro durante o envio de sua mensagem, tente novamente.', type: 'error' };
                        break;
                }

                swal(msg);

                // habilita botão e remover loading
                //$form.find('.loading-full').fadeOut('fast');
                $btn.removeAttr('disabled');
            });
        };

        // form submit
        $('form').on('submit', function (e) {

            var $form = $('#' + $('body').attr('data-form'));
            var $btn = ($form.find('input[type="submit"]').length) ? $form.find('input[type="submit"]') : $form.find('button');

            if ($btn.length && $form.length) {
                e.preventDefault();

                $btn.attr('disabled', 'disabled');
                //$form.find('.loading-full').fadeIn('fast');

                // form com captcha
                if ($form.find('.g-recaptcha').length){

                    // captura valor inserido no captcha
                    var catpchaResponse = grecaptcha.getResponse();

                    // se existir valor do captcha verifica se esta correto
                    if (catpchaResponse) {

                        // requisição da confirmação do captcha
                        var captcha = $.ajax({
                            type: 'POST',
                            url: '/modulos/handlers/captcha.ashx',
                            data: { 'g-recaptcha-response': catpchaResponse }
                        });

                        // depois de verificar captcha...
                        captcha.then(function (data) {

                            var r = data.success;

                            // se não existir resposta de retorno ou a resposta for sucesso = false
                            if (!r || r == 'false') {
                                swal({ title: 'Ops', text: 'Código de verificação inválido, tente novamente.', type: 'info' });
                                grecaptcha.reset();
                                $btn.removeAttr('disabled');
                                //$form.find('.loading-full').fadeOut('fast');
                            } else {
                                ajaxForm($form, $btn);
                            }
                        });

                        // se não tiver valor no captcha manda usuário preencher o captcha
                    } else {
                        swal({ title: 'Erro', text: 'Preencha o <strong>Captcha</strong> para continuar.', type: 'error' });
                        $btn.removeAttr('disabled');
                        //$form.find('.loading-full').fadeOut('fast');
                    }

                }
                // form sem captcha
                else {
                    ajaxForm($form, $btn);
                }
                
            }
        });

    }
);