var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var TwitterStrategy = require('passport-twitter').Strategy;

exports.twitter = passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
},
    function (token, tokenSecret, profile, callback) {
        User.findOne({ twitterId: profile.id }, function (err, user) {
            if (err) {
                console.log(err);
            }
            if (!err && user !== null) {
                callback(null, user);
            } else {
                user = new User({
                    name: profile.displayName,
                    username: profile.username
                });
                user.twitterId = profile.id;
                user.OauthToken = token;
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {                     
                        callback(null, user);
                    }
                });
            }
        });
    }));