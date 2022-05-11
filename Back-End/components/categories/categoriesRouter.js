const express = require("express");
const CategRouter = express.Router();
const customeError = require("../../assets/helpers/customError");
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
    next(customeError(422, "VALIDATION_ERROR", error));
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
    next(customeError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit Categ by ID
CategRouter.patch("/", async (req, res, next) => {
  const { id, Name, updated_by } = req.body;
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
        updated_by,
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Add new Categ
CategRouter.post("/", async (req, res, next) => {
  const { Name, created_by } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({ Name });

    //Add Categ data to CategTable
    await CategModel.create({
      _id: await getCategID(),
      Name,
      created_at: new Date().toGMTString(),
      created_by,
    });
    //Increment Categs ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        cat_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(customeError(422, "VALIDATION_ERROR", error));
  }
});

//Delete Categ by ID
CategRouter.delete("/", async (req, res, next) => {
  const { id } = req.body;
  try {
    await CategModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customeError(error.code, "VALIDATION_ERROR", error));
  }
});

module.exports = CategRouter;
