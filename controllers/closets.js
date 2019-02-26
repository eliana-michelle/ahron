var Closet = require('../models/closet')
var Outfit = require('../models/outfit')

module.exports = {
    newCloset,
    delete: deleteCloset,
    createCloset, 
    show, 
    index
}

function deleteCloset (req,res){
    Closet.findByIdAndDelete(req.params.id)
    .then(function(err){
        res.redirect('/home')
    })
}

function newCloset(req, res){
    res.render('closets/new', {
        user: req.user
    });
};

function createCloset(req, res) {
    Closet.create({user: req.user, name: req.body.name, description: req.body.description, season: req.body.season, style: req.body.style}, function(err, closet){
        req.user.closets.push(closet)
        req.user.save();
        res.redirect('/home')
    })
};

function show(req, res){
    Closet.findById(req.params.id, function(err, closet){
        Outfit.find({closet: closet._id}, function(err, outfits){
            res.render('closets/show', {closet, outfits})
        })
    })
}

function index(req, res){
    let search = req.query.searchname ? {name: new RegExp(req.query.searchname, 'i')} : {};
    Closet.find(search, function(err, closets){
        console.log(closets)
        res.render('closets/browse', {closets, searchname: req.query.searchname})    
    })    
};