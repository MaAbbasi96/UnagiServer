var mongoose = require("mongoose");
var Schema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  date_joined: { type: Date, required: true, default: Date.now() },
  refreshtoken: { type: String, default: "" }
});

mongoose.model("User", Schema);

module.exports = Schema;
