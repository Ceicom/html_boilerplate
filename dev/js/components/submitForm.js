define(
    [
        'jquery',
        'loadcss',
        'sweetalert',
    ],
    function () {

        loadCSS('/vendor/sweetalert/sweet-alert.min.css');
        $('.btnSend').removeAttr('disabled');

        // envia dados do formulário para enviar email
        var ajaxForm = function ($form, $btn) {

            var type = $form.attr('id');
            var formData = new FormData();
            var $File = $form.find('input[type="file"]');

             if( $File.length )
                formData.append( $File.attr('name') , $File[0].files[0] );

            var formInfo = $('form').serialize().split('&');

            for( var i = 0; i < formInfo.length; i++ ){

                var info = formInfo[i].split('=');
                var key = info[0];
                var val = decodeURIComponent(info[1]);

                if( key && val ) 
                    formData.append(key, val);
            }

            $.ajax({
                type: 'POST',
                url: '/modulos/handlers/formularios.ashx?type='+type,
                processData: false,
                contentType: false,
                data: formData,
            })
            .done(function (data) {

                console.info('type -->' + type + '\n data -->' + data);

                var msg;
                switch (+data) {
                    case 0:
                        msg = { title: 'Ops', text: 'Preencha todos os campos, tente novamente.', type: 'info' };
                        break;
                    case 1:
                        msg = { title: 'Sucesso', text: 'Mensagem enviada com sucesso, aguarde, em breve retornaremos o contato!', type: 'success' };
                        grecaptcha.reset();                                                                                         // reseta captcha
                        $form.find('input:not([type="submit"]):not([type="radio"]):not([type="checkbox"]), textarea').val('');      // zera form
                        break;
                    case 2:
                        msg = { title: 'Erro', text: 'Ocorreu um erro durante o envio de sua mensagem, tente novamente.', type: 'error' };
                        break;
                    default:
                        msg = { title: 'Ops', text: data, type: 'info' };
                    break;
                }

                swal(msg);

                // habilita botão e remover loading
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
                            } else
                                ajaxForm($form, $btn);
                        });

                    // se não tiver valor no captcha manda usuário preencher o captcha
                    } else {
                        swal({ title: 'Erro', text: 'Preencha o <strong>Captcha</strong> para continuar.', type: 'error' });
                        $btn.removeAttr('disabled');
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
