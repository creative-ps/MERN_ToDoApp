const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const adminController = require('../controller/adminController');
const codePresenter = require('../presenters/codePresenter');

router.get('/users', authMiddleware, adminMiddleware, async (req, res)=>{
    try{
        const allUsers = await adminController.getAllUsers(req, res);
        const formatedUsers = codePresenter.formatUsers(allUsers);
        res.status(200).json(formatedUsers);
    }catch(error){
        res.status(error.statusCode || 500).json(codePresenter.error(error.message||'failed to get users.'));
    }
})

router.patch('/:userId/permissions', async (req, res)=>{
    console.log('patch route..');
    await adminController.saveValidPermissions(req, res);
})

module.exports = router;