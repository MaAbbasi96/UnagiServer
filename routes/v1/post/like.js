var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Like = mongoose.model("Like");
var Post = mongoose.model("Post");
function updatePostLikes(increment,req){
    Post.findOne({id : req.post_id}, function(err, post){
        if (err)
            console.log(err);
        if (post){
            increment ? post.likes += 1 : post.likes -= 1;
            post.save();
        }
    });    
}
router.put("/",function(req,res,next){
    updatePostLikes(true,req);
    new Like({user : req.user.id, post : req.postId}).save((err,like)=>res.jsonp(like));
    
});
router.delete("/",function(req,res,next){
    Like.findOneAndRemove({user : req.user.id, post: req.postId},(err,response)=>{
        if (err)
            console.log(err);  
        updatePostLikes(false,req);
        return res.jsonp(response);
    });

});
module.exports = router;