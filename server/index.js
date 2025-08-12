require('dotenv').config();
const express = require("express")
const fs = require("fs")
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRouter');
const authRouter = require('./routes/authRouter');
const cors = require('cors');



async function main() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDb ')
    }
    catch(error){
        console.error('Failed to connect to MongoDB: ',error);
        process.exit(1);
    }
}

main();


const server = express();
server.use(cors())
server.use(express.static('public'))
server.use(express.json());


server.use('/api/tasks',taskRouter)
server.use('/api/auth', authRouter)
server.use('/api/user', authRouter)

// Global error handling middleware
server.use((err, req, res, next)=>{
    res.status(err.statusCode || 500).json({error:err.message || 'Something went wrong.'})
})




server.listen(process.env.PORT,()=>{
    console.log('server is running on port 5050')
})