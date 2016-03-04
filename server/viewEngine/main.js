/**
 * main.js
 * 模板引擎入口文件
 * 通过 glob 判定指定模板类型是否特殊，否则直接调用 consolidate
 * 需要将模板添加到依赖路径
 */

'use strict'

var glob = require('glob'),
    consolidate = require('consolidate'),
    config = require('../../config/config');

function getEngine() {
    var engine = config.viewEngine || 'html',
        sp = glob.sync('engine-*.js', {
            cwd: __dirname
        }),
        tmp = sp.map(function(item) {
            return item.match(/engine-(\w+)\.js/)[1];
        }),
        index = tmp.indexOf(engine),
        dest;

    if(index > -1) {
        return require('./' + sp[index]);
    }
    dest = consolidate[engine];
    return {
        engine: dest,
        render: dest.render
    };
}


module.exports = getEngine();