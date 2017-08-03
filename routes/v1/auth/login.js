var express = require("express"),
  { createAccessToken, createRefreshToken } = require("./tokenGen"),
  jwt = require("jsonwebtoken"),
  mongoose = require("mongoose");
var User = mongoose.model("User");
var router = express.Router();

router.post("/", function(req, res) {
  if (!req.headers.type || req.headers.type in ["username", "token"])
    return res.status(401).send("please specify request type");
  if (!req.body.username)
    return res.status(400).send("You must send the username and the password");
  if (req.headers.type == "token") {
    User.findOne(
      { username: req.body.username, refreshtoken: req.headers.refreshtoken },
      (err, user) => {
        if (user) {
          return res.status(201).send({
            accesstoken: createAccessToken(user)
          });
        } else {
          return res.status(401).send("refresh token is wrong");
        }
      }
    );
  } else if (req.headers.type == "username") {
    if (!req.body.password)
      return res
        .status(400)
        .send("You must send the username and the password");
    User.findOneAndUpdate(
      { username: req.body.username, password: req.body.password },
      { $set: { refreshtoken: createRefreshToken() } },
      { new: true },
      (err, user) => {
        if (user) {
          return res.status(201).send({
            accesstoken: createAccessToken(user),
            refreshtoken: user.refreshtoken
          });
        } else
          return res.status(400).send("The username or password don't match");
      }
    );
  } else return res.status(400).send("wrong type");
});

module.exports = router;
