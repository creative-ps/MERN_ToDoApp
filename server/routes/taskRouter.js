const express = require('express');
const router = express.Router();
const TaskController = require('../controller/taskController');
const TaskPresenter = require('../presenters/taskPresenter');
const authMiddleware = require('../authMiddleware');

router.get('/', async (req, res) => {
    try{
        const allTasks = await TaskController.getAllTasks(req, res);
        const formatedTasks = TaskPresenter.formatTasks(allTasks);
        res.status(200).json(TaskPresenter.success(formatedTasks, 'Tasks retrieved successfully'))
    }catch(error){
        res.status(error.statusCode || 500).json(TaskPresenter.error(error.message || 'failed to fetch tasks'))
    }
})

router.post('/', async (req, res) => {
    try{
        const task = await TaskController.createTask(req, res);
        const formatedTask = TaskPresenter.formatTask(task);
        res.status(201).json(TaskPresenter.success(formatedTask,'Task created successfully'));
    }catch(error){
        res.status(error.statusCode || 500).json(TaskPresenter.error(error.message || 'Failed to create task'))
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const data = await TaskController.deleteTask(req,res);
        const formatedTask = TaskPresenter.formatTask(data);
        res.status(200).json(TaskPresenter.success(formatedTask,'Task deleted successfully.'));
    }catch(error){
        res.status(error.statusCode || 500).json(TaskPresenter.error(error.message || 'Failed to delete task.'))
    }
})+

router.patch('/:id', async (req, res)=>{
    const {completed,title,description} = req.body;
    try{
        if(completed !== undefined){
            const data = await TaskController.updateTaskStatus(req, res);
            const formatedTask = TaskPresenter.formatTask(data);
            res.status(200).json(TaskPresenter.success(formatedTask,"Task status updated successfully."))
        }
        else if(title || description){
            const data = await TaskController.updateTask(req, res);
            const formatedTask = TaskPresenter.formatTask(data);
            res.status(200).json(TaskPresenter.success(formatedTask,"Task updated successfully."))    
        }
    }catch(error){
        if(completed){
            res.status(error.statusCode || 500).json(TaskPresenter.error(error.message || 'Failed to update task status.'))
        }
        else if(title || description){
            res.status(error.statusCode || 500).json(TaskPresenter.error(error.message || 'Failed to update task.'))
        }
    }
})



module.exports = router