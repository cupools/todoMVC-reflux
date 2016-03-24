module.exports = {
    bundle: {
        js: {
            chunk: {
                'common.js': ['index', 'aboutus']
            },
            path: 'js/',
            publicPath: 'http://cdn.com/'
        },
        css: {
            path: 'css/',
            publicPath: 'http://css.cdn.com/'
        },
        img: {
            path: 'img/',
            publicPath: 'http://img.cdn.com/'
        },
        other: {
            path: 'resource/',
            publicPath: 'http://resource.cdn.com/'
        }
    },
    webpack: {
        output: {
            path: 'build/',
            publicPath: ''
        },
        alias: {
            
        },
        externals: {
            'zepto': 'Zepto'
        },
        resolve: {
            root: [process.cwd() + '/node_modules', process.cwd() + '/public']
        }
    },
    optimize: {
        hash: 0,
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