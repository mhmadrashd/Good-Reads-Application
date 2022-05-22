const express = require("express");
const booksRouter = express.Router();
const { customError } = require("../../assets/helpers/customError");
const { authorizeAdminsPriv, loginName, loginID } = require("../../assets/helpers/checkPrivilege");
const countersModel = require("../../assets/db/countersModel");
const booksModel = require("./booksModel");
const schema = require("./validator");
const CategModel = require("../categories/categoriesModel");
const AuthModel = require("../authors/authorsModel");

//userBooks variables
const userBooksModel = require("../userBooks/userBooksModel");
const userBooksValidator = require("../userBooks/validator");
const UserModel = require("../users/usersModel");

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

booksRouter.get("/", async (req, res, next) => {
  try {
    const books = await booksModel.find({});
    res.send(books);
  } catch (error) {
    console.log(error);
  }
})
//Get by Title(Query)
booksRouter.get("/", async (req, res, next) => {
  const { title } = req.query;
  try {
    const filterdBooks = title
      ? await booksModel.find({ title })
        .populate({ path: "category", select: "Name" })
        .populate({ path: "auhtor", select: "fName lName DOB img" }).exec()
      : await booksModel.find({})
        .populate({ path: "category", select: "Name" })
        .populate({ path: "auhtor", select: "fName lName DOB img" }).exec();
    res.send(filterdBooks);
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Get Book by auhtorID
booksRouter.get("/authBook/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const Book = await booksModel.find({ auhtor: id })
      .populate({ path: "category", select: "Name" }).exec();
    res.send(Book);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

//Get Book by ID
booksRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const Book = await booksModel.findById(id)
      .populate({ path: "category", select: "Name" })
      .populate({ path: "auhtor", select: "fName lName DOB img" }).exec();
    res.send(Book);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

//Edit UserBook state by userBookID
booksRouter.patch("/userBook", async (req, res, next) => {
  const user = await loginID(req, res);
  const { book, state, rating, review } = req.body;
  try {
    const findState = await userBooksModel.updateMany({ user: user, book: book }, {
      "$set": {
        state,
        rating,
        review,
        updated_at: new Date().toGMTString(),
      },
    });
    console.log(findState)
    if (findState.modifiedCount !== 0) res.sendStatus(222);
    else res.sendStatus(555);

  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Edit Book by ID
booksRouter.patch("/:id", authorizeAdminsPriv, async (req, res, next) => {
  const { id } = req.params;
  const { title, category, auhtor, description, img } = req.body;
  try {
    //Check valid Data
    await schema.validateAsync({
      id: id,
      title,
      category,
      auhtor,
      description,
      img,
    });
    await booksModel.findByIdAndUpdate(id, {
      $set: {
        title,
        category: await CategModel.findOne({ _id: category }),
        auhtor: await AuthModel.findOne({ _id: auhtor }),
        description,
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

//Add new Book
booksRouter.post("/", authorizeAdminsPriv, async (req, res, next) => {
  const { title, category, auhtor, description, img } = req.body;

  try {
    //Check valid Data
    await schema.validateAsync({
      title,
      category,
      auhtor,
      description,
      img,
    });

    //Add Book data to BookTable
    await booksModel.create({
      _id: await getBookID(),
      title,
      category: await CategModel.findById({ _id: category }),
      auhtor: await AuthModel.findById({ _id: auhtor }),
      description,
      img,
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
//Get userBook ID
async function getUserBookID() {
  try {
    const lastID = await countersModel.findOne({});
    return lastID.usrBook_ID + 1;
  } catch (error) {
    console.log(error);
  }
}

//Get userBooks by userID
booksRouter.get("/userBook/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const Book = await userBooksModel.find({ user: id })
      .populate({ path: "book", select: "title category auhtor img" }).exec();
    res.send(Book);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

//Get userBooks by bookID
booksRouter.get("/userBookBID/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const Book = await userBooksModel.find({ book: id })
      .populate({ path: "book", select: "title category auhtor img" })
      .populate({ path: "user", select: "fName lName" }).exec();
    res.send(Book);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});



//Add new userBook
booksRouter.post("/userBook", async (req, res, next) => {
  const { book, state, rating, review } = req.body;
  const user = await loginID(req, res);
  try {
    //Check valid Data
    const Book = await userBooksModel.find({ book: book, user: user });
    if (Book.length === 0) {
      await userBooksValidator.validateAsync({
        user: await loginID(req),
        book,
        state,
        rating,
        review,
      });

      //Add Book data to BookTable
      await userBooksModel.create({
        _id: await getUserBookID(),
        user: await UserModel.findById({ _id: await loginID(req) }),
        book: await booksModel.findById({ _id: book }),
        state,
        rating,
        review,
        created_at: new Date().toGMTString(),
      });

      //Increment Books ID Counter in countersID table
      await countersModel.findByIdAndUpdate(1, {
        $inc: {
          usrBook_ID: 1,
        },
      });

      res.send({ success: true });
    }
    else {
      res.sendStatus(555);
    }
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});


booksRouter.patch("/userBook/state/:id", async (req, res, next) => {
  const { id } = req.params;
  const { state } = req.body;
  try {
    await userBooksModel.findByIdAndUpdate(id, {
      $set: {
        state,
        updated_at: new Date().toGMTString(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Delete userBook by userBookID
booksRouter.delete("/userBook/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await userBooksModel.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});
/* ****************End userBooks Methods**************** */


/* ****************start Rating Methods**************** */


//Edit UserBook Rating by userBookID
booksRouter.patch("/userBook/rating/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rating } = req.body;
  try {
    await userBooksModel.findByIdAndUpdate(id, {
      $set: {
        rating,
        updated_at: new Date().toGMTString(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Edit UserBook Review by userBookID
booksRouter.patch("/userBook/review/:id", async (req, res, next) => {
  const { id } = req.params;
  const { review } = req.body;
  try {
    await userBooksModel.findByIdAndUpdate(id, {
      $set: {
        review,
        updated_at: new Date().toGMTString(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
});

//Get userBooks by userID
booksRouter.get("/userBook/review/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const Book = await userBooksModel.find({ _id: id }, "review")
    res.send(Book);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

/* ****************End Rating Methods**************** */

module.exports = booksRouter;
