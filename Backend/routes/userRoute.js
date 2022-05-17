const express = require("express");
const asyncHandler = require("express-async-handler");
const generateToken = require("../JWT/generateToken");
const Users = require("../models/Users");
const userRoute = express.Router();

//Users routes
//Regisrer

//login
userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (user && user.isPasswordMatch(password)) {
      res.send(200);

      res.json({
        _id: user._id,
        username: user.username,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      res.status(777);
      throw new Error("Invalid user");
    }
  })
);
//Update
userRoute.put("/update", (req, res) => {
  res.send("Update Successfully");
});
//Delete
userRoute.delete("/:id", (req, res) => {
  res.send("Delete Successfully");
});

//Fetch
userRoute.get("/", (req, res) => {
  res.send("Fetch Users");
});

module.exports = userRoute;
