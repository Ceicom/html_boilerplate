define(
    [
        'jquery'
    ],
    function () {

        var infoDiv =
            '<div class="msg-box is-warning">'+
            '    Seu navegador é antigo e não permite envio de arquivos.'+
            '    <strong><a href="http://outdatedbrowser.com/pt-br" target="_blank"> Atualizar agora! </a></strong>'+
            '</div>';

        // valida
        if (typeof window.FormData === 'undefined')
            $('.formee input[type="file"]')
                .attr('hidden', true)
                .parent().append(infoDiv);

    }
);