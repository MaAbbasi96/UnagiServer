var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/college',{useMongoClient: true,});
mongoose.Promise = require('bluebird');

var UserSchema = require('./models/User');
mongoose.model('User', UserSchema);

var PostSchema = require('./models/Post');
mongoose.model('Post', PostSchema);

var v1 = require('./routes/v1');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
var cors = require('cors');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    res.setHeader("content-type","application/json");
    res.setHeader("Access-Control-Allow-Origin","'*'");
    req.body.unique_id=req.headers.unique_id;
    req.body.location=JSON.parse(req.headers.location);
    if(!req.body.unique_id){
        return res.sendStatus(401);
    }
    var User=mongoose.model('User');
    console.log(req.body);
    if(!req.body.location || !req.body.location.latitude || !req.body.location.longitude){
        return res.sendStatus(400);
    }
    req.location=req.body.location;
    User.findOne({unique_id:req.body.unique_id},function(err,user){
        if(err){
              console.log(err);
        }
        req.user=user;
        return next();
    })
})


app.use('/', v1);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
