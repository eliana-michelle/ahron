var User = require('../models/user');
var Closet = require('../models/closet')

module.exports = {
    home, 
    addLocation 
}

function home (req, res){
    // render homepage view for user
    req.user.populate('closets', function(err, user){
        res.render('users/home', {
            user: req.user,
        }) 
    })
}

function addLocation (req, res){
    req.user.update({location: req.body.location}, {new:true}, function(){
        res.redirect('/home')
    })
}
