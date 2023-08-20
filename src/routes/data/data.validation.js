const joi = require("joi");
const {
  RECORD_RESPONSE: { INVALID_KEY, INVALID_VALUE },
} = require("../../constants/recordResponse");
const {
  GENERAL_RESPONSE: { INVALID_REQUEST },
} = require("../../constants/generalResponse");

const createDataSchema = joi.object().keys({
  key: joi.string().required(),
  value: joi.string().required(),
});

const updateDataSchema = joi.object().keys({
  value: joi.string().required(),
});

const createDataErrorHandler = (error) => {
  const errorMessage = error.details[0].message;
  const errorType = errorMessage.split(" ")[0];
  let response;

  switch (errorType) {
    case `"key"`:
      response = INVALID_KEY;
      break;
    case `"value"`:
      response = INVALID_VALUE;
      break;
    default:
      response = INVALID_REQUEST;
  }

  return response;
};

const updateDataErrorHandler = (error) => {
  const errorMessage = error.details[0].message;
  const errorType = errorMessage.split(" ")[0];
  let response;

  switch (errorType) {
    case `"value"`:
      response = INVALID_VALUE;
      break;
    default:
      response = INVALID_REQUEST;
  }

  return response;
};

module.exports = {
  createData: {
    schema: createDataSchema,
    errorHandler: createDataErrorHandler,
  },
  updateData: {
    schema: updateDataSchema,
    errorHandler: updateDataErrorHandler,
  },
};
