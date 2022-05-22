const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number().integer().min(0),
  Name: Joi.string().min(3).max(50).required(),
});

module.exports = schema;
