/*
 * ## ARQUIVO PRINCIPAL DE CONFIGURAÇÕES DO REQUIREJS ##
 * 
 * unico arquivo referenciado no html, todas demais chamadas de arquivo js deverão
 * ser feitas através da tag "meta#jsPageID" com o "data-value" referenciando o script
 * 
 *      @ ex meta
 *          <meta id="jsPageID" data-value="home" /> 
 *      @ ex chamada js
 *          if (paginas[i] == 'home') require(['pages/home.min']);
 * 
 * estas chamadas de js deverão ser posicionadas dentro do callback do 'require(['actualPage'])'
 * 
 * obrigado e mantenha o código organizado !!
 * 
 */

// CONFIG REQUIRE JS
requirejs.config({

    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min', // jquery
        cfw: '//api.ceicom.com.br/libs/cfw/js/2.2/cFw.min',                 // framework
        webfonts: '../vendor/webfonts/webfont.min',                         // ajeitar dentro do arquivo as fontes do projeto
        analytics: '../vendor/analytics/analytics.min',                     // ajeitar dentro do arquivo o UA do site
        recaptcha: 'https://www.google.com/recaptcha/api',                  // recaptcha google

        // plugins
        loadcss: '../vendor/loadcss/loadcss.min',                           // loadCSS(arquivo, callback);
        dotdotdot: '../vendor/dotdotdot/jquery.dotdotdot.min',              // $elemento.dotdotdot()
        fancybox: '../vendor/fancybox/jquery.fancybox.min',                 // modal (utilizar chamada "modal")
        lazyload: '../vendor/lazyload/jquery.lazyload.min',                 // $elemento.lazyload()
        matchheight: '../vendor/match.height/jquery.matchHeight.min',       // $elemento..matchHeight()
        owlcarousel: '../vendor/owl.carousel/owl.carousel.min',             // carousel (utilizar chamada "carousel")
        sweetalert: '../vendor/sweetalert/sweet-alert.min',                 // swal({ title: 'titulo', text: 'texto', type: 'error|warning|success' })
        youtubevideo: '../vendor/youtube.video/yv.min',                     // veja "/dev/vendor/youtube.video/sample.html" para mais informações

        // funções
        array_clean: 'func/array_clean.min',    // @arr.clean("valor a ser limpo")
        getUrlParam: 'func/getUrlParam.min',    // @getURLParameter(name)
        objectSize: 'func/object_size.min',     // @Object.size(obj)
        wSize: 'func/wSize.min',                // @wSize('w') || @wSize('h')
        clearString: 'func/clearString.min'     // @clearString(string)
    },

    //urlArgs: 'v=1.0',                           // produção
    urlArgs: 'v=' + (new Date()).getTime(),     // desenvolvimento

    shim: {
        'cfw': ['jquery'],
        'dotdotdot': ['jquery'],
        'fancybox': ['jquery'],
        'lazyload': ['jquery'],
        'matchheight': ['jquery'],
        'owlcarousel': ['jquery'],
        'sweetalert': ['jquery']
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


// check ie version
require(['ie/version.min'], function (ieV) {

    // ie 8 para baixo
    if (ieV < 9) require(['ie/insert.min']);

    // ie 9+ e outros navegadores
    else {

        // adiciona classe ie
        if (ieV < 100) document.getElementsByTagName('html')[0].className += ' ie' + ieV;

        // js default's
        require(
            [
                'webfonts',             // webfonts
                'analytics',            // analytics
            ]
        );


        // chamada dos scripts por pagina
        require(['actualPage'], function (paginas) {
            for (var i = 0; i < paginas.length; i++) {

                // ux
                if (paginas[i] == 'modal') require(['ux/modal.min']);
                else if (paginas[i] == 'carousel') require(['ux/carousel.min']);

                // componentes
                else if (paginas[i] == 'forms') require(['components/forms.min']);
                else if (paginas[i] == 'popup') require(['components/popup.min']); //<input type="hidden" name="banner" value="imagem|link" />

                // pages
                //else if (paginas[i] == 'home') require(['pages/home.min']);
            }
        });

    }
});