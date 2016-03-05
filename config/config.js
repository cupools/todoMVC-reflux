module.exports = {
    project: 'bootstrap',
    alias: {
        
    },
    externals: {
        'zepto': 'Zepto'
    },
    views: '/public/views/',
    partials: 'full',
    viewEngine: {
        engine: 'handlebars',
        extname: 'handlebars'
    },
    HMR: true
};