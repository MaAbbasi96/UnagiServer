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

router.use("/:id/", function(req, res, next) {
  req.postId = req.params.id;
  return next();
});
router.use("/:id/like", like);
router.post("/", function(req, res) {
  if (req.user) {
    new Post({
      text: req.body.text,
      location: req.location,
      user: req.user._id,
      date: Date.now()
    }).save((err, post) => {
      return res.jsonp({
        status: 0,
        text: post.text,
        location: post.location
      });
    });
  } else return res.sendStatus(401);
});
router.get("/", function(req, res) {
  sendPosts(req, res, false);
});
router.get("/hot", function(req, res) {
  sendPosts(req, res, true);
});

function sendPosts(req, res, hotRequested) {
  var sortBy;
  if (hotRequested) sortBy = { hotRate: -1 };
  else sortBy = { date: -1 };
  if (!req.user)
    new User({
      unique_id: req.unique_id
    }).save();
  var nearbyPosts = [];
  var addPost = false;
  if (!req.headers.lastpost) {
    addPost = true;
  }
  const cursor = Post.find({}, [], {
    sort: sortBy
  }).cursor();
  cursor
    .on("data", post => {
      if (geo.getDistance(req.location, post.location) < radius && addPost) {
        nearbyPosts = nearbyPosts.concat(post);
      }
      if (post._id == req.headers.lastpost) {
        addPost = true;
      }
      if (nearbyPosts.length >= 10) addPost = false;
    })
    .on("end", () => {
      if (hotRequested)
        nearbyPosts.sort((a, b) => {
          return a.hotRate > b.hotRate ? -1 : b.hotRate > a.hotRate ? 1 : 0;
        });
      if (req.user) {
        //Don't get post likes if user is new
        async.map(
          nearbyPosts,
          (post, cb) => {
            Like.findOne(
              {
                user: req.user._id,
                post: post.id
              },
              (err, like) => {
                var postObject = post.toObject();
                like
                  ? (postObject.isLiked = true)
                  : (postObject.isLiked = false);
                cb(null, postObject);
              }
            );
          },
          (error, response) => {
            res.jsonp({
              posts: response,
              status: 0
            });
          }
        );
      } else
        res.jsonp({
          posts: nearbyPosts,
          status: 0
        }); //
    })
    .on("error", err => res.jsonp(err));
}

module.exports = router;
