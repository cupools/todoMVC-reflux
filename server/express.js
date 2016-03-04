'use strict';

var server = require('express')(),
    app = require('./app'),
    config = require('../config/config'),
    PORT = config.port || 9000;

server.use('/', app);
app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});