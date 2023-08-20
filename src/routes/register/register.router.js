const express = require("express");
const { httpCreateUser } = require("./register.controller");
const requestValidator = require("../../middlewares/requestValidator");
const { createUser } = require("./register.validation");

const registerRouter = express.Router();

registerRouter.post(
  "/",
  requestValidator(createUser.schema, "body", createUser.errorHandler),
  httpCreateUser
);

module.exports = registerRouter;
