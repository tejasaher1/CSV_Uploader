const fileModel = require("../models/fileModel");
const path = require("path");
const fs = require("fs");


module.exports.uploadCSVFile = function (req, res) {
  const uploadDir = path.join(__dirname, "..", "uploads/All_file_stored");

  // if (!fs.existsSync(uploadDir)) {
  //   fs.mkdirSync(uploadDir, { recursive: true });
  // }

  fileModel.uploadAvatar(req, res, async function (error) {
    if (error) {
      console.log("Error in uploading file", error);
    }
    if (req.file) {
      // fs.readFile(path.join(__dirname,fileModel.avatarPath + '/' + req.file.filename), 'utf8', (err, data) => {
      //     if (err) {
      //         console.error('Error reading the file:', err);
      //         return;
      //     }
      //     console.log('File content:', data);
      // });

      // This is saving the path in DB model
      const files = fileModel.create({
        fileName: req.file.originalname,
        filePath: fileModel.avatarPath + "/" + req.file.filename,
      });
    }
    return res.redirect("/");
  });
};
