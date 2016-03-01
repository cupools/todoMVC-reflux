'use strict';

var express = require('express'),
    expressHandlebars = require('express-handlebars'),
    webpack = require("webpack"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    webpackDevConf = require('../config/webpack.dev.js'),
    webpackProdConf = require('../config/webpack.prod.js'),
    Mock = require('mockjs'),
    mockData = require('./mock'),
    utils = require('./utils'),
    config = require('../config/config'),
    app = express(), compiler;

// 配置 handlebars 模板引擎
app.engine('handlebars', expressHandlebars({
    partialsDir: ['public/components/'],
    extname: '.handlebars'
}));

app.set('view engine', 'handlebars');
app.set('views', process.cwd() + '/public/views/');

// 路由
app.get('/', function (req, res) {
    res.render('index/index');
});

app.get('/aboutus', function (req, res) {
    res.render('aboutus/aboutus');
});

// webpack 中间件
compiler = webpack(webpackDevConf);
app.use(webpackDevMiddleware(compiler, {
    // all options optional
    noInfo: false,
    // display no info to console (only warnings and errors)
    quiet: false,
    // display nothing to the console
    lazy: false,
    // switch into lazy mode
    // that means no watching, but recompilation on every request
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    // watch options (only lazy: false)
    publicPath: "/public/assets/",
    // public path to bind the middleware to
    // use the same as in webpack
    headers: { "X-Custom-Header": "yes" },
    // custom headers
    stats: {
        colors: true
    }
    // options for formating the statistics
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

// 启动
var server = express();
var PORT = process.env.PORT || 9000;
server.use('/', app);
server.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});
