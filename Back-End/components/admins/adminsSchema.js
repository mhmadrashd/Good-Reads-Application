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
    unique: true
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
  }
});

//Hash password before create user data in db
adminsSchema.pre(["save"], async function (next) {
  //Generate new salt
  const saltRounds = await bcrypt.genSalt();
  //Hashing password
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

//Hash password before update user data in db
adminsSchema.pre(["findOneAndUpdate"], async function (next) {
  //Generate new salt
  const saltRounds = await bcrypt.genSalt();
  //Hashing password
  this._update.$set.password = await bcrypt.hash(this._update.$set.password, saltRounds);
  next();
});
module.exports = adminsSchema;
