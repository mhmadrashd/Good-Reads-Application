const mongoose = require("mongoose");

const userBooksSchema = new mongoose.Schema({
  _id: {
    type: Number,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.Number,
    ref: "user",
    required: [true, "Please enter a User"],
  },
  book: {
    type: mongoose.Schema.Types.Number,
    ref: "book",
    required: [true, "Please enter a Book"],
  },
  state: {
    type: String,
    required: [true, "Please enter a State"],
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

module.exports = userBooksSchema;
