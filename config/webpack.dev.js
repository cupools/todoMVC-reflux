'use strict';

var config = require('./config'),
    webpack = require('webpack');


module.exports = {
    entry: {
        index: ['./public/views/index/index.js', 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],
        aboutus: ['./public/views/aboutus/aboutus.js', 'webpack-hot-middleware/client', 'webpack/hot/dev-server']
    },
    output: {
        path: '/',
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