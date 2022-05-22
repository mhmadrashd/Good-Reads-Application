const mongoose = require("mongoose");
const countersIDSchema = require("./counterSchema");
const countersModel = mongoose.model("countersid", countersIDSchema);

module.exports = countersModel;
