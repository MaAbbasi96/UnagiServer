var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var geo = require("geolib");
var async = require("async");
var Post = mongoose.model("Post");
var Like = mongoose.model("Like");
var radius = 1000;
function print(response){
    response.foreach((res)=>{

    });
}
router.get("/",function(req,res,next){
    var nearbyPosts = [];
    const cursor = Post.find().cursor();
    cursor.on('data',(post)=>{
      console.log("HotRate", post.hotRate);
      if(geo.getDistance(req.location,post.location) < radius){
        nearbyPosts = nearbyPosts.concat(post);
      }
    })
    .on('end',()=>{
        nearbyPosts.sort((a,b) => {return (a.hotRate > b.hotRate) ? -1 : ((b.hotRate > a.hotRate) ? 1 : 0);})  
        async.map(nearbyPosts,(post,cb) =>{
            Like.findOne({user:req.user._id,post:post.id}, (err,like)=>{
            var postObject = post.toObject();
            postObject.isLiked = true;
            like ? postObject.isLiked = true : postObject.isLiked = false;
            cb(null, postObject);
            })
        },
            (error,response)=>res.jsonp({'posts':response,'status' : 0}));

    
    })
});


module.exports = router;