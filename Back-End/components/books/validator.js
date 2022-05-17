const Joi = require("joi");

const authorsSchema = Joi.object({
  id: Joi.number().integer().min(0),
  title: Joi.string().min(3).max(30).required(),
  category: Joi.any(),
  auhtor: Joi.any(),
  description: Joi.string().min(3).max(500).required(),
  img: Joi.string(),
});

module.exports = authorsSchema;
