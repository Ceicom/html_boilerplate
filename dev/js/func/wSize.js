//retorna W ou H da janela
var wSize = function (type) {
    if (type == 'h') return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (type == 'w') return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

/* exemplo */
//if (wSize('w') > 800)