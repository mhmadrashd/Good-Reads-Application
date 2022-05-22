const express = require("express");
const cors = require("cors");
const userRouter = require("./components/users/usersRouter");
const authorsRouter = require("./components/authors/authorsRouter");
const categoriesRouter = require("./components/categories/categoriesRouter");
const adminsRouter = require("./components/admins/adminsRouter");
const booksRouter = require("./components/books/booksRouter");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
require('express-async-errors');
const app = express();
const port = 3000;
/*
Use require directly when we not export 
any methods from file(db file in this case)
*/
require("dotenv").config();
require("./assets/db/dbConnection");

//Midware to convert json from body
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//Route Authors to categoriesRouter
app.use("/admin", adminsRouter);

//Route Users to userRouter
app.use("/user", userRouter);

//Route Authors to authorsRouter
app.use("/author", authorsRouter);

//Route Authors to categoriesRouter
app.use("/category", categoriesRouter);

//Route Books to categoriesRouter
app.use("/book", booksRouter);

//Get userBooks by userID
app.get("/isLoged", async (req, res, next) => {
  try {
    const token = req.cookies.Authorization;
    console.log(req.cookies)
    if (token) {
      await jwt.verify(token, process.env.SECRET_KEY, (err, decodeToken) => {

        if (err) {
          res.redirect('/login');
          res.sendStatus(555);
          console.log("1")
        } else {
          console.log("2")
          res.sendStatus(222);
          next();
        }
      });
    }
    else {
      console.log("333")
      res.sendStatus(555);
    }
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
});

//Error MiddelWare must declared with 4 parameters
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Good Readings app listening on port ${port}`);
});
