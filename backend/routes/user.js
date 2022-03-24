const express = require("express");
const { createuser, getuser } = require("../controllers/user");

const Router = express.Router();

Router.post("/user/create", createuser);
Router.get("/getuser/:id", getuser);

module.exports = Router;
