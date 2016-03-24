'use strict';

var CONFIG = require('./config'),
    utils = require('./utils'),
    webpack = require('webpack');


var devConfig = {
    entry: CONFIG.HMR ? utils.middleware(utils.getDevEntrys(), 'webpack-hot-middleware/client?reload=true', 'webpack/hot/dev-server') : utils.getEntrys(),
    output: {
        path: '/',
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets=es2015',
            excludes: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style!css?importLoaders=1'
        }, {
            test: /\.(png|jpg|ttf)$/,
            loader: 'url',
            query: {
                name: '[path][name].[ext]',
                limit: 1
            }
        }, {
            test: /\.html$/,
            loader: 'html?interpolate'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        })
    ],
    alias: {},
    externals: {},
    resolve: {},
    devtool: 'cheap-module-eval-source-map'
};

// extend webpack options by config/config.js
utils.extendOptions(devConfig);

module.exports = devConfig;