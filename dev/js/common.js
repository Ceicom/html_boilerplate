/*
 * ## ARQUIVO PRINCIPAL DE CONFIGURAÇÕES DO REQUIREJS ##
 *
 * unico arquivo referenciado no html, todas demais chamadas de arquivo js deverão
 * ser feitas através da tag "meta#jsPageID" com o "data-value" referenciando o script
 *
 *      @ ex meta
 *          <meta id="jsPageID" data-value="pages/produtos" />
 *
 */

// CONFIG REQUIRE JS
requirejs.config({

    paths: {
        jquery: `//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min`,      // jquery 3.x
        cfw: `//src.inf.br/cfw/cfw.min`,                                        // framework
        recaptcha: `//www.google.com/recaptcha/api`,                            // recaptcha google
        addthis: `//s7.addthis.com/js/300/addthis_widget.js`                    // addthis
    },

    urlArgs: document.currentScript.src.split('?')[1],

    shim: {
        'cfw': ['jquery']
    }

});

// verifica pagina atual baseada no elemento #jsPageID
// exemplo de como informar página: @<meta id="jsPageID" data-value="home" />
define('actualPage', () => {
    const element = document.getElementById('jsPageID');
    let modulos = [];

    if (element !== null)
        modulos = element.getAttribute('data-value').split(',');

    return modulos;
});

// chamada tagmanager + scripts pagina
require(
    [
        'actualPage',
        //'components/ajaxStop.min',
        'components/tagmanager.min'
    ],
    (modulos) => {
        for (let i = 0; i < modulos.length; i++) {
            require([`${modulos[i].trim()}.min`]);
        }
    }
);

/*
<meta id="jsPageID" data-value="pages/produtos" />
*/