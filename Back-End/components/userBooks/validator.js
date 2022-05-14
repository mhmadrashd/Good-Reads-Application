const Joi = require("joi");

const authorsSchema = Joi.object({
  id: Joi.number().integer().min(0),
  user: Joi.number().integer().min(0),
  book: Joi.number().integer().min(0),
  rating: Joi.number().integer().min(0),
  review: Joi.string().min(0).man(100),
  state: Joi.string().min(3).max(30).required(),
});

module.exports = authorsSchema;
