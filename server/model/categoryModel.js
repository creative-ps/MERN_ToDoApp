const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

module.exports = mongoose.model('Category',categorySchema);