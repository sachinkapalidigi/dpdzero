const express = require("express");
const { httpCreateUser } = require("./register.controller");
const requestValidator = require("../../middlewares/requestValidator");
const { createUserSchema } = require("./register.validation");

const registerRouter = express.Router();

registerRouter.get("/", requestValidator(createUserSchema), httpCreateUser);

module.exports = registerRouter;
