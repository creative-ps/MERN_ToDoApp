const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            const error = new Error('Authentication token required');
            error.statusCode = 401;
            return next(error);
        }

    
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    }catch(err){
        const error = new Error('Invalid or Expired token');
        error.statusCode = 401;
        return next(error);
    }
}
module.exports = authMiddleware;