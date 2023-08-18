const { GENERAL_RESPONSE } = require("../constants/generalResponse");

const requestValidator = (schema, rvt = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[rvt]);
    if (error) {
      let customError;
      try {
        customError = JSON.parse(error.details[0].message);
      } catch (e) {
        customError = GENERAL_RESPONSE.INVALID_REQUEST;
      }
      return res.status(400).send(customError);
    }
    return next();
  };
};

module.exports = requestValidator;
