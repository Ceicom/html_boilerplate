// função para recuperar tag name
$.fn.tagName = function () {
    return this.prop('tagName').toLowerCase();
};

// adiciona link nas imagens ou figure
const $wrapper = $('.news-content');

// função
const exec = function ($el) {
    var src = $el.tagName() === 'img' ? $el.attr('src') : $el.find('img').attr('src');
    $el.wrap('<a data-fancybox="group" href="' + src + '"></a>');
};

// adiciona link nas imagens sem legenda
$wrapper.find('img').each(function () {
    if ($(this).parent().tagName() !== 'figure' && $(this).parent().tagName() !== 'a')
        exec($(this));
});

// adiciona link nas imagens com legenda
$wrapper.find('figure').each(function () {
    if ($(this).parent().tagName() !== 'a' && !$(this).find('a').length)
        exec($(this));
});

// registros antigos
$wrapper.find('.lightbox').attr('data-fancybox', 'group');