'use strict';

var CONFIG = require('./config'),
    utils = require('./utils'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var prodConfig = {
    entry: utils.getEntrys(),
    output: {
        path: 'build/',
        publicPath: '',
        filename: utils.name('[name].js')
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets=es2015',
            excludes: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css', {
                publicPath: './'
            })
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.styl$/,
            loader: 'style!css!stylus'
        }, {
            test: /\.(png|jpg|ttf)$/,
            loader: 'url',
            query: {
                name: utils.name('[name].[ext]'),
                limit: 8172
            }
        }, {
            test: /\.html$/,
            loader: 'html?-minimize&interpolate'
        }]
    },
    plugins: [
        new ExtractTextPlugin(utils.name('[name].css')),
        new webpack.optimize.CommonsChunkPlugin('common', utils.name('common.js')),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ],
    alias: {},
    externals: {},
    resolve: {},
    stats: {
        colors: true,
        modules: false,
        reasons: true
    }
};

// extend webpack options by config/config.js
utils.extendOptions(prodConfig);

module.exports = prodConfig;