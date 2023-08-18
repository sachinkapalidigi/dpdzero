const joi = require("joi");

const createDataSchema = joi.object().keys({
  key: joi.string().required(),
  value: joi.string().required(),
});

const updateDataSchema = joi.object().keys({
  value: joi.string().required(),
});

module.exports = {
  createDataSchema,
  updateDataSchema,
};
