function capitalize(string, eachWord) {
    var str;

    if (eachWord)
        str = string.replace(/\w\S*/g, function (txt) { return txt.length > 1 ? txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() : txt; });
    else
        str = string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);

    return str;
}