'use strict';

var config = require('./config'),
    webpack = require('webpack');


module.exports = {
    entry: {
        index: ['./public/views/index/index.js'],
        aboutus: ['./public/views/aboutus/aboutus.js']
    },
    output: {
        path: 'build/',
        publicPath: '/public/assets/',
        chunkFilename: 'common.js',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.styl$/,
            loader: 'style!css!stylus?sourceMap'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
    ],
    alias: config.alias || {},
    externals: config.externals || {},
    stats: {
        colors: true,
        modules: true,
        reasons: true
    },
};