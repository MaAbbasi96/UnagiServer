var express = require("express");
var router = express.Router();
var login = require("./login");
var register = require("./register");
var logout = require("./logout");

router.use("/login", login);
router.use("/register", register);
router.use("/logout", logout);

module.exports = router;
