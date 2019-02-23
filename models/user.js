var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    location: String, 
    closets: [{
        type: Schema.Types.ObjectId, 
        ref: 'Closet'
    }], 
    googleId: String,
}, {
    timestamps:true
})

module.exports = mongoose.model('User', userSchema);