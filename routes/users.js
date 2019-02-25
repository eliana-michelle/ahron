var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/home', isLoggedIn, usersCtrl.home)
router.put('/home', isLoggedIn, usersCtrl.addLocation)

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }


module.exports = router;
