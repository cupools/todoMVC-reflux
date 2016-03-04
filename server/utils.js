'use strict';

var glob = require('glob'),
    path = require('path');

module.exports = {
    /**
     * 获得入口文件
     * @return {Array} 入口文件数组
     */
    getEntrys: function() {
        var ret = {},
            self = this;

        glob.sync('public/views/*/*.js').map(function(item) {
            ret[self.getBaseName(item)] = './' + item;
        });

        return ret;
    },
    /**
     * 获得视图文件
     * @return {Array} 视图文件数组
     */
    getViews: function() {
        return glob.sync('public/views/*/*.handlebars')
    },
    /**
     * 获得模板引用集，根据配置返回简单路径或完整路径引用
     * @param  {String} view 视图文件路径，以取得相对路径
     * @return {Object}      模板引用集对象
     */
    getPartials: function(view) {
        var paths = glob.sync('public/{components/*,template}/*.handlebars'),
            partials = {},
            self = this;

        // TODO
        paths.map(function(item) {
            partials[self.getBaseName(item)] = view ? path.relative(path.join(view, '../'), item.split('.')[0]) : item;
        });

        return partials;
    },
    /**
     * 获得视图文件引用，提供路径
     * @return {Object} 视图文件集，提供路由视同
     */
    getRouter: function() {
        var paths = glob.sync('public/views/*/*.handlebars'),
            ret = {}, self = this;

        paths.map(function(item) {
            ret['/' + self.getBaseName(item)] = item;
        });

        return ret;
    },
    getBaseName: function(path) {
        return /([^\/]+?)\.\w+$/.exec(path)[1];
    }
}