const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');
const authMiddleware = require('../authMiddleware');

router.post('/signup', async (req,res)=>{
    try{
        const {user,token} = await AuthController.signUp(req, res);

        res.status(201).json({user, token, message:'User created successfully.'});
    }catch(error){
        res.status(error.statusCode || 500).json({error:error.message || 'Failed to sign up.'});
    }

})

router.post('/login', async (req,res)=>{
    try{
        const {user,token} = await AuthController.logIn(req, res);
        res.status(201).json({user, token, message:'Login Successful.'});
    }catch(error){
        res.status(error.statusCode || 500).json({error:error.message || 'Failed to log in.'});
    }
})

router.get('/',authMiddleware, async (req,res)=>{
    try{
        const user = await AuthController.getUser(req,res);
        res.status(200).json(user);
    }catch(error){
        res.status(error.statusCode || 500).json({error:error.message || 'Failed to get user.'})
    }
})


module.exports = router;