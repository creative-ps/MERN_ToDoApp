const User = require('../model/userModel');

const permissionMiddleware = (permission)=>{
    return async (req, res, next) => {
                const user = await User.findById(req.userId);
                if(user.hasPermission(permission)){
                    next()
                }else{
                    const error = new Error(`user don't have ${permission} permission.`);
                    error.statusCode = 400;
                    next(error);
                }
    }
}

module.exports = permissionMiddleware;