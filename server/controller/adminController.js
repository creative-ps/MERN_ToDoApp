const User = require('../model/userModel');

class adminController {
    async getAllUsers(req, res){
        try{
            const allUsers = await User.find().limit(15);
            if(!allUsers){
                const err = new Error('no user found.');
                err.statusCode = 404;
                throw err;
            }
            return allUsers;
        }catch(error){
            const err = new Error('server error');
            err.statusCode = 500;
            throw err;
        }
    }

    async saveValidPermissions(req, res){
        const {userId} =  req.params;
        const permissions = req.body;
        // console.log(permissions);
        const user = await User.findById(userId);
        const validPermissions = [...new Set(permissions)];
        user.permissions = validPermissions;
        await user.save();
    }

}

module.exports = new adminController()