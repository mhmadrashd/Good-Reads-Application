const express = require("express");
const AdminRouter = express.Router();
const customeError = require("../../assets/helpers/customError");
const countersModel = require("../../assets/db/countersModel");
const AdminsModel = require("./adminsModel");
const schema = require("./validator");
const Upload = require("../../assets/helpers/Images")

async function getAdminID() {
  try {
    const lastID = await countersModel.findOne({});
    return lastID.admin_ID + 1;
  } catch (error) {
    console.log(error);
  }
}

//Get by username(Query)
AdminRouter.get("/", async (req, res, next) => {
  const { username } = req.query;
  try {
    const filterdAdmins = username
      ? await AdminsModel.find({ username })
      : await AdminsModel.find({});
    res.send(filterdAdmins);
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Get Admin by ID
AdminRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // await schema.validateAsync({ id: id });
    const Admin = await AdminsModel.findById(id);
    res.send(Admin);
  } catch (error) {
    next(customeError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit Admin by ID
AdminRouter.patch("/", Upload.single("img"), async (req, res, next) => {
  const { id, username, email, password } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      id: id,
      username,
      email,
      password,
      img: req.file.filename,
    });
    await AdminsModel.findByIdAndUpdate(id, {
      $set: {
        username,
        email,
        password,
        img: req.file.filename,
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Add new Admin
AdminRouter.post("/", Upload.single("img"), async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      username,
      email,
      password,
      img:req.file.filename,
    });

    //Add Admin data to AdminTable
    await AdminsModel.create ({
      _id: await getAdminID(),
      username,
      email,
      password,
      img:req.file.filename,
    });
    //Increment Admins ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        admin_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Delete Admin by ID
AdminRouter.delete("/", async (req, res, next) => {
  const { id } = req.body;
  try {
    await AdminsModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customeError(error.code, "VALIDATION_ERROR", error));
  }
});

module.exports = AdminRouter;
