'use strict';

const glob = require('glob'),
    CONFIG = require('../config/config');

/**
 * factory of glob method
 */
function factory(options) {
    let reg = options.reg,
        keyFn = options.keyFn || getBaseName,
        valFn = options.valFn;

    return function() {
        let arr = glob.sync(reg),
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
    return require('path').basename(path, getExtname(path));
}

/**
 * get extname in path
 */
function getExtname(path) {
    return require('path').extname(path);
}

/**
 * append webpack-dev-server and HMR middleware to entry options
 */
function middleware(obj) {
    let keys = Object.keys(obj),
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
    // html-webpack-plugin, build html template
    let HtmlWebpackPlugin = require('html-webpack-plugin');

    let map = factory({
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

    let webpack = require('webpack');

    // if (process.env.NODE_ENV === 'development') {
    if (1) {
        // HRM middleware
        if (CONFIG.HMR) {
            options.plugins.push(
                new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoErrorsPlugin()
            );
        }

    } else if (process.env.NODE_ENV === 'production') {
        // CommonsChunkPlugin, by config.chunk
        for (let file in CONFIG.bundle.chunk) {
            options.plugins.push(
                new webpack.optimize.CommonsChunkPlugin(file, CONFIG.bundle.chunk.file)
            );
        }
    }
}

/**
 * insert specified loader in webpack options
 */
function extendLoader(options) {

}

/**
 * extend webpack options
 */
function extendOptions(options) {

    expandPlugins(options);
    extendLoader(options);

    let deepAssign = require('deep-assign');
    deepAssign(options, CONFIG.webpack);

    return options;
}

/**
 * name output by config, includes [hash] and [path]
 */
function name(file, type) {
    file = updateHash(file);
    file = updatePath(file, type);

    return file;
}

/**
 * update hash to specified file
 */
function updateHash(file) {
    let reg = /\[(\w*?hash\w*?)\]/,
        m = reg.exec(file),
        hash = CONFIG.optimize.hash;

    if (hash && m) {
        return file.replace(reg, `[$1:${hash}]`);
    } else if (!hash) {
        return file.replace(reg, '');
    } else {
        return file;
    }
}

/**
 * update path to specified file
 */
function updatePath(file, type) {
    let reg = {
        image: /\.(png|jpg|jpeg|gif|webp)$/,
        js: /\.js$/,
        css: /\.css$/
    };

    if (reg[type]) {
        return `${CONFIG.bundle.path[type]}${file}`;
    } else if (reg.js.exec(file)) {
        return `${CONFIG.bundle.path.js}${file}`;
    } else if (reg.css.exec(file)) {
        return `${CONFIG.bundle.path.css}${file}`;
    } else if (reg.image.exec(file)) {
        return `${CONFIG.bundle.path.image}${file}`;
    }

    return file;
}

/**
 * get IP address
 */
function getIP() {
    let interfaces = require('os').networkInterfaces(),
        IPv4 = '127.0.0.1',
        alias;

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
    name: name,
    middleware: middleware,
    extendOptions: extendOptions,
    getIP: getIP
};