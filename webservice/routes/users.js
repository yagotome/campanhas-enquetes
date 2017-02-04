var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({
    status: 'Logged out!'
  });
});

module.exports = router;