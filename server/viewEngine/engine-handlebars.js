'use strict'

var ExpressHandlebars = require('express-handlebars'),
    config = require('../../config/config');

var hbs = ExpressHandlebars.create({
    partialsDir: config.partialsDir,
    extname: '.handlebars'
});

module.exports = {
    engine: hbs.engine,
    render: hbs.render
};