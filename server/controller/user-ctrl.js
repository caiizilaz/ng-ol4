const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

let UserCtrl = {
  getUserById(id, callback) {
    User.findById(id, callback);
  },
  getUserByUsername(username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
  },
  addUser(req, res, next) {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save((err, user) => {
          if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
          } else {
            res.json({ success: true, msg: 'User registered' });
          }
        });
      });
    });
  },
  comparePassword(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) throw err;
      callback(null, isMatch);
    });
  },
  authenticate(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    this.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({ success: false, msg: 'User not found' });
      }
      this.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(user, config.secret, {
            expiresIn: 604800
          });
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          });
        } else {
          return res.json({ success: false, msg: 'Wrong password' });
        }
      });
    });
  }
}

module.exports = UserCtrl;