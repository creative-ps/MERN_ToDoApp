class TaskPresenter{
    formatTask(task){
        return {
            id:task._id,
            title:task.title,
            completed:task.completed,
            createdAt:task.createdAt,
            catId:task.catId
        }
    }

    formatTasks(tasks){
        return tasks.map(task=>this.formatTask(task))
    }

    formatUser(user){
        return {
            id:user._id,
            email:user.email,
            password:user.password,
            role:user.role,
            permissions:user.permissions,
            createdAt:user.createdAt
        }
    }

    formatUsers(users){
        return users.map((user)=>this.formatUser(user));
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