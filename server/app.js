'use strict';

var express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConf = require('../config/webpack.dev.js'),
    Mock = require('mockjs'),
    mockData = require('./mock'),
    CONFIG = require('../config/config'),
    utils = require('../config/utils'),
    app = express(),
    compiler;

// inject script for weinre
if (CONFIG.weinre.inject) {
    app.use(require('connect-inject')({
        snippet: '<script src=\"http://' + utils.getIP() + ':' + CONFIG.weinre.port + '/target/target-script-min.js#' + CONFIG.name + '\"></script>'
    }));
}

// webpack middleware
compiler = webpack(webpackDevConf);
app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    headers: {
        'X-Custom-Header': 'yes'
    },
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));

// static resource
app.use(express.static(process.cwd()));

// Mock Data
mockData.forEach(function(conf) {
    if (conf.path) {
        conf.method = conf.method || 'get';
        app[conf.method](conf.path, function(req, res) {
            setTimeout(function() {
                res.send(Mock.mock(conf.data));
            }, conf.delay || 0);
        });
    }
});

module.exports = app;