const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', async (req,res)=>{
    try{
        const {user,token} = await AuthController.signUp(req, res);

        res.status(201).json({user, token, message:'User created successfully.'});
    }catch(error){
        res.status(error.statusCode || 500).json({message:error.message || 'Failed to sign up.'});
    }

})

router.post('/login', async (req,res)=>{
    try{
        const {user,token} = await AuthController.logIn(req, res);
        res.status(201).json({user, token, message:'Login Successful.'});
    }catch(error){
        res.status(error.statusCode || 500).json({message:error.message || 'Failed to log in.'});
    }
})

router.get('/',authMiddleware, async (req,res)=>{
    try{
        const user = await AuthController.getUser(req,res);
        res.status(200).json({data:user,message:'User retrieved successfully.'});
    }catch(error){
        res.status(error.statusCode || 500).json({message:error.message || 'Failed to get user.'})
    }
})

router.patch('/updatepassword', async (req, res)=>{
    try{
        const updatedUser = await AuthController.updatePassword(req, res);
        res.status(200).json({data:updatedUser, message:'Password updated successfully.'});
    }catch(error){
        res.status(error.statusCode || 400).json({message:error.message || 'error in updating password.'})
    }
})


module.exports = router;