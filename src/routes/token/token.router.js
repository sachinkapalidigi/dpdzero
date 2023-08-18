const express = require("express");
const requestValidator = require("../../middlewares/requestValidator");
const { signInSchema } = require("./token.validation");
const { httpGetToken } = require("./token.controller");

const tokenRouter = express.Router();

tokenRouter.get("/", requestValidator(signInSchema), httpGetToken);

module.exports = tokenRouter;
