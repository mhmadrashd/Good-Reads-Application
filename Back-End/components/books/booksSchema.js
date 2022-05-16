const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  _id: {
    type: Number,
    min: 0,
  },
  title: {
    type: String,
    required: [true, "Please enter a Title"],
  },
  category: {
    type: mongoose.Schema.Types.Number,
    ref: "category",
    required: [true, "Please enter a Category"],
  },
  auhtor: {
    type: mongoose.Schema.Types.Number,
    ref: "auhtor",
    required: [true, "Please enter an Auhtor"],
  },
  description: {
    type: String,
    required: [true, "Please enter a Description"],
  },
  img: {
    type: String,
  },
  path: {
    type: String
  },
  created_by: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  updated_by: {
    type: String,
  },
  updated_at: {
    type: Date,
  },
});

module.exports = booksSchema;
