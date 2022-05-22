const mongoose = require("mongoose");
const booksSchema = require("./booksSchema");

const booksModel = mongoose.model("book", booksSchema);

module.exports = booksModel;
