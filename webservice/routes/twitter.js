var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var https = require('https');
var Twit = require('twit');
var config = require('../config');

router.get('/votes', Verify.verifyOrdinaryUser, function (req, res, next) {
    var T = new Twit({
        consumer_key: config.twitter.consumerKey,
        consumer_secret: config.twitter.consumerSecret,
        access_token: req.decoded._doc.OauthToken,
        access_token_secret: req.decoded._doc.OauthTokenSecret,
        timeout_ms: 6000, 
    });

    T.get('search/tweets', { q: req.query.q, include_entities: false }, function (err, data, response) {
        if (err) return next(err);
        res.status(200).json({
            status: 'Ok',
            success: true,
            data: {
                count: data.statuses.length
            }
        });
    });
});

module.exports = router;