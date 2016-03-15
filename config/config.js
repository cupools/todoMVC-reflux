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
    weinre: {
        inject: false,
        port: 9001
    },
    liveload: false,
    HMR: true
};