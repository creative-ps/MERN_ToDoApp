const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email:{
        type:String, 
        required:[true, 'Email is required.'],
        unique:[true, 'Email is already exist.'],
        trim:true,
        match:[/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password:{
        type:String, 
        required:[true,'Password is required.'],
        minlength:[6, 'Password must be at least 6 characters']
    }
});


userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

userSchema.methods.comparePassword = async function (password){
    console.log(password,this.password);
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

