var Closet = require('../models/closet')
var Outfit = require('../models/outfit')
var User = require('../models/user')

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
    User.findById(req.user.id)
    .populate('closets')
    .populate('outfits')
    .then(function(user){
        Closet.findById(req.params.id, function(err, closet){
            Outfit.find({closet: closet._id}, function(err, outfits){
                    res.render('closets/show', {closet, outfits, user: user, id: req.params.id})
            })
    })
    })
}

function index(req, res){
    let search = req.query.searchname ? {name: new RegExp(req.query.searchname, 'i')} : {};
    Closet.find(search, function(err, closets){
        res.render('closets/browse', {closets, searchname: req.query.searchname})  
    })    
};