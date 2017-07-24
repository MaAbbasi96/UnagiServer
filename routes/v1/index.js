var express = require('express');
var router = express.Router();
var get_posts = require('./get_posts');
var add_post = require('./add_post');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');


router.use('/get_posts', get_posts);
router.use('/add_post', add_post);


module.exports = router;
