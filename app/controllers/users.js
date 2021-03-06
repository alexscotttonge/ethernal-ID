'use strict';

var mongoose = require('mongoose')
var User = require("../models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

module.exports = {

  new: function (req, res) {
    res.render('users/new', {
      title: 'Sign Up form '
    });
  },

  create: function(req, res) {
    req.body.username
    req.body.password
    User.register(new User({
      username: req.body.username
    }), req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        return res.render('users/new');
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/applications");
      });
    });
  }
  
}
