const express = require("express");
const authorsRouter = express.Router();
const customeError = require("../../assets/helpers/customError");
const countersModel = require("../../assets/db/countersModel");
const AuthorModel = require("./authorsModel");
const schema = require("./validator");
const Upload = require("../../assets/helpers/Images")

async function getAuthID() {
  try {
    const lastID = await countersModel.findOne({});
    return lastID.auth_ID + 1;
  } catch (error) {
    console.log(error);
  }
}

//Get by fName(Query)
authorsRouter.get("/", async (req, res, next) => {
  const { fName } = req.query;
  try {
    const filterdAuths = fName
      ? await AuthorModel.find({ fName })
      : await AuthorModel.find({});
    res.send(filterdAuths);
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Get Auth by ID
authorsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const Auth = await AuthorModel.findById(id);
    res.send(Auth);
  } catch (error) {
    next(customeError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit Auth by ID
authorsRouter.patch("/", Upload.single("img"), async (req, res, next) => {
  const { id, fName, lName, DOB, updated_by } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      id: id,
      fName: fName,
      lName: lName,
      DOB: DOB,
      img:req.file.filename,
    });
    await AuthorModel.findByIdAndUpdate(id, {
      $set: {
        fName: fName,
        lName: lName,
        DOB: DOB,
        img: req.file.filename,
        updated_at: new Date().toGMTString(),
        updated_by: updated_by,
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Add new Auth
authorsRouter.post("/", Upload.single("img") ,async (req, res, next) => {
  const { fName, lName, DOB, created_by } = req.body;

  try {
    //Check valid Data
    await schema.validateAsync({
      fName: fName,
      lName: lName,
      DOB: DOB,
      img: req.file.filename,
    });

    //Add Auth data to AuthTable
    await AuthorModel.create({
      _id: await getAuthID(),
      fName: fName,
      lName: lName,
      DOB: DOB,
      img: req.file.filename,
      created_at: new Date().toGMTString(),
      created_by: created_by,
    });

    //Increment Auths ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        auth_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Delete Auth by ID
authorsRouter.delete("/", async (req, res, next) => {
  const { id } = req.body;
  try {
    await AuthorModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customeError(error.code, "VALIDATION_ERROR", error));
  }
});

module.exports = authorsRouter;
