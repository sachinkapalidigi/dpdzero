const express = require("express");
const requestValidator = require("../../middlewares/requestValidator");
const { signIn } = require("./token.validation");
const { httpGetToken } = require("./token.controller");

const tokenRouter = express.Router();

tokenRouter.get(
  "/",
  requestValidator(signIn.schema, "body", signIn.errorHandler),
  httpGetToken
);

module.exports = tokenRouter;
