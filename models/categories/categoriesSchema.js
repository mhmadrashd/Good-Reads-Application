const mongoose = require('mongoose');
const categoriesSchema = new mongoose.Schema({
    _id : 'number',
    Name: 'string',
    created_at:'date',
    created_by:'string',
    updated_at:'date',
    updated_by:'string'
});

module.exports = categoriesSchema;