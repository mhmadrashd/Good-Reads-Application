const mongoose = require('mongoose');
const authorSchema = require('./authorSchema');

const AuthorsModel = mongoose.model('Auhtor' , authorSchema);

module.exports = AuthorsModel;