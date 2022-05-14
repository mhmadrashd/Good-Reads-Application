const express = require("express");
const booksRouter = express.Router();
const { customError } = require("../../assets/helpers/customError");
const { authorizeAdminsPriv, loginName } = require("../../assets/helpers/checkPrivilege");
const countersModel = require("../../assets/db/countersModel");
const booksModel = require("./booksModel");
const schema = require("./validator");
const Upload = require("../../assets/helpers/Images");
const CategModel = require("../categories/categoriesModel");
const AuthModel = require("../authors/authorsModel");

//userBooks variables
const userBooksModel = require("../userBooks/userBooksModel");
const userBooksValidator = require("../userBooks/validator");
// const defaultStatus = ["Read", "Reading", "Want-To-Read"];


/* ****************Start Books Methods**************** */
async function getBookID() {
  try {
    const lastID = await countersModel.findOne({});
    return lastID.book_ID + 1;
  } catch (error) {
    console.log(error);
  }
}

//Get by Title(Query)
booksRouter.get("/", async (req, res, next) => {
  const { title } = req.query;
  try {
    const filterdBooks = title
      ? await booksModel.find({ title }).populate({ path: "category", select: "Name" }).populate({ path: "auhtor", select: "fName lName DOB img" }).exec()
      : await booksModel.find({}).populate({ path: "category", select: "Name" }).populate({ path: "auhtor", select: "fName lName DOB img" }).exec();
    res.send(filterdBooks);
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Get Book by ID
booksRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const Book = await booksModel.findById(id).populate({ path: "category", select: "Name" }).populate({ path: "auhtor", select: "fName lName DOB img" }).exec();
    res.send(Book);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit Book by ID
booksRouter.patch("/:id", authorizeAdminsPriv, Upload.single("img"), async (req, res, next) => {
  const { id } = req.params;
  const { title, category, auhtor } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      id: id,
      title,
      category,
      auhtor,
      img: req.file.filename,
    });
    await booksModel.findByIdAndUpdate(id, {
      $set: {
        title,
        category: await CategModel.findOne({ _id: category }),
        auhtor: await AuthModel.findOne({ _id: auhtor }),
        img: req.file.filename,
        updated_at: new Date().toGMTString(),
        updated_by: await loginName(req),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Add new Book
booksRouter.post("/", authorizeAdminsPriv, Upload.single("img"), async (req, res, next) => {
  const { title, category, auhtor } = req.body;

  try {
    //Check valid Data
    await schema.validateAsync({
      title,
      category,
      auhtor,
      img: req.file.filename,
    });

    //Add Book data to BookTable
    await booksModel.create({
      _id: await getBookID(),
      title,
      category: await CategModel.findById({ _id: category }),
      auhtor: await AuthModel.findById({ _id: auhtor }),
      img: req.file.filename,
      created_at: new Date().toGMTString(),
      created_by: await loginName(req),
    });

    //Increment Books ID Counter in countersID table
    await countersModel.findByIdAndUpdate(1, {
      $inc: {
        book_ID: 1,
      },
    });

    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Delete Book by ID
booksRouter.delete("/:id", authorizeAdminsPriv, async (req, res, next) => {
  const { id } = req.params;
  try {
    await booksModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});
/* ****************End Books Methods**************** */


/* ****************Start userBooks Methods**************** */

/* ****************End userBooks Methods**************** */

module.exports = booksRouter;
