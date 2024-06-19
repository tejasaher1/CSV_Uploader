const { timeStamp } = require("console");
const mongoose = require("mongoose");
const multer = require("multer");
const { type } = require("os");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/All_file_stored");
const fs = require("fs");

const csvFileSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      require: true,
    },
    filePath: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

if (!fs.existsSync(AVATAR_PATH)) {
  fs.mkdirSync(AVATAR_PATH, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Static method to handle file uploads
csvFileSchema.statics.uploadAvatar = multer({ storage: storage }).single(
  "csvFile"
);
csvFileSchema.statics.avatarPath = AVATAR_PATH;

const File = mongoose.model("csvFile", csvFileSchema);

module.exports = File;
