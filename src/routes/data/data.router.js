const express = require("express");
const {
  httpStoreData,
  httpUpdateData,
  httpDeleteData,
  httpRetrieveData,
} = require("./data.controller");
const requestValidator = require("../../middlewares/requestValidator");
const { createDataSchema, updateDataSchema } = require("./data.validation");

const dataRouter = express.Router();

dataRouter.route("/").post(requestValidator(createDataSchema), httpStoreData);

dataRouter
  .route("/:id")
  .get(httpRetrieveData)
  .put(requestValidator(updateDataSchema), httpUpdateData)
  .delete(httpDeleteData);

module.exports = dataRouter;
