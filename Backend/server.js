const bodyparser = require("body-parser");
const cors = require("cors");
const express = require("express");
// const mongoose = require('mongoose');
require("./DBconnection/DBconnect")();
const userRoute = require("./routes/userRoute");
const error = require("./middlewares/errorMiddleware");
// const dotenv = require("dotenv");
const app = express();
const port = 5000;

// dotenv.config();
//passing body data
app.use(express.json());
app.use(bodyparser.json({ extended: false }));
app.use(
  cors({
    exposedHeaders: ["Authorization"],
  })
);

//Routes
app.use("/user", userRoute);

// console.log(process.env);
//error middleware
app.use(error.errorMiddlewareHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
