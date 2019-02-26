var Closet = require('../models/closet')
var Outfit = require('../models/outfit')

module.exports = {
    new: newOutfit,
    delete: deleteOutfit
}

function newOutfit(req, res){
    Closet.findById(req.params.id, function(err, closet){
        Outfit.create({closet: closet._id, description: req.body.description, brands: req.body.brands, imageURL: req.file.url, cloudID: req.file.public_id}, function(err, outfit){
            req.user.outfits.push(outfit);
            req.user.save();
            res.redirect(`/closets/${closet._id}`)
        })
    })
}


function deleteOutfit(req, res){
    Outfit.findByIdAndDelete(req.params.id)
    .then(function(err){
        res.redirect('/home')
    })
}