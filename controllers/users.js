var User = require('../models/user');
var Closet = require('../models/closet')
var request = require('request')

var rootURL = 'http://api.openweathermap.org/';

module.exports = {
    home, 
    addLocation
}

function home (req, res){
    // render homepage view for user
    req.user.populate('closets', function(user){
        if(req.user.location) {
            request(
                rootURL + 'data/2.5/weather?zip=' + req.user.location + '$APPID=' + process.env.WEATHER_KEY, function(err, response, body){
                    console.log(body)
                    res.render('users/home', {
                        user: req.user, 
                        weatherData: body
                    })      
        })
    } else {
            res.render('users/home', {
            user: req.user,
            weatherData: null
        }) 
        }
    })
}

function addLocation (req, res){
    req.user.update({location: req.body.location}, {new:true}, function(){
        res.redirect('/home')
    })
}
