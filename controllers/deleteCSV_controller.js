const fileModel = require("../models/fileModel");
const path = require("path");
const fs = require("fs");

module.exports.deleteCSVFile = async function (req, res) {
  const fileID = req.query.id;
  const file = await fileModel.findById(fileID);
  fs.unlink(path.join(__dirname, "..", file.filePath), function (error) {
    if (error) {
      console.log("Error in deleting file", error);
    }

    fileModel
      .findByIdAndDelete(fileID)
      .then(function (deletedFile) {
        console.log("File deleted successfully");
        return res.redirect("back");
      })
      .catch(function (err) {
        console.error("Error deleting file:", err);
        return;
      });
  });
};
