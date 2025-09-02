const categoryModel = require('../model/categoryModel');

class CategoryController{
    async createCategory(req, res){
        const {name} = req.body;
        const userId = req.userId;
        if(!name){
            const error = new Error('not a valid category.');
            throw error;
        }
        const categoryExist = await categoryModel.findOne({name:{$regex: new RegExp(`^${name}$`,'i')}, userId:userId});
        if(categoryExist){
            const error = new Error('category already exists.');
            throw error;
        }

        const newCategory = new categoryModel({name, userId});
        await newCategory.save();
    }

    async getAllCategories(req, res){
        const categories = await categoryModel.find({userId:userId});
        return categories;
    }
}

module.exports = new CategoryController();