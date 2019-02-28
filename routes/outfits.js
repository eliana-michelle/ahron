var express = require('express');
var router = express.Router();
var outfitsCtrl = require('../controllers/outfits');

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

router.post('/closets/:id/outfit', parser.single("imageURL"), isLoggedIn, outfitsCtrl.new)
router.delete('/closets/outfit/:id', isLoggedIn, outfitsCtrl.delete)
router.get('/outfit_thread', isLoggedIn, outfitsCtrl.index)

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;