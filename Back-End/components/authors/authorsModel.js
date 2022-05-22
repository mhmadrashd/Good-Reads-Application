const mongoose = require("mongoose");
const authorsSchema = require("./authorsSchema");

const authorsModel = mongoose.model("auhtor", authorsSchema);

module.exports = authorsModel;
