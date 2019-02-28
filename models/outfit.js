var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var outfitSchema = new Schema({
    description:{
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    cloudID: {
        type: String
    },
    brands:[{
        type: String,
    }], 
    keywords: [{
        type: String
    }], 
   closet: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Closet'
        // required: true

    }
}, {
    timestamps:true
})

module.exports = mongoose.model('Outfit', outfitSchema);