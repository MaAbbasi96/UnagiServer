var mongoose = require("mongoose");
var Schema = mongoose.Schema({
  unique_id: { type: String, unique: true, required: true },
  date_joined: { type: Date, required: true, default: Date.now() },
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true }
});

module.exports = Schema;
