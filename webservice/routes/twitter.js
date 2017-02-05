var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var https = require('https');
var Twit = require('twit');
var config = require('../config');

router.post('/votes', Verify.verifyOrdinaryUser, function (req, res, next) {
    
    var user = req.decoded._doc;

    var T = new Twit({
        consumer_key: config.twitter.consumerKey,
        consumer_secret: config.twitter.consumerSecret,
        access_token: user.OauthToken,
        access_token_secret: user.OauthTokenSecret,
        timeout_ms: 6000,
    });

    var campaign = user.campaigns.id(req.body.campaignId);

    campaign.items.forEach(item => {

        var stream = T.stream('statuses/filter', { track: item.hashtag })

        stream.on('tweet', function (tweet) {
            if (tweet.entities.hashtags.some(obj => obj.text === item.hashtag)) {
                item.votes++;
                item.save(function (err, resp) {
                    if (err) throw err;
                });
            }
        });

        stream.on('error', function (err) {
            console.log(err);
        });

        stream.on('disconnect', function (disconnectMessage) {
            console.log('disconnect', disconnectMessage);
        });

    });

    res.status(200).json({
        status: 'Ok',
        success: true
    });
});

module.exports = router;