const mongoose = require("mongoose");
const CategSchema = require("./categoriesSchema");

const CategModel = mongoose.model("category", CategSchema);

module.exports = CategModel;
