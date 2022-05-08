const express = require("express");
const userRouter = express.Router();
const customeError = require("../../assets/helpers/customError");
const countersModel = require("../../assets/db/countersModel");
const UserModel = require("./usersModel");
const schema = require("./validator");

// const defaultStatus = ["Read", "Reading", "Want-To-Read"];

async function getUserID() {
  try {
    const lastID = await countersModel.findOne({});
    return lastID.user_ID + 1;
  } catch (error) {
    console.log(error);
  }
}

//Get by fName(Query)
userRouter.get("/", async (req, res, next) => {
  const { fName } = req.query;
  try {
    const filterdUsers = fName
      ? await UserModel.find({ fName })
      : await UserModel.find({});
    res.send(filterdUsers);
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Get user by ID
userRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // await schema.validateAsync({ id: id });
    const user = await UserModel.findById(id);
    res.send(user);
  } catch (error) {
    next(customeError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit user by ID
userRouter.patch("/", async (req, res, next) => {
  const { id, fName, lName, email, password, img } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      id: id,
      fName: fName,
      lName: lName,
      email: email,
      password: password,
    });
    await UserModel.findByIdAndUpdate(id, {
      $set: {
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        img: img,
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Add new user
userRouter.post("/", async (req, res, next) => {
  const { fName, lName, email, password, img } = req.body;

  try {
    //Check valid Data
    await schema.validateAsync({
      fName: fName,
      lName: lName,
      email: email,
      password: password,
      img: img,
    });

    //Add user data to userTable
    await UserModel.create({
      _id: await getUserID(),
      fName: fName,
      lName: lName,
      email: email,
      password: password,
      img: img,
    });

    //Increment Users ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        user_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Delete user by ID
userRouter.delete("/", async (req, res, next) => {
  const { id } = req.body;
  try {
    await UserModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customeError(error.code, "VALIDATION_ERROR", error));
  }
});

module.exports = userRouter;
