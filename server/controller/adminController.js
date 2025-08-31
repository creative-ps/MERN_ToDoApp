const User = require('../model/userModel');

class adminController {
    async getAllUsers(req, res){
        try{
            const allUsers = await User.find();
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
        console.log(permissions);

        const user = await User.findById(userId);
        const validPermissions = [...new Set(permissions)];
        console.log(permissions);
        user.permissions = validPermissions;
        await user.save();
        console.log(user);
    }

}

module.exports = new adminController()