const joi = require("joi");
const {
  LOGIN_RESPONSE: { MISSING_FIELDS },
} = require("../../constants/userResponse");
const {
  GENERAL_RESPONSE: { INVALID_REQUEST },
} = require("../../constants/generalResponse");

const signInSchema = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required(),
});

const signInErrorHandler = (error) => {
  const errorMessage = error.details[0].message;
  const errorType = errorMessage.split(" ")[0];
  let response;

  switch (errorType) {
    case `"username"`:
      response = MISSING_FIELDS;
      break;
    case `"password"`:
      response = MISSING_FIELDS;
      break;
    default:
      response = INVALID_REQUEST;
  }

  return response;
};

module.exports = {
  signIn: {
    schema: signInSchema,
    errorHandler: signInErrorHandler,
  },
};
