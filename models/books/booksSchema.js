const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    _id : 'number',
    title: 'string',
    cat_Id:'number',
    auth_Id:'number',
    img:"string",
    created_at:'date',
    created_by:'string',
    updated_at:'date',
    updated_by:'string'

});

module.exports = booksSchema;