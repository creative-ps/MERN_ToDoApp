const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{type:String, required:true, trim:true},
    description:{type:String, required:true, trim:true},
    createdAt:{type:Date, default:Date.now},
    completed:{type:Boolean, default:false},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
})

module.exports = mongoose.model('Task',taskSchema)