'use strict';

var glob = require('glob'),
    path = require('path'),
    config = require('./config');

function Facotry (options) {
    var reg = options.reg,
        keyFn = options.keyFn || getBaseName,
        valFn = options.valFn;

    return function() {
        var arr = glob.sync(reg),
            ret = {}, i, key, val;

        key = arr.map(keyFn);
        val = arr.map(valFn);

        key.map(function(item) {
            ret[item] = val;
        });

        return ret;
    }
}

function getBaseName (path) {
    return /([^\/]+?)\.\w+$/.exec(path)[1];
}

module.exports = {
    getEntrys: function() {
        var ret = {},
            self = this;

        glob.sync('public/views/*/*.js').map(function(item) {
            ret[self.getBaseName(item)] = './' + item;
        });

        // ret['index.html'] = './build/index.html';
        // ret['aboutus.html'] = './build/aboutus.html';

        return ret;
    },
    getViews: function() {
        return glob.sync('public/views/*/*.handlebars')
    },
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