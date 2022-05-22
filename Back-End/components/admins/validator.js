const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number().integer().min(0),
  username: Joi.string().alphanum().min(3).max(30).required().trim(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  access_token: [Joi.string(), Joi.number()],
  img: Joi.string(),
});

module.exports = schema;
