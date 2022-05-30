const express = require("express");
const AdminRouter = express.Router();
const { customError, authError } = require("../../assets/helpers/customError");
const countersModel = require("../../assets/db/countersModel");
const AdminsModel = require("./adminsModel");
const schema = require("./validator");
const util = require("util");
const jwt = require("jsonwebtoken");
const { authorizeAdmin } = require('./middlewares');
const bcrypt = require("bcrypt");
const signAsync = util.promisify(jwt.sign);


async function getAdminID() {
  try {
    const lastID = await countersModel.findOne({});
    return lastID.admin_ID + 1;
  } catch (error) {
    console.log(error);
  }
}

//Get Admin by ID
AdminRouter.get("/:id", authorizeAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    // await schema.validateAsync({ id: id });
    const Admin = await AdminsModel.findById(id);
    res.send(Admin);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit Admin by ID
AdminRouter.patch("/:id", authorizeAdmin, async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, img } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      id: id,
      username,
      email,
      password,
      img,
    });
    await AdminsModel.findByIdAndUpdate(id, {
      $set: {
        username,
        email,
        password,
        img,
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Add new Admin
AdminRouter.post("/", async (req, res, next) => {
  const { username, email, password, img } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      username,
      email,
      password,
      img,
    });

    //Add Admin data to AdminTable
    await AdminsModel.create({
      _id: await getAdminID(),
      username,
      email,
      password,
      img,
    });
    //Increment Admins ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        admin_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Login Admin
AdminRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  // const { token } = req.headers.Authorization;
  // console.log(token)
  // // console.log(req.header)
  // console.log(req.headers)
  try {
    //Find if Admin exist or not
    const admin = await AdminsModel.findOne({ email });
    if (!admin) throw authError;

    //Validate password in DB hashed with enterd password
    const result = await bcrypt.compare(password, admin.password);
    if (!result) throw authError;

    //Create token
    const token = await signAsync(
      {
        id: admin.id,
        name: admin.username,
        admin: true,
      },
      process.env.SECRET_KEY
    );
    // res.cookie("Authorization", token, { maxAge: 24 * 60 * 60 * 1000 });
    res.send({ Authorization: token });
  } catch (error) {
    next(error);
  }
});

//Delete Admin by ID
AdminRouter.delete("/:id", authorizeAdmin, async (req, res, next) => {
  const { id } = req.params;
  try {
    await AdminsModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

module.exports = AdminRouter;
