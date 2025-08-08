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

// main().catch((error)=>{
//     console.log(error)
// })
// async function main(){
//     await mongoose.connect('mongodb://127.0.0.1:27017/cartUser')
//     console.log("Database connected...");
// }

// const kittySchema = new mongoose.Schema({
//     name:String
// })
// kittySchema.methods.speak = function speak(){
//     const greeting = this.name ? 'Meow name is '+this.name : 'I don\'t have name'
//     console.log(greeting)
// }
// const kitten = mongoose.model('kitten',kittySchema);

// const silence = new kitten({name:'Silence'})
// console.log(silence.name)



// const fulfy = new kitten({name:'fulfy'})
// fulfy.speak()
// async function saveData(){
//     await fulfy.save()
//     fulfy.speak()
//     const kittens = await kitten.find()
//     console.log(kittens)
// }
// saveData()

const server = express();
server.use(cors())
server.use(express.static('public'))
server.use(express.json());
// server.use('/',(req,res,next)=>{
//     next()
// },(req,res,next)=>{
//     // next()

//     res.send("hi there!")
// })
// server.use('/',(req,res,next)=>{
//     res.send('Welcome to home page.')
// })

server.use('/api/tasks',taskRouter)
server.use('/api/auth', authRouter)
// server.get('/',(req,res)=>{
//     res.json({"user":"hello"})
// })

// server.get('/html',(req,res)=>{
//     res.send(file);
// })




server.listen(process.env.PORT,()=>{
    console.log('server is running on port 5050')
})