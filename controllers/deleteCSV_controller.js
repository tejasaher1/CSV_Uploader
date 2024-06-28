const fileModel = require("../models/fileModel");
const path = require("path");
const fs = require("fs");

//This controller is work to delete file from DB and also unlink the file from uploads path using fs

module.exports.deleteCSVFile = async function (req, res) {
  // Get the file ID from the query parameters
  const fileID = req.query.id;
  const file = await fileModel.findById(fileID);
  
  // Use fs.unlink to delete the file from the file system
  fs.unlink(path.join(__dirname, "..", file.filePath), function (error) {
    if (error) {
      console.log("Error in deleting file", error);
    }

    // Find the file in the database by ID and delete it
    fileModel
      .findByIdAndDelete(fileID)
      .then(function (deletedFile) {
        console.log("File deleted successfully");
        return res.redirect("back");
      })
      .catch(function (err) {
        console.error("Error deleting file:", err);
        return res.redirect("back");
      });
  });
};
