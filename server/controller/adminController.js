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

}

module.exports = new adminController()