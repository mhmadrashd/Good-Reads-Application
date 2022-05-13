const express = require("express");
const userRouter = express.Router();
const { customError, authError } = require("../../assets/helpers/customError");
const countersModel = require("../../assets/db/countersModel");
const UserModel = require("./usersModel");
const schema = require("./validator");
const Upload = require("../../assets/helpers/Images");
const util = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authorizeUser } = require('./middlewares');

const signAsync = util.promisify(jwt.sign);

async function getUserID() {
  try {
    const lastID = await countersModel.findOne({});
    return lastID.user_ID + 1;
  } catch (error) {
    console.log(error);
  }
}

//Get user by ID
userRouter.get("/:id", authorizeUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    // await schema.validateAsync({ id: id });
    const user = await UserModel.findById(id);
    res.send(user);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit user by ID
userRouter.patch("/:id", authorizeUser, Upload.single("img"), async (req, res, next) => {
  const { id } = req.params;
  const { fName, lName, email, password } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      id: id,
      fName: fName,
      lName: lName,
      email: email,
      password: password,
      img: req.file.filename,
    });
    await UserModel.findByIdAndUpdate(id, {
      $set: {
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        img: req.file.filename,
        updated_at: new Date().toGMTString(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Add new user
userRouter.post("/", Upload.single("img"), async (req, res, next) => {
  const { fName, lName, email, password } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      fName,
      lName,
      email,
      password,
      img: req.file.filename,
    });

    //Add user data to userTable
    await UserModel.create({
      _id: await getUserID(),
      fName,
      lName,
      email,
      password,
      img: req.file.filename,
      created_at: new Date().toGMTString(),
    });
    //Increment Users ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        user_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Login user
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //Find if user exist or not
    const user = await UserModel.findOne({ email });
    if (!user) throw authError;

    //Validate password in DB hashed with enterd password
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw authError;

    //Create token
    const token = await signAsync(
      {
        id: user.id,
        name: user.fName + " " + user.lName,
        admin: false,
      },
      process.env.SECRET_KEY
    );

    //Send token to browser
    res.cookie("Authorization", token, { httpOnly: true });

    res.send({ success: 200 });
  } catch (error) {
    next(error);
  }
});

//Delete user by ID
userRouter.delete("/:id", authorizeUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

module.exports = userRouter;
