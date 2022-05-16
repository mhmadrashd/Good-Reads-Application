const Joi = require("joi");

const authorsSchema = Joi.object({
  id: Joi.number().integer().min(0),
  title: Joi.string().alphanum().min(3).max(30).required(),
  category: Joi.any(),
  auhtor: Joi.any(),
  description: Joi.string().min(3).max(255).required(),
  img: Joi.any(),
  path: Joi.string()
});

module.exports = authorsSchema;
