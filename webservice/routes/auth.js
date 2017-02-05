var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', function (req, res, next) {
    passport.authenticate('twitter', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    err: 'User login error'
                });
            }
            var token = Verify.getToken(user);
            // res.status(200).json({
            //     status: 'Login successful!',
            //     success: true,
            //     token: token
            // });
            res.status(200).end(`<a href="http://localhost:3001/#/login?token=${token}&user=${user.name}">Clique aqui para continuar</a>`);
        });
    })(req, res, next);
});

router.get('/checkSession/:token', function (req, res, next) {
    console.log(req.user);
    if (req.user && req.params.token == Verify.getToken(req.user))
        return res.status(200).json({ success: true });
    res.status(401).json({ success: false });
});

module.exports = router;