const User = require('../model/userModel');

const adminMiddleware = async (req, res, next) => {
    const userId = req.userId;
    try{
        const user = await User.findById(userId);
        if(user.role == 'admin'){
            next()
        }else{
            const err = new Error('Only admin access is premitted.')
            next(err)
        }
    }catch(error){
        const err = new Error('Server error.')
        next(err)
    }
}

module.exports = adminMiddleware;