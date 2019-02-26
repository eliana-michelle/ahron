var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    location: Number,
    profPic: String,
    cloudID: String,
    closets: [{
        type: Schema.Types.ObjectId, 
        ref: 'Closet'
    }], 
    outfits: [{
        type: Schema.Types.ObjectId,
        ref: 'Outfit'
    }],
    googleId: String,
}, {
    timestamps:true
})

module.exports = mongoose.model('User', userSchema);