module.exports = {
    name: 'bootstrap',
    alias: {
        
    },
    externals: {
        'zepto': 'Zepto'
    },
    hash: 6,
    optimize: {
        imageLimit: 8192
    },
    webpack: {
        alias: {
            
        },
        externals: {
            'zepto': 'Zepto'
        },
        hash: 6,
        optimize: {
            imageLimit: 8192
        },
        HMR: true
    },
    weinre: {
        inject: false,
        port: 9001
    },
    HMR: true
};