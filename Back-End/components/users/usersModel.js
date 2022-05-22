const mongoose = require("mongoose");
const userSchema = require("./userSchema");

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
