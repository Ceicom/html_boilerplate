// array filter (remove elementos vazios)
function array_filter(arr) {

    var retObj = {}, k;
    var func = function (v) { return v; };

    if (Object.prototype.toString.call(arr) === '[object Array]') { retObj = []; }

    for (k in arr) {
        if (func(arr[k])) { retObj[k] = arr[k]; }
    }

    return retObj;
}