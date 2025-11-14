const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const {Types} = require('mongoose');

class AuthController {
    async signUp(req,res){
        const {email,password,rePassword} = req.body;
        if(password !== rePassword){
            const error = new Error('password and reenter password should be same.');
            error.statusCode = 400;
            throw error;
        }
        const user = new User({
            email,
            password,
            role:'user',
            permissions:['create','edit','update']
        })
        await user.save()

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return {user:{id:user._id, email:user.email, role:user.role, permissions:user.permissions},token}
    }

    async logIn(req,res){
        const {email,password} = req.body;
        if(!email || !password){
            const error = new Error('email or password is required.');
            error.statusCode = 400;
            throw error
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const error = new Error('Please provide a valid email address.');
            error.statusCode = 400;
            throw error;
        }

        if(password.length<6){
            const error = new Error('Password must be at least 6 characters.');
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({email});
        if(!user){
            const error = new Error('invalid email or password.')
            error.statusCode = 400;
            throw error;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            const error = new Error('Invalid email or password.');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return {user:{id:user._id,email:user.email, role:user.role, permissions:user.permissions},token}
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

    async updatePassword(req, res){
        const {email, password, rePassword} = req.body;
        const userExist = await User.findOne({email:email});
        if(!userExist){
            const error = new Error('User not found.')
            error.statusCode = 404;
            throw error;
        }
        if(!email || !password || !rePassword){
            const error = new Error('Provide required data in request body,');
            error.statusCode = 400;
            throw error;
        }
        if(password !== rePassword){
            const error = new Error('Password and Re enter password do not match.');
            error.statusCode = 400;
            throw error;
        }
        
        const updatedUser = await User.findOneAndUpdate(
            {email:email},
            {$set:{password:password}},
            {new: true}
        );
        return updatedUser;
    }
}

module.exports = new AuthController();