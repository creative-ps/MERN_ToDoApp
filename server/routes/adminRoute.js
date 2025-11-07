const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const adminController = require('../controller/adminController');
const codePresenter = require('../presenters/codePresenter');

router.get('/users', authMiddleware, adminMiddleware, async (req, res)=>{
    try{
        const allData = await adminController.getAllUsers(req, res);
        // const formatedUsers = codePresenter.formatUsers(allUsers);
        res.status(200).json(allData);
    }catch(error){
        res.status(error.statusCode || 500).json(codePresenter.error(error.message||'failed to get users.'));
    }
})

router.patch('/:userId/permissions', async (req, res)=>{
    try{
        await adminController.saveValidPermissions(req, res);
        res.status(200).json({message:'Permissions updated successfully.'});
    }catch(error){
        res.status(error.statusCode || 500).json({message:'error in updating Permissions.'})
    }
})

router.delete('/deleteuser/:userId', async (req, res)=>{
    try{
        await adminController.deleteUser(req, res);
        res.status(200).json({message:'user deleted successfully.'});
    }catch(error){
        res.status(error.statusCode || 500).json({message:error.message||'error in deleting user.'});
    }
})

router.delete('/deleteusers', async (req, res)=>{
    try{
        const result = await adminController.deleteUsers(req, res);
        res.status(200).json({message: result});
    }catch(error){
        res.status(error.statusCode || 500).json({message:error.message || 'error in deleting errors.'})
    }
})

module.exports = router;