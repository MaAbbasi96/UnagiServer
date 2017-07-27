var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

router.put("/:id",function(req,res,next){
    console.log("like id",req.params);
    console.log("post id ",req.postId);
});
module.exports = router;