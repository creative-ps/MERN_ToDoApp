const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

class AuthController {
    async signUp(req,res){
        const {email,password} = req.body;
        if(!email || !password){
            const error = new Error('email or password is required.');
            throw error
        }

        const emailExist = User.findOne({email});
        if(emailExist){
            const error = new Error('email already exists.');
            throw error;
        }

        const User = new User({
            email,password
        })
        await User.save()

        const jwt = jwt.sign({userId:User._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return {user:{id:User._id, email:User.email},token}
    }

    async login(req,res){
        const {email,password} = req.body;
        if(!email || !password){
            const error = new Error('email or password is required.');
            throw error
        }

        const user = await User.findOne({email});
        if(!user || (await !user.comparePassword(password))){
            const error = new Error('email already exists.')
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return {user:{id:user._id,email:user.email},token}
    }
}

module.exports = new AuthController();