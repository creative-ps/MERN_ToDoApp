const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const {Types} = require('mongoose');

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
        return {user:{id:user._id, email:user.email},token}
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

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});
        return {user:{id:user._id,email:user.email},token}
    }

    async getUser(req,res){
        const userId = new Types.ObjectId(req.userId);
        const user = await User.findById(userId);

        if(!user){
            const error = new Error('Did not find any user in database.');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }
}

module.exports = new AuthController();