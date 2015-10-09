define(
    [
        'loadcss',
        'sweetalert',
    ],
    function () {

        var style = loadCSS('/vendor/sweetalert/sweet-alert.min.css');
        onloadCSS(style, function () {
            $('.btnSend').removeAttr('disabled');
        });


        // envia dados do formulário para enviar email
        var ajaxForm = function ($form, $btn, contato) {

            var type = contato ? 'contato' : 'newsletter';

            $.ajax({
                type: 'POST',
                url: '/modulos/handlers/formularios.ashx?type='+type,
                data: $('form').serialize(),
                beforeSend: function () {
                    $form.find('.loading-full').fadeIn('fast');
                }
            })
            .done(function (data) {
                var msg;
                switch (+data) {
                    case 0:
                        msg = { title: 'Ops', text: 'Preencha todos os campos, tente novamente.', type: 'info' };
                        break;
                    case 1:
                        if (contato) {
                            msg = { title: 'Sucesso', text: 'Mensagem enviada com sucesso, aguarde, em breve retornaremos o contato!', type: 'success' };
                            grecaptcha.reset();
                        } else {
                            msg = { title: 'Sucesso', text: 'Email cadastrado com sucesso, aguarde, em breve retornaremos com novidades!', type: 'success' };
                        }

                        // zera form e reseta captcha
                        $('#' + $('body').attr('data-form')).find('input:not([type=submit]), textarea').val('');

                        break;
                    default:
                        if (contato) {
                            msg = { title: 'Erro', text: 'Ocorreu um erro durante o envio de sua mensagem, tente novamente.', type: 'error' };
                        } else {
                            msg = { title: 'Erro', text: 'Ocorreu um erro durante seu cadastro, tente novamente.', type: 'error' };
                        }
                        break;
                }

                swal(msg);

                // habilita botão e remover loading
                $form.find('.loading-full').fadeOut('fast');
                $btn.removeAttr('disabled');
            });
        };

        // form submit
        $('form').on('submit', function (e) {

            var $form = $('#' + $('body').attr('data-form'));
            var $btn = $form.find('input[type="submit"]').length ? $form.find('input[type="submit"]') : $form.find('button');

            if ($btn.length && $form.length) {
                e.preventDefault();

                $btn.attr('disabled', 'disabled');
                $form.find('.loading-full').fadeIn('fast');

                // form de contato
                if ($form.attr('id').indexOf('contact') >= 0) {

                    // captura valor inserido no captcha
                    var catpchaResponse = grecaptcha.getResponse();

                    // se existir valor do captcha verifica se esta correto
                    if (catpchaResponse) {

                        // requisição da confirmação do captcha
                        var captcha = $.ajax({
                            type: 'POST',
                            url: '/modulos/handlers/captcha.ashx',
                            data: { 'g-recaptcha-secret': '6Lc-wwgTAAAAAJUyGrAttv6P1rxR5yPgwQcYODnV', 'g-recaptcha-response': catpchaResponse }
                        });

                        // depois de verificar captcha...
                        captcha.then(function (data) {

                            var r = data.success;

                            // se não existir resposta de retorno ou a resposta for sucesso = false
                            if (!r || r == 'false') {
                                swal({ title: 'Ops', text: 'Código de verificação inválido, tente novamente.', type: 'info' });
                                grecaptcha.reset();
                                $btn.removeAttr('disabled');
                                $form.find('.loading-full').fadeOut('fast');
                            } else {
                                ajaxForm($form, $btn, true);
                            }
                        });

                        // se não tiver valor no captcha manda usuário preencher o captcha
                    } else {
                        swal({ title: 'Erro', text: 'Preencha o <strong>Captcha</strong> para continuar.', type: 'error' });
                        $btn.removeAttr('disabled');
                        $form.find('.loading-full').fadeOut('fast');
                    }

                }
                // form newsletter
                else {
                    ajaxForm($form, $btn);
                }
                
            }
        });

    }
);