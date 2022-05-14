const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema({
  _id: {
    type: Number,
    min: 0,
  },
  fName: {
    type: String,
    required: [true, "Please enter a first name"],
  },
  lName: {
    type: String,
    required: [true, "Please enter a last name"],
  },
  DOB: {
    type: Date,
  },
  Info:{
    type: String,
  },
  img: {
    type: String,
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

module.exports = authorsSchema;
