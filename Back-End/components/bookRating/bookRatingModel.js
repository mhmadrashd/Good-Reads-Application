const mongoose = require("mongoose");
const bookRatingSchema = require("./bookRatingSchema");

const bookRatingModel = mongoose.model("userBook", bookRatingSchema);

module.exports = bookRatingModel;