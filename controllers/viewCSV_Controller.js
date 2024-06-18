const fileModel = require("../models/fileModel");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

module.exports.viewCSV = async function (req, res) {
  try {
    const file = await fileModel.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found");
    }

    const results = [];
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    fs.createReadStream(path.join(__dirname, "..", file.filePath))
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        const paginatedResults = results.slice(startIndex, endIndex);
        const totalPages = Math.ceil(results.length / limit);

        res.render("viewCSV", {
          file: file,
          data: paginatedResults,
          currentPage: page,
          totalPages: totalPages,
          allData: results,
        });
      });
  } catch (err) {
    console.error("Error reading the file:", err);
    res.status(500).send("Error reading file");
  }
};
