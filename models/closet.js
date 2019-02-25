var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var closetSchema = new Schema({
    name:{
        type: String,
        required: true,
    }, 
    description:{
        type: String,
        required: true,
    },
    season: [{
        type: String
    }], 
    style: String, 
}, {
    timestamps:true
})

module.exports = mongoose.model('Closet', closetSchema);