var User = require('../models/user');
var Closet = require('../models/closet')

module.exports = {
    home, 
    new: newCloset
}

function home (req, res){
    // render homepage view for user
    req.user.populate('closets', function(err, user){
        res.render('users/home', {
            user: req.user,
        }) 
    })
}

function newCloset(){
    // render view for form to add new closet
    // redirect back to all closet view
    req.user.closets.push(req.body);
    req.user.save(function(err){
        res.redirect('/closets')
    })
}