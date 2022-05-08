const Joi = require("joi");

const authorsSchema = Joi.object({
  id: Joi.number().integer().min(0),
  fName: Joi.string().alphanum().min(3).max(30).required(),
  lName: Joi.string().alphanum().min(3).max(30).required(),
  DOB: Joi.date().max("1-1-2010").iso(),
});

module.exports = authorsSchema;
