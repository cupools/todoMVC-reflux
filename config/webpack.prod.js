'use strict';

var CONFIG = require('./config'),
    utils = require('./utils'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var prodConfig = {
    entry: utils.getEntrys(),
    output: {
        path: 'build/',
        filename: utils.name('[name].[chunkhash].js')
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets=es2015',
            excludes: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css', {
                publicPath: 'http://img.cdn/'
            })
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url',
            query: {
                name: utils.name('[name].[hash].[ext]', 'img'),
                limit: 1
            }
        }, {
            test: /\.(ttf)$/,
            loader: 'url',
            query: {
                name: utils.name('[name].[hash].[ext]')
            }
        }, {
            test: /\.html$/,
            loader: 'html?-minimize&interpolate&root=../../..'
        }]
    },
    plugins: [
        new ExtractTextPlugin(utils.name('[name].[contenthash].css')),
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