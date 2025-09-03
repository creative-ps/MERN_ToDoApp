const User = require('../model/userModel');

class adminController {
    async getAllUsers(req, res){
        const page = req.query.page;
        const limit = req.query.limit;
        const gap = (page-1)*limit;
        try{
            const allUsers = await User.find().limit(limit).skip(gap);
            const totalDocuments = await User.countDocuments({});
            const totalPages = Math.ceil(totalDocuments/limit);
            if(!allUsers){
                const err = new Error('no user found.');
                err.statusCode = 404;
                throw err;
            }
            if(limit < 1 || page < 1){
                const err =  new Error('Invalid Page or Limit.');
                err.statusCode = 400;
                throw err;
            }
            return {
                allUsers,
                totalDocuments,
                totalPages
                };
        }catch(error){
            const err = new Error('server error');
            err.statusCode = 500;
            throw err;
        }
    }

    async saveValidPermissions(req, res){
        const {userId} =  req.params;
        const permissions = req.body;
        const user = await User.findById(userId);
        const validPermissions = [...new Set(permissions)];
        user.permissions = validPermissions;
        await user.save();
    }

}

module.exports = new adminController()