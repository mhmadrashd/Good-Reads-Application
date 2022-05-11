const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number().integer().min(0),
  Name: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports = schema;
