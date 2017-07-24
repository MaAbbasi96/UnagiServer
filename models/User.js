var mongoose = require('mongoose');
var Schema = mongoose.Schema({
    unique_id: {type: String, unique_id: true, required: true},
    date_joined: {type: Date, required:true, default: Date.now()}
});

module.exports = Schema;
