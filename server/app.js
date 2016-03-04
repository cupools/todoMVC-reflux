'use strict';

var express = require('express'),
    webpack = require("webpack"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    webpackDevConf = require('../config/webpack.dev.js'),
    webpackProdConf = require('../config/webpack.prod.js'),
    consolidate = require('consolidate'),
    Mock = require('mockjs'),
    mockData = require('./mock'),
    utils = require('./utils'),
    config = require('../config/config'),
    app = express(), compiler;

// 模板引擎
app.engine('handlebars', consolidate.handlebars);
app.set('views', process.cwd() + '/');

// 路由
app.get(/\/[\w]+$/, function(req, res, next) {
    var view = utils.getRouter()[req.url];

    if(view) {
        res.render(view, {
            partials: utils.getPartials(view)
        });
    } else {
        next();
    }
});

// webpack 开发中间件
compiler = webpack(webpackDevConf);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    quiet: false,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: "/public/assets/",
    headers: { "X-Custom-Header": "yes" },
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));

// 静态资源
app.use(express.static(process.cwd()));

// Mock 数据模拟
mockData.forEach(function (conf) {
    if (conf.path) {
        conf.method = conf.method || 'get';
        app[conf.method](conf.path, function (req, res) {
            setTimeout(function() {
                res.send(Mock.mock(conf.data));
            }, conf.delay || 0);
        });
    }
});

module.exports = app;