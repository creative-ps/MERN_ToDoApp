const mongoose = require('mongoose');
const {Types} = require('mongoose');
const taskModel = require('../model/taskModel');
const { request } = require('express');

class TaskController{
    async createTask(req,res){
            const {selectVal, task, catId} = req.body;
            const userId = new Types.ObjectId(req.userId);
            const taskExist = await taskModel.findOne({title:{$regex: new RegExp(`^${task}$`,'i')},catId});
            if(taskExist){
                const error = new Error("Task or Category is already exist.");
                error.statusCode = 400;
                throw error;
            }
           
            const parsedDate = new Date();
            let taskData = {title:task, createdAt:parsedDate, completed:false, catId};
            const addtask = new taskModel(taskData)
            await addtask.save();
            return addtask;
    }

    async getAllTasks(req,res){
        const {id} = req.params;
    console.log('route ', req.params)

        try{
            const userId = new Types.ObjectId(req.userId);
            const allTasks = await taskModel.find({catId:id});
            return allTasks;
        }catch(err){
            const error = new Error('Database error while fetching tasks');
            error.statusCode = 500;
            throw error;
        }
    }

     async deleteTask(req,res){
            const {id} = req.params;
            const userId = new Types.ObjectId(req.userId);
            if(!mongoose.Types.ObjectId.isValid(id)){
                const error = new Error('invalid category Id');
                error.statusCode = 400;
                throw error;
            }

            const deleteTask = await taskModel.findByIdAndDelete({_id:id})
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
        const userId =  new Types.ObjectId(req.userId);
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error('invalid category Id.');
            error.statusCode = 400;
            throw error;
        }
        if(typeof completed !== 'boolean'){
            const error = new Error('Completed status must be a boolean.');
            error.statusCode = 400;
            throw error;
        }
        const task = await taskModel.findOne({_id:id});
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
        const {title} = req.body;
        const userId = new Types.ObjectId(req.userId);
         if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error('invalid category Id.');
            error.statusCode = 400;
            throw error;
        }
        if(!title){
            const error = new Error('Task value is required');
            error.statusCode = 400;
            throw error
        }
        const task = await taskModel.findOne({_id:id});
        if(!task){
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;  
        }
            task.title = title;
        
        await task.save();
        return task;
    }
}

module.exports = new TaskController()