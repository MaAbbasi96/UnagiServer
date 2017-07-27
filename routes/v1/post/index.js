var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Post = mongoose.model("Post");
var geo = require("geolib");
var User = mongoose.model("User");
var like = require("./like");
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
  // Post.find({}, [], { sort: { date: -1 } }, function(err, posts) {
  //   posts.forEach(function(post) {
  //     if (geo.getDistance(req.location, post.location) < radius) {
  //       nearbyPosts = nearbyPosts.concat(post);
  //     }
  //   }, this);
  //   return res.jsonp({ posts: nearbyPosts, status: 0 });
  // });
  const cursor = Post.find({},[],{sort:{date:-1}}).cursor();  
      cursor.on('data',(post)=>{
      // console.log(post,"--------------------");
      // console.log('distance',geo.getDistance(req.location,post.location));
      if(geo.getDistance(req.location,post.location) < radius){
        nearbyPosts = nearbyPosts.concat(post);
      }
    })
    .on('end',() =>res.jsonp({posts : nearbyPosts,status : 0}))
    .on('error',(err) => res.jsonp(err));
    // return res.jsonp({posts : nearbyPosts,status : 0});
});

module.exports = router;
