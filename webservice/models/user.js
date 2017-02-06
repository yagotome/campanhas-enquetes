var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Campaign = new Schema({
    title: String,
    description: String,
    hashtag: String,
    items: [{ hashtag: String, votes: { type: Number, default: 0 } }]
});

var User = new Schema({
    username: String,
    name: String,
    twitterId: String,
    OauthToken: String,
    OauthTokenSecret: String,
    campaigns: [Campaign]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);