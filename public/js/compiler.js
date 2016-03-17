'use strict';

var escape = function(html) {
    return String(html)
        .replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;'); // IE 下不支持 &apos; 转义
};

var compile = function(str) {
    var tpl = str.replace(/\n/g, '\\n')
        .replace(/\{\{(?!#)([\w\W]+?)\}\}/g, function(match, data) {
            // 转义
            return '\' + escape(' + data + ') + \'';
        }).replace(/\{\{#([\w\W]+?)\}\}/g, function(match, data) {
            // 可执行代码
            return '\';\n' + data + '\n tpl+=\'';
        }).replace(/\'\n/g, '\'')
        .replace(/\n\'/gm, '\'');
        
        tpl = 'tpl = \'' + tpl + '\';';
        // 转换空行
        tpl = tpl.replace(/''/g, '\'\\n\'');
        tpl = 'var tpl = \'\';\n with (obj || {}) {\n'  + tpl + '\n}\n return tpl;';
        return new Function('obj', 'escape', tpl); // jshint ignore:line
};

var render = function(str, obj) {
    var compiled = compile(str);
    return compiled(obj, escape);
};

exports.render = render;
