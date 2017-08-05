var express = require("express"),
  router = express.Router(),
  post = require("./post"),
  auth = require("./auth"),
  jwt = require("express-jwt");

router.use("/auth", auth);

router.use(
  jwt({
    secret: "oonagi",
    getToken: function(req) {
      if (req.headers.accesstoken) return req.headers.accesstoken;
      return null;
    }
  }),
  function(req, res, next) {
    if (!req.user) return res.sendStatus(401);
    if (!req.headers.location) return res.sendStatus(400);
    try {
      req.location = JSON.parse(req.headers.location);
    } catch (err) {
      return sendStatus(400);
    }
    if (!req.location.latitude || !req.location.longitude)
      return sendStatus(400);
    return next();
  }
);

router.use("/post", post);

module.exports = router;
