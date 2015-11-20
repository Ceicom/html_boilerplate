function clearString(string) {
    var retorno = string.toLowerCase();
    // faz as substituições dos acentos
    retorno = retorno.replace(/[á|ã|â|à]/gi, "a");
    retorno = retorno.replace(/[é|ê|è]/gi, "e");
    retorno = retorno.replace(/[í|ì|î]/gi, "i");
    retorno = retorno.replace(/[õ|ò|ó|ô]/gi, "o");
    retorno = retorno.replace(/[ú|ù|û]/gi, "u");
    retorno = retorno.replace(/[ç]/gi, "c");
    retorno = retorno.replace(/[ñ]/gi, "n");
    retorno = retorno.replace(/[á|ã|â]/gi, "a");
    // remove . (ponto)
    retorno = retorno.replace(/\./gi, "");
    // faz a substituição dos espaços e outros caracteres por - (hífen)
    retorno = retorno.replace(/\W/gi, "-");
    // remove - (hífen) duplicados
    retorno = retorno.replace(/(\-)\1+/gi, "-");

    return retorno;
}