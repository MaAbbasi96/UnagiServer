var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.post('/',function(req,res){
    if(req.user){
        new Post({text:req.body.text,location:req.location,user:req.user._id}).save((err,post)=>{
            if(err){
                return res.jsonp({status: -1, err})
            }
            else{
                return res.jsonp({status: 0, text:post.text,location:post.location});
            }
        });
    }
    else{
        return res.sendStatus(401);
    }
});

router.get(('/'),function(req,res,next){
    return res.render('add',{title: 'yes'});
});

module.exports = router;