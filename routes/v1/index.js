var express = require('express');
var router = express.Router();
var post = require('./post');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');


router.use('/post', post);


module.exports = router;
