const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoDB = require("./config/mongoose");
const fs = require("fs");
const csv = require("csv-parser");

const fileModel = require("./models/fileModel");
const { error } = require("console");

require('dotenv').config();     // Load environment variables from .env file


//Middleware
app.use(express.static("./assets"));
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const mainRoute = require("./Routes/mainRote");
 
// All routes will transfer to mainRoute.js file in Routes folder
app.use("/", mainRoute);

app.listen(port, function (error) {
  if (error) {
    console.log("Error in stating the server", error);
  }

  console.log("Server is up and running on port", port);
});
