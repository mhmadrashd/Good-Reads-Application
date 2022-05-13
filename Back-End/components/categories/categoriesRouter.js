const express = require("express");
const CategRouter = express.Router();
const { customError } = require("../../assets/helpers/customError");
const { authorizeAdminsPriv, loginName } = require("../../assets/helpers/checkPrivilege");
const countersModel = require("../../assets/db/countersModel");
const CategModel = require("./categoriesModel");
const schema = require("./validator");

async function getCategID() {
  try {
    const lastID = await countersModel.findOne({});
    return lastID.cat_ID + 1;
  } catch (error) {
    console.log(error);
  }
}

//Get by Name(Query)
CategRouter.get("/", async (req, res, next) => {
  const { Name } = req.query;
  try {
    const filterdCategs = Name
      ? await CategModel.find({ Name })
      : await CategModel.find({});
    res.send(filterdCategs);
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Get Categ by ID
CategRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // await schema.validateAsync({ id: id });
    const Categ = await CategModel.findById(id);
    res.send(Categ);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit Categ by ID
CategRouter.patch("/:id", authorizeAdminsPriv, async (req, res, next) => {
  const { id } = req.params;
  const { Name } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      id: id,
      Name
    });
    await CategModel.findByIdAndUpdate(id, {
      $set: {
        Name,
        updated_at: new Date().toGMTString(),
        updated_by: await loginName(req),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Add new Categ
CategRouter.post("/", authorizeAdminsPriv, async (req, res, next) => {
  const { Name } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({ Name });

    //Add Categ data to CategTable
    await CategModel.create({
      _id: await getCategID(),
      Name,
      created_at: new Date().toGMTString(),
      created_by: await loginName(req),
    });
    //Increment Categs ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        cat_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Delete Categ by ID
CategRouter.delete("/:id", authorizeAdminsPriv, async (req, res, next) => {
  const { id } = req.params;
  try {
    await CategModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

module.exports = CategRouter;
