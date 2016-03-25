module.exports = {
    webpack: {
        externals: {},
        resolve: {
            root: [process.cwd() + '/node_modules', process.cwd() + '/public'],
            alias: {
                zepto: 'bower_components/webpack-zepto'
            }
        }
    },
    bundle: {
        chunk: {
            'common.js': ['index', 'aboutus']
        },
        path: {
            js: 'js/',
            css: 'css/',    
            image: 'img/',
            font: 'font/'
        },
        publicPath: './'
    },
    optimize: {
        hash: 6,
        limit: 8192,
        uglifyjs: {
            except: ['$', 'exports', 'require']
        }
    },
    weinre: {
        inject: false,
        port: 9001
    },
    HMR: true,
    extend: {
        'es6': true
    }
};