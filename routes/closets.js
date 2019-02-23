var express = require('express');
var router = express.Router();
var closetsCtrl = require('../controllers/closets');

router.get('/new', isLoggedIn, closetsCtrl.newCloset)
router.post('/new', isLoggedIn, closetsCtrl.createCloset)
router.get('/:id', isLoggedIn, closetsCtrl.show)
router.get('/', isLoggedIn, closetsCtrl.index)

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;