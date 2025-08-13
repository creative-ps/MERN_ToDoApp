class TaskPresenter{
    formatTask(task){
        return {
            id:task._id,
            title:task.title,
            description:task.description,
            completed:task.completed,
            createdAt:task.createdAt,
            userId:task.userId
        }
    }

    formatTasks(tasks){
        return tasks.map(task=>this.formatTask(task))
    }

    success(data, message='success'){
        return {
            status:'success',
            message:message,
            data:data
        }
    }

    error(message='error'){
        return {
            status:'error',
            message:message,
            data:null
        }
    }
}

module.exports = new TaskPresenter();