const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CategSchema = new mongoose.Schema({
  _id: {
    type: Number,
    min: 0,
  },
  Name: {
    type: String,
    required: [true, "Please enter a category name"],
    unique: true
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

module.exports = CategSchema;
