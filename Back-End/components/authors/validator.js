const Joi = require("joi");

const authorsSchema = Joi.object({
  id: Joi.number().integer().min(0),
  fName: Joi.string().min(3).max(30).required(),
  lName: Joi.string().min(3).max(30).required(),
  DOB: Joi.date().max("1-1-2010").iso(),
  info: Joi.string().min(3).max(500).required(),
  img: Joi.string(),
});

module.exports = authorsSchema;
