var validaURL = function (url) {
    var r = /^(http|https):\/\/[^ "]+$/;
    return r.test(url);
}