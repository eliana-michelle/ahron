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
    brands:[{
        type: String,
    }], 
    closet:{
        type: Schema.Types.ObjectId, 
        required: true
    },
    keywords: [{
        type: String
    }]
}, {
    timestamps:true
})

module.exports = mongoose.model('Outfit', outfitSchema);