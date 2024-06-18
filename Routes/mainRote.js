const express = require("express");

const Route = express.Router();

const homeController = require("../controllers/homeController");
const uploadCSV_Controller = require("../controllers/uploadCSV_Controller");
const viewCSV_Controller = require("../controllers/viewCSV_Controller");
const deleteCSV_Controller = require("../controllers/deleteCSV_controller");

Route.get("/", homeController.homePage);

Route.post("/uploadsCSV", uploadCSV_Controller.uploadCSVFile);

Route.get("/viewCSV/:id", viewCSV_Controller.viewCSV);

Route.post("/deleteCSV", deleteCSV_Controller.deleteCSVFile);

module.exports = Route;
