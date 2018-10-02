define(
    [
        'cfw'
    ],
    () => {

        // sweet alert
        cfw.sweetalert.init();

        // evento submit
        $(document).on('cfw_submitform', (e, retorno, $form) => {

            let msg = ``,
                cb = () => { };

            switch (+retorno) {
                case 0:
                    msg = { title: `Ops`, text: `Preencha todos os campos, tente novamente.`, type: `info` };
                    break;
                case 1:
                    let msgTXT = `Mensagem enviada com sucesso, aguarde, em breve retornaremos o contato!`;

                    if ($form.attr('data-submitform') === 'form-xxxx') {
                        msgTXT = `xxxx`;
                        cb = () => alert('xxxx');
                    }

                    msg = { title: `Sucesso`, text: msgTXT, type: `success` };

                    // zera form
                    $form.find('input:not([type="submit"]):not([type="radio"]):not([type="checkbox"]), textarea').val(``);

                    // fecha modal se existir 1 aberto
                    if ($('body').hasClass('modal-loaded') && $('.cfw-modal:visible').length)
                        $('.cfw-modal:visible').trigger('close');

                    break;
                case 2:
                    msg = { title: `Erro`, text: `Ocorreu um erro durante o envio de sua mensagem, tente novamente.`, type: `error` };
                    break;
                default:
                    msg = { title: `Ops`, text: retorno, type: `info` };
                    break;
            }

            // reseta captcha
            if (typeof grecaptcha !== 'undefined')
                grecaptcha.reset();

            swal(msg, cb);
        });

    }
);
