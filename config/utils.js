'use strict';

var glob = require('glob'),
    CONFIG = require('./config');

/**
 * factory of glob method
 */
function factory(options) {
    var reg = options.reg,
        keyFn = options.keyFn || getBaseName,
        valFn = options.valFn;

    return function() {
        var arr = glob.sync(reg),
            ret = {},
            keys, vals;

        keys = arr.map(keyFn);
        vals = valFn ? arr.map(valFn) : arr;

        keys.map(function(key, index) {
            ret[key] = vals[index];
        });

        return ret;
    };
}

/**
 * get basename in path
 */
function getBaseName(path) {
    return /([^\/]+?)\.\w+$/.exec(path)[1];
}

/**
 * append webpack-dev-server and HMR middleware to entry options
 */
function middleware(obj) {
    var keys = Object.keys(obj),
        plugins = ([]).splice.call(arguments, 1);

    keys.forEach(function(key) {
        if (typeof obj[key] === 'string') {
            obj[key] = ([]).concat(obj[key]);
        }

        obj[key] = obj[key].concat(plugins);
    });

    return obj;
}

/**
 * expand plugins of webpack options
 */
function expandPlugins(options) {
    // html-webpack-plugin
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    var map = factory({
            reg: 'public/views/*/*.html',
            keyFn: function(path) {
                return (/[^\/]+?\.\w+/).exec(path)[0];
            }
        })(),
        keys = Object.keys(map),
        extra = function(key) {
            return keys.filter(function(k) {
                return k !== key;
            }).map(function(key) {
                return getBaseName(key);
            });
        };

    keys.map(function(key) {
        options.plugins.push(new HtmlWebpackPlugin({
            filename: key,
            template: map[key],
            excludeChunks: extra(key)
        }));
    });

    // HRM middleware
    var webpack = require('webpack');
    
    if(CONFIG.HMR) {
        options.plugins.push(
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        );
    }

}

/**
 * insert specified loader in webpack options
 */
function extendLoader(options) {

}

/**
 * append hash to specified file
 */
function appendHash(file) {
    var reg = /([\w\W]+)(\.[^\.]+)$/,
        tmpl = '.[hash:\\d]',
        m = reg.exec(file),
        hash = CONFIG.hash;

    if (hash && m && m[1] && m[2]) {
        return m[1] + tmpl.replace(/\\d/, hash) + m[2];
    } else {
        return file;
    }
}

/**
 * get IP address
 */
function getIP() {
    var interfaces = require('os').networkInterfaces(),
        IPv4 = '127.0.0.1', alias;

    Object.keys(interfaces).forEach(function(key) {
        alias = 0;
        interfaces[key].forEach(function(details) {
            if (details.family === 'IPv4' && key === 'en0') {
                IPv4 = details.address;
            }
        });
    });

    return IPv4;
}

module.exports = {
    getDevEntrys: factory({
        reg: 'public/views/*/*.js',
        valFn: function(path) {
            return ['./' + path, ('./' + path).replace(/js$/, 'html')];
        }
    }),
    getEntrys: factory({
        reg: 'public/views/*/*.js',
        valFn: function(path) {
            return './' + path;
        }
    }),
    getBaseName: getBaseName,
    middleware: middleware,
    expandPlugins: expandPlugins,
    appendHash: appendHash,
    getIP: getIP
};