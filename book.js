'use strict'
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {type: String},
    author: {type: String},
    count: {type: Number}
},{ collection: 'books' });

module.exports = bookSchema;