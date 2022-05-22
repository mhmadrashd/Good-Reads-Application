const mongoose = require("mongoose");
const userBooksSchema = require("./userBooksSchema");

const userBooksModel = mongoose.model("userBook", userBooksSchema);

module.exports = userBooksModel;
