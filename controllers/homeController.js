const fileModel = require("../models/fileModel");

module.exports.homePage = async function (req, res) {
  const allFiles = await fileModel.find();
  return res.render("index", { files: allFiles });
};
