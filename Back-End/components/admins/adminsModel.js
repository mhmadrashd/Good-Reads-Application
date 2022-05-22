const mongoose = require("mongoose");
const adminsSchema = require("./adminsSchema");

const AdminsModel = mongoose.model("admin", adminsSchema);

module.exports = AdminsModel;
