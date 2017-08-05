var express = require("express"),
  { createAccessToken, createRefreshToken } = require("./tokenGen"),
  mongoose = require("mongoose"),
  verifyType = require("./reqVerification");
var User = mongoose.model("User");
var router = express.Router();

router.post("/", verifyType, function(req, res) {
  req.mydata.obj.username = req.body.username;
  User.findOneAndUpdate(
    req.mydata.obj,
    { $set: { refreshtoken: createRefreshToken() } },
    { new: true },
    (err, user) => {
      if (user) {
        return res.status(201).send({
          accesstoken: createAccessToken(user),
          refreshtoken: user.refreshtoken
        });
      } else {
        return res.status(401).send(req.mydata.msg);
      }
    }
  );
});

module.exports = router;
