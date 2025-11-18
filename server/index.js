require('dotenv').config();
// const {body, validationResult} = require('express-validator')
const express = require("express")
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRouter');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRoute');
const categoryRouter = require('./routes/categoryRoute');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const server = express();

// ----------------------CONNECTION--------------------------------------
async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDb ')
    }
    catch(error){
        console.error('Failed to connect to MongoDB: ',error);
        process.exit(1);
    }
}
connectDB();


// ------------------------CORS--------------------------------------
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


// ---------- MORGAN (loud!) ----------
const accessLogStream = fs.createWriteStream(path.join(__dirname,'logs','access.log'),{flags:'a'})
server.use(morgan(':remote-addr :remote-user :method :url :status :response-time :res[content-length] :date[clf] :referrer :total-time',{stream:accessLogStream}));


// ------------------------------BODY/STATIC----------------------------------------------
server.use(express.static('public'))
server.use(express.json());


// --------------------------ROUTES------------------------------------------
server.use('/api/tasks',taskRouter)
server.use('/api/auth', authRouter)
server.use('/api/user', authRouter)
server.use('/api/admin', adminRouter)
server.use('/api', categoryRouter);


// ------------------------404 page error------------------------------------------
// server.use((req, res, next)=>{
//     const notFound = `Cannot ${req.method} ${req.originalUrl}.`
//     res.status(404).json({message:notFound})
// })


// ---------------------GLOBAL ERROR--------------------------------------
server.use((err, req, res, next)=>{
    res.status(err.statusCode || 500).json({message:err.message || 'Something went wrong.'})
})


// ---------------------LISTEN---------------------------------
const PORT = process.env.PORT || 5050;
server.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`)
})