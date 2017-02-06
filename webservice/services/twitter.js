var User = require('../models/user');
var Twit = require('twit');
var config = require('../config');

exports.startVotesCounters = function (user, req) {
    if (user.campaigns.length > 0) {
        req.session.streams = [];

        var T = new Twit({
            consumer_key: config.twitter.consumerKey,
            consumer_secret: config.twitter.consumerSecret,
            access_token: user.OauthToken,
            access_token_secret: user.OauthTokenSecret,
            timeout_ms: 6000,
        });

        var campaign = user.campaigns[0]; // FIXME: Consider all campaigns later.

        campaign.items.forEach(item => {

            var stream = T.stream('statuses/filter', { track: campaign.hashtag + ' ' + item.hashtag })

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

            req.session.streams.push(stream);
        });
    }
};