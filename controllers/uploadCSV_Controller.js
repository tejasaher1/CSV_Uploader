const fileModel = require("../models/fileModel");

module.exports.uploadCSVFile = function (req, res) {
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
