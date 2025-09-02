const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');


router.post('/category', authMiddleware, permissionMiddleware('create','edit','delete','update'), async (req, res)=>{
    try{
        const categoryAdded = await CategoryController.createCategory(req,res);
        res.status(201).json({message:'category added successfully.'});
    }catch(error){
        res.status(error.statusCode || 500).json({message:error.message || 'failed to fetch categories.'})
    }
});

router.get('/categories', async (req, res)=>{
    try{
        const allCategories = await CategoryController.getAllCategories(req, res);
        res.status(200).json(allCategories);
    }catch(error){
        res.status(error.statusCode || 500).json({message:error.message || 'failed to fetch categories.'})
    }
})

module.exports = router;