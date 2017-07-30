var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Post = mongoose.model("Post");
var User = mongoose.model("User");
var Like = mongoose.model("Like");
var geo = require("geolib");
var like = require("./like");
var async = require("async");
var radius = 1000;

router.use('/:id/',function(req,res,next){
    req.postId = req.params.id;
    return next();
});

router.use('/:id/like',like);

router.post("/", function(req, res) {
  if (req.user) {
    new Post({
      text: req.body.text,
      location: req.location,
      user: req.user._id
    }).save((err, post) => {
      return res.jsonp({ status: 0, text: post.text, location: post.location });
    });
  } else return res.sendStatus(401);
});
router.get("/", function(req, res) {
  if (!req.user) new User({ unique_id: req.unique_id }).save();
  var nearbyPosts = [];
  const cursor = Post.find({},[],{sort:{date:-1}}).cursor();  
  cursor.on('data',(post)=>{
      if(geo.getDistance(req.location,post.location) < radius){
        nearbyPosts = nearbyPosts.concat(post);
      }
    })
    .on('end',() =>{
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
    .on('error',(err) => res.jsonp(err));
});
module.exports = router;
