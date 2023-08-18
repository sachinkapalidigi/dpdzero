const joi = require("joi");

const createUserSchema = joi.object().keys({
  full_name: joi.string().required(),
  username: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    .max(100)
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")),
  age: joi.number().greater(0).less(200).required(),
  gender: joi.string().allow("male", "female", "non-binary").required(),
});

module.exports = {
  createUserSchema,
};
