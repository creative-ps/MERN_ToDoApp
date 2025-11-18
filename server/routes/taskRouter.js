const express = require('express');
const router = express.Router();
const TaskController = require('../controller/taskController');
const CodePresenter = require('../presenters/codePresenter');
const authMiddleware = require('../middleware/authMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');
const appValidator = require('../validator/appValidator');

router.get('/:id', appValidator.validateId(), appValidator.appValidationMiddleware, authMiddleware, async (req, res) => {
    try{
        const allTasks = await TaskController.getAllTasks(req, res);
        const formatedTasks = CodePresenter.formatTasks(allTasks);
        res.status(200).json(CodePresenter.success(formatedTasks, 'Tasks retrieved successfully'))
    }catch(error){
        res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'failed to fetch tasks'))
    }
})

router.post('/', appValidator.validateCreateTask(), appValidator.appValidationMiddleware, authMiddleware, permissionMiddleware('create'), async (req, res) => {
    try{
        const task = await TaskController.createTask(req, res);
        // const formatedTask = CodePresenter.formatTask(task);
        res.status(201).json(CodePresenter.success([],'Task created successfully'));
    }catch(error){
        res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'Failed to create task'))
    }
})

router.delete('/:id', appValidator.validateId(), appValidator.appValidationMiddleware, authMiddleware, permissionMiddleware('delete'), async (req, res)=>{
    try{
        const data = await TaskController.deleteTask(req,res);
        res.status(200).json(CodePresenter.success([],'Task deleted successfully.'));
    }catch(error){
        res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'Failed to delete task.'))
    }
})+

router.patch('/edittask/:id', appValidator.validateUpdateTaskStatus(), appValidator.appValidationMiddleware, authMiddleware, permissionMiddleware('edit',), async (req, res)=>{
    try{
            const data = await TaskController.updateTask(req, res);
            res.status(200).json(CodePresenter.success([],"Task updated successfully."))    
    }catch(error){
            res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'Failed to update task.'))
    }
})

router.patch('/edittaskcompletion/:id', appValidator.validateUpdateTaskBooleanStatus(), appValidator.appValidationMiddleware, authMiddleware, permissionMiddleware('edit',), async (req, res)=>{
    const {completed} = req.body;
    console.log('edittaskcompletion/:id');
    try{
        if(completed !== undefined){
            const data = await TaskController.updateTaskStatus(req, res);
            res.status(200).json(CodePresenter.success([],"Task status updated successfully."))
        }  
    }catch(error){
            res.status(error.statusCode || 500).json(CodePresenter.error(error.message || 'Failed to update task completion.'))
    }
})



module.exports = router