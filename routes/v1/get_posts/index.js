var express = require('express');
var router = express.Router();
var geo=require('geolib');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

var radius = 1000;

router.post('/',function(req,res){
    if(!req.user){
        new User({unique_id:req.body.unique_id}).save((err,post)=>{
            if(err){
                return res.jsonp({status: -1, err})
            }
        })
    }
    var nearbyPosts=[];
    Post.find({},function(err, posts){
        posts.forEach(function(post) {
            if (geo.getDistance(req.location , post.location)<radius){
                nearbyPosts=nearbyPosts.concat(post);
            }
        }, this);
    return res.jsonp({nearbyPosts,status: 0});
    })
return;
})

router.get('/',function(req,res){
   Post.find({},function(err,posts){
        return res.jsonp(posts);
   });
    return;
})

module.exports = router;