var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    name: String,
    twitterId: String,
    OauthToken: String,
    OauthTokenSecret: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);