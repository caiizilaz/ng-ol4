const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const UserCtrl = require('../controller/user-ctrl');

router.post('/register', (req, res, next) => {
  UserCtrl.addUser(req, res, next);
});

router.post('/authenticate', (req, res, next) => {
  UserCtrl.authenticate(req, res, next)
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ user: req.user });
});

router.get('/all', (req, res, next) => {
  User.find({}, (err, user) => {
    res.json(user);
  })
})

module.exports = router;