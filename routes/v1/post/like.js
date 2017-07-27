var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Like = mongoose.model("Like");
var Post = mongoose.model("Post");

router.put("/",function(req,res,next){
    console.log("like id",req.params);
    console.log("post id ",req.postId);
    new Like({user : req.user.id, post : req.postId}).save();
    Post.findOne({id : req.post_id}, function(err, post){
        if (err)
            console.log(err);
        if (post){
            post.likes = post.likes + 1;
            post.save();
            return res.jsonp("Liked");
        }
    });
    
});
module.exports = router;