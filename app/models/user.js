var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Chore', new Schema({
    name: String,
    password: String
}));