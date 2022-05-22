const express = require("express");
const authorsRouter = express.Router();
const { customError } = require("../../assets/helpers/customError");
const { authorizeAdminsPriv, loginName } = require("../../assets/helpers/checkPrivilege");
const countersModel = require("../../assets/db/countersModel");
const AuthorModel = require("./authorsModel");
const schema = require("./validator");

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
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Get Auth by ID
authorsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const Auth = await AuthorModel.findById(id);
    res.send(Auth);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit Auth by ID
authorsRouter.patch("/:id", authorizeAdminsPriv, async (req, res, next) => {
  const { id } = req.params;
  const { fName, lName, DOB, info, img } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      id: id,
      fName: fName,
      lName: lName,
      DOB: DOB,
      info,
      img,
    });
    await AuthorModel.findByIdAndUpdate(id, {
      $set: {
        fName: fName,
        lName: lName,
        DOB: DOB,
        info,
        img,
        updated_at: new Date().toGMTString(),
        updated_by: await loginName(req),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Add new Auth
authorsRouter.post("/", authorizeAdminsPriv, async (req, res, next) => {
  const { fName, lName, DOB, info, img } = req.body;

  try {
    //Check valid Data
    await schema.validateAsync({
      fName: fName,
      lName: lName,
      DOB: DOB,
      info,
      img,
    });

    //Add Auth data to AuthTable
    await AuthorModel.create({
      _id: await getAuthID(),
      fName: fName,
      lName: lName,
      DOB: DOB,
      info,
      img,
      created_at: new Date().toGMTString(),
      created_by: await loginName(req),
    });

    //Increment Auths ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        auth_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Delete Auth by ID
authorsRouter.delete("/:id", authorizeAdminsPriv, async (req, res, next) => {
  const { id } = req.params;
  try {
    await AuthorModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

module.exports = authorsRouter;
