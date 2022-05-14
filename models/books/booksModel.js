const mongoose = require('mongoose');
const booksSchema = require('./booksSchema');

const BooksModel = mongoose.model('Book' , booksSchema);

module.exports = BooksModel;