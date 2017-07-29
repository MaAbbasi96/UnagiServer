var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Schema = mongoose.Schema({
    user: {type: String, ref: 'User'},
    post: {type: String, ref :'Post'}
});

module.exports = Schema;