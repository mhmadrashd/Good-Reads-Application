const Joi = require("joi");

const authorsSchema = Joi.object({
  id: Joi.number().integer().min(0),
  user: Joi.number().integer().min(0),
  book: Joi.number().integer().min(0),
  state: Joi.number().integer().min(0).max(2),
  rating: Joi.number().integer().min(0),
  review: Joi.string().min(0).max(100),
});

module.exports = authorsSchema;
