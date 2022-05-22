const mongoose = require("mongoose");

const countersIDSchema = new mongoose.Schema({
  _id: "number",
  user_ID: "number",
  auth_ID: "number",
  book_ID: "number",
  cat_ID: "number",
  usrBook_ID: "number",
  rating_ID: "number",
  admin_ID: "number"
});
module.exports = countersIDSchema;

// UserModel.findById("1");
// let lastID = users[0].todoID + 1;
// countersModel.create({
//   _id: 1,
//   user_ID: 0,
//   Auth_ID: 0,
//   book_ID: 0,
//   cat_ID: 0,
//   user_book_ID: 0,
//   raiting_ID: 0,
// });
