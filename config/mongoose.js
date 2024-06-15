const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CSV_File');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', function() {
  console.log('Successfully connected to database!');
});

module.exports = db;