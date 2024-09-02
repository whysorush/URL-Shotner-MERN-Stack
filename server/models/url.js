const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
        },
    clicks:{    
        type:Number,
        default:0
        },
    visitHistory:[{timestamp :{type:Number}}],
    // url: String,
    // shortUrl: String,
    
},{timestamps:true});

module.exports = mongoose.model('url',URLSchema);