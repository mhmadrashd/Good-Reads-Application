const jwt = require("jsonwebtoken");
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "mern", {
    expiresIn: "10r",
  });
};

module.exports = generateToken;
