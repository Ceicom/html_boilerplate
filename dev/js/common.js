/*
 * ## ARQUIVO PRINCIPAL DE CONFIGURAÇÕES DO REQUIREJS ##
 *
 * unico arquivo referenciado no html, todas demais chamadas de arquivo js deverão
 * ser feitas através da tag "meta#jsPageID" com o "data-value" referenciando o script
 *
 *      @ ex meta
 *          <meta id="jsPageID" data-value="home" />
 *      @ ex chamada js
 *          if (item == 'home') require(['pages/home.min']);
 *
 * estas chamadas de js deverão ser posicionadas dentro do callback do 'require(['actualPage'])'
 *
 */

// CONFIG REQUIRE JS
requirejs.config({

    paths: {
        jquery:     '//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min',   // jquery 3.x
        cfw:        '//src.inf.br/cfw/cfw.min',                                  // framework
        recaptcha:  '//www.google.com/recaptcha/api',                            // recaptcha google
    },

    //urlArgs: 'v=1.0',                         // produção
    urlArgs: 've=' + (new Date()).getTime(),    // desenvolvimento

    shim: {
        'cfw': ['jquery']
    }

});

// verifica pagina atual baseada no elemento #jsPageID
// exemplo de como informar página: @<meta id="jsPageID" data-value="home" />
define('actualPage', function () {
    var element = document.getElementById('jsPageID');
    var atributos = [];
    if (typeof (element) != 'undefined' && element != null) atributos = element.getAttribute('data-value').split(',');
    return atributos;
});

// chamada analytics + scripts pagina
require(
    [
        'actualPage',
        'components/analytics.min'
    ],
    function (paginas) {

        for (var i = 0; i < paginas.length; i++) {
            var item = paginas[i].trim();

            // components
            if (item == 'cmodal') require(['components/cmodal.min']);
            else if (item == 'matchheight') require(['components/matchheight.min']);
            else if (item == 'citystate') require(['components/citystate.min']);
            else if (item == 'zipcode') require(['components/zipcode.min']);
            else if (item == 'validaform') require(['components/validaform.min']);
            else if (item == 'mask') require(['components/mask.min']);

            // ux
            else if (item == 'form') require(['ux/form.min']);

            // pages
            //else if (item == 'home') require(['pages/home.min']);
        }

    }
);