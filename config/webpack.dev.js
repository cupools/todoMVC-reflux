'use strict';

var config = require('./config'),
    utils = require('./utils'),
    webpack = require('webpack');


var devConfig = {
    entry: utils.middleware(utils.getEntrys(), 'webpack-hot-middleware/client?reload=true', 'webpack/hot/dev-server'),
    output: {
        path: '/',
        publicPath: '/',
        chunkFilename: 'common.js',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.styl$/,
            loader: 'style!css!stylus?sourceMap'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=8192'
        }, {
            test: /\.html$/,
            loader: 'html?interpolate'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        // middleware required
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    alias: config.alias || {},
    externals: config.externals || {},
    resolve: {},
    devtool: 'cheap-module-eval-source-map'
};

utils.expandPlugins(devConfig);

module.exports = devConfig;