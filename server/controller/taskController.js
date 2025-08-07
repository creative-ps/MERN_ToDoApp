const mongoose = require('mongoose');
const taskModel = require('../model/taskModel')

class TaskController{
    async createTask(req,res){
            const {title,description} = req.body;
            if(!title || !description){
                const error = new Error('Title and Description are required');
                error.statusCode = 400;
                throw error
            }
            const titleExist = await taskModel.findOne({title:{$regex: new RegExp(`^${title}$`,'i')}});
            if(titleExist){
                const error = new Error("Task with this title already exist.");
                error.statusCode = 400;
                throw error;
            }
           
                const parsedDate = new Date();
                let taskData = {title, description, parsedDate};
                const task = new taskModel(taskData)
                await task.save();
                return task;
    }

    async getAllTasks(req,res){
        try{
            const allTasks = await taskModel.find();
            return allTasks;
        }catch(err){
            const error = new Error('Database error while fetching tasks');
            error.statusCode = 500;
            throw error;
        }
    }

     async deleteTask(req,res){
            const {id} = req.params;
            if(!mongoose.Types.ObjectId.isValid(id)){
                const error = new Error('invalid task Id');
                error.statusCode = 400;
                throw error;
            }

            const deleteTask = await taskModel.findByIdAndDelete(id);
            if(!deleteTask){
                const error = new Error('Task not found');
                error.statusCode = 404;
                throw error;
            }
            return deleteTask;
    }

    async updateTaskStatus(req, res){
        const {id} = req.params;
        const {completed} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error('invalid task Id.');
            error.statusCode = 400;
            throw error;
        }
        if(typeof completed !== 'boolean'){
            const error = new Error('Completed status must be a boolean.');
            error.statusCode = 400;
            throw error;
        }
        const task = await taskModel.findById(id);
        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }
        task.completed = completed;
        await task.save();
        return task;
    }

    async updateTask(req, res){
        const {id} = req.params;
        const {title,description} = req.body;
         if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error('invalid task Id.');
            error.statusCode = 400;
            throw error;
        }
        if(!title || !description){
            const error = new Error('Title and Description are required');
            error.statusCode = 400;
            throw error
        }
        const task = await taskModel.findById(id);
        if(!task){
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;  
        }
            task.title = title;
            task.description = description;
        
        await task.save();
        return task;
    }
}

module.exports = new TaskController()