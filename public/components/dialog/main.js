'use strict';

var tmpl = require('./dialog.html');

var dom = null;

function show(content, title) {
    if (!content) {
        return false;
    }

    var identify = '_' + Math.random();

    dom = document.createElement('div');

    title = title || '提示';
    dom.innerHTML = tmpl.replace('{{id}}', identify).replace('{{title}}', title).replace('{{content}}', content);

    ([]).forEach.call(dom.querySelectorAll('.weui_btn_dialog'), function(item) {
        item.addEventListener('click', function() {
            hide();
        });
    });

    document.body.appendChild(dom);
}

function hide() {
    return dom && dom.parentNode.removeChild(dom);
}

exports.show = show;
exports.hide = hide;