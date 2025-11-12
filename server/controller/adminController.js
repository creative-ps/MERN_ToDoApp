const User = require('../model/userModel');

class adminController {
    async getAllUsers(req, res){
        const page = req.query.page;
        const limit = req.query.limit;
        const gap = (page-1)*limit;
        let queryFilter = { role: { $ne: 'admin' } };
        try{
            const allUsers = await User.find(queryFilter).limit(limit).skip(gap).select('-password').lean();
            const totalDocuments = await User.countDocuments(queryFilter);
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
        if(!user){
            const err = new Error('no user found.');
            err.statusCode = 404;
            throw err;
        }
        const validPermissions = [...new Set(permissions)];
        user.permissions = validPermissions;
        await user.save();
    }

    async deleteUser(req, res){
        const {userId} = req.params;
        const userToDelete = await User.exists({_id:userId});
        if(!userToDelete){
            const err = new Error('no user found.')
            err.statusCode = 404;
            throw err;
        }
        await User.deleteOne({_id:userId});
    }

    async deleteUsers(req, res){
        const ids = req.body;
        if(ids){
           const result = await User.deleteMany({_id:{$in:ids}});
            if(!result){
             const err = new Error('no documents exist to delete.');
             err.statusCode = 404;
             throw err;   
            }
            return `${result.deletedCount} documents have been deleted.`;
        }else{
            const err =  new Error('please send valid Ids in Array type format.');
            err.statusCode = 400;
            throw err;
        }
    }

}

module.exports = new adminController()