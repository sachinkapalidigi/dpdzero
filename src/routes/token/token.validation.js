const joi = require("joi");

const signInSchema = joi.object().keys({
  username: joi.string().required(), // TODO: handle custom error
  password: joi.string().required(),
});

module.exports = {
  signInSchema,
};
