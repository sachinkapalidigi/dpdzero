const express = require("express");
const {
  httpStoreData,
  httpUpdateData,
  httpDeleteData,
  httpRetrieveData,
} = require("./data.controller");
const requestValidator = require("../../middlewares/requestValidator");
const { createData, updateData } = require("./data.validation");

const dataRouter = express.Router();

dataRouter
  .route("/")
  .post(
    requestValidator(createData.schema, "body", createData.errorHandler),
    httpStoreData
  );

dataRouter
  .route("/:id")
  .get(httpRetrieveData)
  .put(
    requestValidator(updateData.schema, "body", updateData.errorHandler),
    httpUpdateData
  )
  .delete(httpDeleteData);

module.exports = dataRouter;
