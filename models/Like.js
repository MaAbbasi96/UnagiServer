var mongoose = require("mongoose");
var User = mongoose.model("User");
var Post = mongoose.model("Post");
var Schema = mongoose.Schema({
  user: { type: String, ref: "User" },
  post: { type: String, ref: "Post" }
});

Schema.index({ user: 1, post: 1 }, { unique: true });

module.exports = Schema;
