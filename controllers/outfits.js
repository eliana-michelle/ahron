var Closet = require('../models/closet')
var Outfit = require('../models/outfit')

module.exports = {
    new: newOutfit,
    delete: deleteOutfit, 
    index
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


function index(req, res){
    let search = req.query.searchname ? {description: new RegExp(req.query.searchname, 'i')} : {};
    Outfit.find(search).populate('closet')
    .sort({createdAt: -1})
    .exec((err, outfits) => {
        console.log(outfits)
        console.log(search)
        res.render('closets/browse', {outfits, searchname: req.query.searchname})  
    })    
};