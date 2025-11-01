require('dotenv').config();
const express = require("express")
const fs = require("fs")
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRouter');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRoute');
const categoryRouter = require('./routes/categoryRoute');
const cors = require('cors');
const server = express();



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

const allowedOrigins = [
  'http://localhost:3000',                     // local dev
  'https://mern-to-do-app-beta.vercel.app'     // production
];
const corsOptions = {
    origin: (origin, callback)=>{
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If you need to send cookies or other credentials
};

server.use(cors(corsOptions));
// Handle preflight requests explicitly
// server.options('*', cors(corsOptions));
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