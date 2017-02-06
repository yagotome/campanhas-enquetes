var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Verify = require('./verify');
var TwitterService = require('../services/twitter');

router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({
    status: 'Logged out!'
  });
});

router.post('/campaign/create', Verify.verifyOrdinaryUser, function (req, res, next) {
  var user = req.user;
  var campaign = req.body.campaign;

  User.findById(user._id, function (err, result) {
    if (err) return next(err);
    if (!result) {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      return next(err);
    }
    result._doc.campaigns.push(campaign);
    result.save(function (err, doc) {
      if (err) return next(err);
      user = doc._doc;
      campaign = user.campaigns[0]; // FIXME: Consider all campaigns later.
      TwitterService.startVotesCounters(user, req);
      res.status(200).json({
        status: 'Ok',
        success: true,
        campaign: campaign
      });
    })
  });
});

router.get('/campaign', Verify.verifyOrdinaryUser, function (req, res, next) {
  var user = req.user;

  User.findById(user._id, function (err, result) {
    if (err) return next(err);
    if (!result) {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      return next(err);
    }
    var campaigns = result._doc.campaigns;
    var campaign = null;
    if (campaigns.length > 0) campaign = campaigns[0] // FIXME: Consider all campaigns later.
    res.status(200).json({
      status: 'Ok',
      success: true,
      campaign: campaign
    });
  });
});

router.get('/campaign/finish', Verify.verifyOrdinaryUser, function (req, res, next) {
  if (req.session.streams) {
    delete req.session.streams;
  }
  User.findByIdAndUpdate(req.user._id, { $set: { campaigns: [] } }, function (err, result) {
    if (err) return next(err);
    res.status(200).json({
      status: 'Ok',
      success: true
    });
  });
});

module.exports = router;