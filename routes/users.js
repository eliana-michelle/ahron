var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users')

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 400, height: 500, crop: "limit" }]
  });

const parser = multer({ storage: storage });

/* GET users listing. */
router.get('/home', isLoggedIn, usersCtrl.home)
router.put('/home', isLoggedIn, usersCtrl.addLocation)
router.get('/user', usersCtrl.show)
router.put('/user', parser.single("profPic"), usersCtrl.update)

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }


module.exports = router;
