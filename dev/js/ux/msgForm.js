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
                    grecaptcha.reset();                                                                                         // reseta captcha
                    $form.find('input:not([type="submit"]):not([type="radio"]):not([type="checkbox"]), textarea').val('');      // zera form
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
