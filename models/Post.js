var mongoose = require('mongoose');
var User=mongoose.model('User');
var Schema = mongoose.Schema({
    text: {type: String, required: true},
    location: {type: Object, required: true},
    date: {type: Date, required:true, default: Date.now()},
    user: {type: String, ref: 'User'},
    likes: {type: Number, default : 0}
});

module.exports = Schema;