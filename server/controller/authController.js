const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

class AuthController {
    async signUp(req,res){
        const {email,password} = req.body;
        if(!email || !password){
            const error = new Error('email or password is required.');
            error.statusCode = 400;
            throw error
        }

        const emailExist = await User.findOne({email});
        if(emailExist){
            const error = new Error('email already exists.');
            error.statusCode = 400;
            throw error;
        }

        const user = new User({
            email,password
        })
        await user.save()
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return {user:{id:user._id, email:User.email},token}
    }

    async logIn(req,res){
        const {email,password} = req.body;
        if(!email || !password){
            const error = new Error('email or password is required.');
            error.statusCode = 400;
            throw error
        }

        const user = await User.findOne({email});
        if(!user || (await !user.comparePassword(password))){
            const error = new Error('email already exists.')
            error.statusCode = 400;
            throw error;
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return {user:{id:user._id,email:user.email},token}
    }
}

module.exports = new AuthController();