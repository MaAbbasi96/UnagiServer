var express = require("express"),
  { createAccessToken, createRefreshToken } = require("./tokenGen"),
  jwt = require("jsonwebtoken"),
  mongoose = require("mongoose"),
  verifyType = require("./reqVerification");
var User = mongoose.model("User");
var router = express.Router();

router.post("/", verifyType, function(req, res) {
  User.update(
    { ...req.mydata.obj, username: req.body.username },
    { $set: { refreshtoken: "" } },
    (err, user) => {
      if (err) {
        return res.status(401).send(req.mydata.msg);
      } else {
        return res.status(201).send({
          status: 0
        });
      }
    }
  );
});

module.exports = router;
