'use strict';

var config = require('./config'),
    utils = require('../server/utils'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: utils.getEntrys(),
    output: {
        path: 'build/',
        publicPath: '',
        // chunkFilename: 'common.js',
        filename: '[name].[hash:6].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css', {
                publicPath: './'
            })
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.styl$/,
            loader: 'style!css!stylus'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?name=[name].[hash:6].[ext]&limit=8192'
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].[hash:6].css'),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash:6].js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new HtmlWebpackPlugin({
            filename: 'aboutus.html',
            template: 'build/aboutus.html',
            excludeChunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'build/index.html',
            excludeChunks: ['aboutus']
        }),
    ],
    alias: config.alias || {},
    externals: config.externals || {},
    stats: {
        colors: true,
        modules: true,
        reasons: true
    }
};