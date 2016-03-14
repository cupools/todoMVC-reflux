module.exports = {
    name: 'bootstrap',
    alias: {
        
    },
    externals: {
        'zepto': 'Zepto'
    },
    hash: 6,
    views: '/public/views/',
    partials: 'full',
    weinre: {
        inject: true,
        port: 9001
    },
    HMR: true
};