var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var geo=require('geolib');
var User = mongoose.model('User');
var radius = 1000;

router.post('/',function(req,res){
    if(req.user) new Post({text:req.body.text,location:req.location,user:req.user._id})
    .save((err,post)=>{return res.jsonp({status: 0, text:post.text,location:post.location});});
    else return res.sendStatus(401);
});


router.get('/',function(req,res){
    if(!req.user) new User({unique_id:req.body.unique_id}).save()
    var nearbyPosts=[];
    Post.find({},[],{sort:{
        date_added: -1 //Sort by Date Added DESC
    }},function(err, posts){
        posts.forEach(function(post) {
            if (geo.getDistance(req.location , post.location)<radius){
                nearbyPosts=nearbyPosts.concat(post);
            }
        }, this);
    return res.jsonp({posts: nearbyPosts,status: 0});
    })
return;
})



module.exports = router;