const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminsSchema = new mongoose.Schema({
  _id: {
    type: Number,
    min: 0,
  },
  username: {
    type: String,
    required: [true, "Please enter an username"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 8,
  },
  img: {
    type: String,
  },
});

adminsSchema.pre("save", async function (next) {
  const saltRounds = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});
adminsSchema.pre( /^find/, async function (next) {
  const saltRounds = await bcrypt.genSalt();
  this._update.$set.password = await bcrypt.hash(this._update.$set.password, saltRounds);
  next();
});
module.exports = adminsSchema;
