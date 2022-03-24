const express = require("express");
const { createsubsector, getsubsector } = require("../controllers/subsectors");

const Router = express.Router();

Router.post("/subsector/create", createsubsector);
Router.get("/getdubsector", getsubsector);

module.exports = Router;
