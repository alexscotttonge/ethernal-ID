'use strict';

var passport = require('passport');

module.exports = {

  new: function(req, res, next) {
    res.render('sessions/new', {
      title: 'Admin Login page'
    });
  },

  create: passport.authenticate("local", {
    successRedirect: "/applications",
    failureRedirect: "/sessions/new"
  }), function(req, res) {

  },

  delete: function(req, res, next) {
    req.logout();
    res.redirect("/");
  }

}
