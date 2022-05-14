const Joi = require("joi");

const authorsSchema = Joi.object({
  id: Joi.number().integer().min(0),
  user: Joi.number().integer().min(0),
  book: Joi.number().integer().min(0),
  state: Joi.string().min(3).max(30).required(),
});

module.exports = authorsSchema;
