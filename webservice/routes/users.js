var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({
    status: 'Logged out!'
  });
});

router.post('/campaign/create', Verify.verifyOrdinaryUser, function (req, res, next) {
  var user = req.user;
  var campaign = req.body.campaign;

  // console.log('passou', user);

  user.campaigns.push(campaign);

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
      res.status(200).json({
        status: 'Ok',
        success: true
      });
    })
  });
});

module.exports = router;