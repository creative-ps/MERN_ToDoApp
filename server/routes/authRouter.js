const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');

router.post('/signup', async (req,res)=>{
    try{
        const data = AuthController.signUp(req, res);
        res.json(data);
    }catch(error){
        res.json(error.message);
    }

})

router.post('/signin', async(req,res)=>{
    try{
        const data = AuthController.login(req, res);
        res.json(data);
    }catch(error){
        res.json(error.message);
    }
})


module.exports = router;