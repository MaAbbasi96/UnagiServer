var mongoose = require("mongoose"),
  mongooseObserver = require("mongoose-observer");
var User = mongoose.model("User");
var Schema = mongoose.Schema({
  text: { type: String, required: true },
  location: { type: Object, required: true },
  date: { type: Date, required: true, default: Date.now() },
  user: { type: String, ref: "User" },
  likes: { type: Number, default: 0 },
  hotRate: { type: Number, default: 0 }
});

mongoose.model("Post", Schema);

mongooseObserver.register("Post", "update", function(updatedUser) {
  var y, z;
  updatedUser.likes > 0 ? (y = 1) : (y = 0);
  updatedUser.likes == 0 ? (z = 1) : (z = x);
  updatedUser.hotRate =
    Math.log(z) / Math.log(10) +
    y * (this.date - new Date(1134028003000)) / 45000;
  updatedUser.save();
});

module.exports = Schema;
