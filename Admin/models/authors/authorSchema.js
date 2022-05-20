const mongoose = require('mongoose');
const authorsSchema = new mongoose.Schema({
    _id : 'number',
    fName: 'string',
    lName:'string',
    DOB:'date',
    img:"string",
    created_at:'date',
    created_by:'string',
    updated_at:'date',
    updated_by:'string'

});

module.exports = authorsSchema;