var Closet = require('../models/closet')
var Outfit = require('../models/outfit')

module.exports = {
    new: newOutfit,
}

function newOutfit(req, res){
    Closet.findById(req.params.id, function(err, closet){
        Outfit.create({closet: closet._id, description: req.body.description, brands: req.body.brands, imageURL: req.body.imageURL}, function(err, outfit){
            res.redirect(`/closets/${outfit.closet}`)
        })
    })
}