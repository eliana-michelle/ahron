var User = require('../models/user');
var Closet = require('../models/closet')
var request = require('request')
var weather_key = process.env.WEATHER_KEY

module.exports = {
    home, 
    addLocation, 
    show, 
    update
}

function home (req, res){
    if(!req.user.location){
        req.user.populate('closets')
        .populate('outfits', function(user){
        let search = req.query.searchname ? {name: new RegExp(req.query.searchname, 'i')} : {};
        Closet.find(search, function(){
            res.render('users/home', {
                user: req.user,
                searchname: req.query.searchname, 
                weather: null
            })
        })
    })
} else {
    req.user.populate('closets')
    .populate('outfits', function(user){
    let search = req.query.searchname ? {name: new RegExp(req.query.searchname, 'i')} : {};
    Closet.find(search)
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${req.user.location}&units=imperial&appid=${weather_key}`
    request(url, function (err, response, body){
        let weather = JSON.parse(body)
    res.render('users/home', {
                user: req.user,
                searchname: req.query.searchname, 
                weather: weather
        })
    })
    })
}
};

function addLocation (req, res){
    req.user.update({location: req.body.location}, {new:true}, function(){
        res.redirect('/home')
    })
}

function show (req, res){
    res.render('users/update', req.user)
}

function update (req, res){
    req.user.update({
        name: req.body.name, 
        profPic: req.file.url, 
        cloudID: req.file.public_id, 
        location: req.body.location
    }, {new:true}, function (){
        console.log(req.user)
        res.redirect('/home')
    })
}