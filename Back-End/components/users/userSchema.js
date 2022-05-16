const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
  path: {
    type: String
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

//Hash password before create user data in db
userSchema.pre(["save"], async function (next) {
  //Generate new salt
  const saltRounds = await bcrypt.genSalt();
  //Hashing password
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

//Hash password before update user data in db
userSchema.pre(["findOneAndUpdate"], async function (next) {
  //Generate new salt
  const saltRounds = await bcrypt.genSalt();
  //Hashing password
  this._update.$set.password = await bcrypt.hash(this._update.$set.password, saltRounds);
  next();
});
module.exports = userSchema;
