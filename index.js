'use strict'
const port = process.env.PORT || 30000;

require('./app')(port);
console.log('Sevrer is listening on port: ' + port);
