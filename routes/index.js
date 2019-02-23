var express = require('express');
var router = express.Router();
var passport = require('passport');
var Closet = require('../models/closet')
var Outfit = require('../models/outfit')

router.get('/', function(req, res) {
  res.render('index')
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google', {scope: ['profile', 'email']}
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/home',
    failureRedirect : '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/sample', function(req, res){
  Closet.findById('5c718e6a1c9d440000add1b8', function(err, closet){
    Outfit.find({closet: closet._id}, function(err, outfits){
      res.render('sample/closet', {closet, outfits})
    })
})
});

module.exports = router;
