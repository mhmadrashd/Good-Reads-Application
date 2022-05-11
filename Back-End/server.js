const express = require("express");
const cors = require("cors");
const userRouter = require("./components/users/usersRouter");
const authorsRouter = require("./components/authors/authorsRouter");
const categoriesRouter = require("./components/categories/categoriesRouter");
const adminsRouter = require("./components/admins/adminsRouter");
const app = express();
const port = 3000;
/*
Use require directly when we not export 
any methods from file(db file in this case)
*/
require("./assets/db/dbConnection");

//Midware to convert json from body
app.use(express.json());
app.use(cors());

//Route Authors to categoriesRouter
app.use("/admin", adminsRouter);

//Route Users to userRouter
app.use("/user", userRouter);

//Route Authors to authorsRouter
app.use("/author", authorsRouter);

//Route Authors to categoriesRouter
app.use("/category", categoriesRouter);

//Error MiddelWare must declared with 4 parameters
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
