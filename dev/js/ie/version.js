define(function () {

    var getInternetExplorerVersion = function () {
        var rv = 100; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        } else {
            if (/Edge\/12./i.test(navigator.userAgent)) {
                rv = 12;
            } else if (/rv:11.0/i.test(navigator.userAgent)) {
                rv = 11;
            }
        }

        return rv;
    };

    return getInternetExplorerVersion();
});