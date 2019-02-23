var express = require('express');
var router = express.Router();
var outfitsCtrl = require('../controllers/outfits');

router.post('/closets/:id/outfit', isLoggedIn, outfitsCtrl.new)

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;