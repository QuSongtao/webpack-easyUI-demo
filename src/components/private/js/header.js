(function () {
    var data = {
        meta: [
            "<meta name=\'renderer\' content=\'webkit\'/>",
            "<meta name=\'viewport\' content=\'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\'>",
            "<meta name=\'mobile-web-app-capable\' content=\'yes\'>",
            "<meta name=\'apple-mobile-web-app-capable\' content=\'yes\'>",
            "<meta name=\'apple-mobile-web-app-status-bar-style\' content=\'black-translucent\'>"
        ],
        js: [
            "<script type='application/javascript' src='../../../../components/easyui/jquery.min.js'></script>",
            "<script type='application/javascript' src='../../../../components/easyui/jquery.easyui.min.js'></script>",
        ],
        elements: [
            ""
        ]
    };

    var htmlStr = data.meta.concat(data.js, data.elements).join("");
    document.writeln(htmlStr);
}());