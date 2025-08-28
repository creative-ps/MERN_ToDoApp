const express = require('express');
const router = express.Router();
const TaskController = require('../controller/taskController');
const CodePresenter = require('../presenters/codePresenter');
const authMiddleware = require('../middleware/authMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');

router.get('/', authMiddleware, async (req, res) => {
    try{
        const allTasks = await TaskController.getAllTasks(req, res);
        const formatedTasks = CodePresenter.formatTasks(allTasks);
        res.status(200).json(CodePresenter.success(formatedTasks, 'Tasks retrieved successfully'))
    }catch(error){
        res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'failed to fetch tasks'))
    }
})

router.post('/', authMiddleware, permissionMiddleware('create'), async (req, res) => {
    try{
        const task = await TaskController.createTask(req, res);
        const formatedTask = CodePresenter.formatTask(task);
        res.status(201).json(CodePresenter.success(formatedTask,'Task created successfully'));
    }catch(error){
        res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'Failed to create task'))
    }
})

router.delete('/:id',authMiddleware, async (req, res)=>{
    try{
        const data = await TaskController.deleteTask(req,res);
        const formatedTask = CodePresenter.formatTask(data);
        res.status(200).json(CodePresenter.success(formatedTask,'Task deleted successfully.'));
    }catch(error){
        res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'Failed to delete task.'))
    }
})+

router.patch('/:id',authMiddleware, async (req, res)=>{
    const {completed,title,description} = req.body;
    try{
        if(completed !== undefined){
            const data = await TaskController.updateTaskStatus(req, res);
            const formatedTask = CodePresenter.formatTask(data);
            res.status(200).json(CodePresenter.success(formatedTask,"Task status updated successfully."))
        }
        else if(title || description){
            const data = await TaskController.updateTask(req, res);
            const formatedTask = CodePresenter.formatTask(data);
            res.status(200).json(CodePresenter.success(formatedTask,"Task updated successfully."))    
        }
    }catch(error){
        if(completed){
            res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'Failed to update task status.'))
        }
        else if(title || description){
            res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'Failed to update task.'))
        }
    }
})



module.exports = router