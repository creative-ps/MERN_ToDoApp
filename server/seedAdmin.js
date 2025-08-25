require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./model/userModel');

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



const addAdmin = ()=>{
    const user = new User({
        email:'crativity.im@gmail.com',
        password:'admin@123#',
        role:'admin',
        permissions:['create','edit','delete','update']
    })
    user.save();
}

main();
addAdmin();