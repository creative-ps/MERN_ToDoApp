require('dotenv').config();
const express = require("express")
const fs = require("fs")
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRouter');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRoute');
const categoryRouter = require('./routes/categoryRoute')
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

const corsOptions = {
    origin: 'https://mern-to-do-app-beta.vercel.app/', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If you need to send cookies or other credentials
};

const server = express();
server.use(cors(corsOptions))
server.use(express.static('public'))
server.use(express.json());


server.use('/api/tasks',taskRouter)
server.use('/api/auth', authRouter)
server.use('/api/user', authRouter)
server.use('/api/admin', adminRouter)
server.use('/api', categoryRouter);

// Global error handling middleware
server.use((err, req, res, next)=>{
    res.status(err.statusCode || 500).json({message:err.message || 'Something went wrong.'})
})




server.listen(process.env.PORT,()=>{
    console.log('server is running on port 5050')
})