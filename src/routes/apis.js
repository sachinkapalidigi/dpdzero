const express = require("express");
const registerRouter = require("./register/register.router");
const dataRouter = require("./data/data.router");
const tokenRouter = require("./token/token.router");
const { protectRoute } = require("../middlewares/auth");

const api = express.Router();

api.use("/register", registerRouter);
api.use("/token", tokenRouter);
api.use("/data", protectRoute, dataRouter);

api.use("/health-check", (req, res) => {
  res.status(200).json({
    message: "Works like magic!",
  });
});

module.exports = api;
