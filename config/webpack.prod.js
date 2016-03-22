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
        filename: utils.appendHash('[name].js')
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets=es2015',
            excludes: /node_modules/
        }, {
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
            test: /\.(png|jpg|ttf)$/,
            loader: 'url',
            query: {
                limit: 8172,
                name: utils.appendHash('[name].[ext]')
            }
        }, {
            test: /\.html$/,
            loader: 'html?-minimize&interpolate'
        }],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'jshint',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(utils.appendHash('[name].css')),
        new webpack.optimize.CommonsChunkPlugin('common', utils.appendHash('common.js')),
        new webpack.optimize.UglifyJsPlugin({
            except: ['$', 'exports', 'require']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ],
    alias: CONFIG.alias || {},
    externals: CONFIG.externals || {},
    resolve: {
        root: [process.cwd() + '/node_modules', process.cwd() + '/public']
    },
    stats: {
        colors: true,
        modules: false,
        reasons: true
    },
    jshint: {
        failOnHint: true,
    }
};

utils.expandPlugins(prodConfig);

module.exports = prodConfig;