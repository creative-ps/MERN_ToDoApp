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



// const addAdmin = ()=>{
//     const user = new User({
//         email:'crativity.im@gmail.com',
//         password:'admin@123#',
//         role:'admin',
//         permissions:['create','edit','delete','update']
//     })
//     user.save();
// }

const addUsers = async ()=>{
    let totalUsers = [];
    for(let i = 4;i<1001;i++){
        totalUsers.push({
            email:`user${i}@gmail.com`,
            password:'1234567',
            role:'user',
            permissions:['create','edit']
        });
    }

    try{
        const existingEmail = await User.find({email:{$in:totalUsers.map((u)=>u.email)}});
        if(existingEmail.length > 0){
            console.log('Some users already exist. Skipping those emails.');
            totalUsers = totalUsers.filter((u)=>!existingEmail.has(u.email));
        }

        if(totalUsers.length === 0){
            console.log('No new user to insert.');
            return;
        }

        await User.insertMany(totalUsers,{ordered:false});
        console.log(`${totalUsers.length} users seeded successfully.`);
    }catch(error){
        console.error('Error seeding users',error);
    }finally{
        mongoose.connection.close();
        console.log('MongoDB connection closed')
        process.exit(0);
    }
}

main().then(addUsers).catch((error)=>{
    console.error('Script failed',error);
    process.exit(1);
});
// addAdmin();
