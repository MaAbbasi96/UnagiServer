var mongoose = require("mongoose");
var User = mongoose.model("User");
var Schema = mongoose.Schema({
    text: { type: String, required: true },
    location: { type: Object, required: true },
    date: { type: Date, required: true, default: Date.now() },
    user: { type: String, ref: "User" },
    likes: { type: Number, default: 0 },
    repliedTo: { type: String, ref: "Post", default: null }
});
Schema.virtual("hotRate").get(function() {
    var b = new Date(1134028003000);
    var time = this.date - b;
    var x = this.likes;
    var y, z;
    x > 0 ? (y = 1) : (y = 0);
    x == 0 ? (z = 1) : (z = x);
    return Math.log(z) / Math.log(10) + y * time / 45000;
});
// return this.nickname + ` (${this.credit}$)`}

module.exports = Schema;
