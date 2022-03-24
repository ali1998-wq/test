const express = require("express");
const {
  createsector,
  getsectors,
  editsector,
} = require("../controllers/sector");
const Router = express.Router();

Router.post("/sector/create", createsector);
Router.get("/getsctors", getsectors);
Router.post("/updatesector", editsector);

module.exports = Router;
