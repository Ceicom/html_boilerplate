define(
    [
        'cfw',
    ],
    function () {

        // sweet alert
        cfw.sweetalert.init();

        $(document).on('cfw_submitform', function (e, retorno, $form) {

            var msg;

            switch (+retorno) {
                case 0:
                    msg = { title: 'Ops', text: 'Preencha todos os campos, tente novamente.', type: 'info' };
                    break;
                case 1:
                    msg = { title: 'Sucesso', text: 'Mensagem enviada com sucesso, aguarde, em breve retornaremos o contato!', type: 'success' };
                    $form.find('input:not([type="submit"]):not([type="radio"]):not([type="checkbox"]), textarea').val('');      // zera form

                    // fecha modal
                    if ($('body').hasClass('modal-loaded') && $('.cfw-modal:visible').length)
                        $('.cfw-modal:visible').trigger('close');

                    // reseta captcha
                    if (typeof (grecaptcha) !== 'undefined')
                        grecaptcha.reset();

                    break;
                case 2:
                    msg = { title: 'Erro', text: 'Ocorreu um erro durante o envio de sua mensagem, tente novamente.', type: 'error' };
                    break;
                default:
                    msg = { title: 'Ops', text: retorno, type: 'info' };
                    break;
            }

            swal(msg);

        });

    }
);
