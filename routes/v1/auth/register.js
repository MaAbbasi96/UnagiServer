var express = require("express"),
    mongoose = require("mongoose"),
    { createAccessToken, createRefreshToken } = require("./tokenGen");
var router = express.Router();
var User = mongoose.model("User");

router.post("/", function(req, res) {
    if (!req.body.username || !req.body.password) {
        console.log("It is here now ");
        return res
            .status(400)
            .send("You must send the username and the password");
    }

    User.findOne({ username: req.body.username }, (err, user) => {
        if (user) {
            return res.status(400).send({ message: "exists" });
        } else {
            new User({
                username: req.body.username,
                password: req.body.password,
                refreshtoken: createRefreshToken()
            }).save((err, user) => {
                if (user) {
                    return res.status(201).send({
                        message: "ok",
                        accesstoken: createAccessToken(user),
                        refreshtoken: user.refreshtoken
                    });
                } else console.error(err);
            });
        }
    });
});

module.exports = router;
