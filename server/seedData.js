require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./model/userModel');

async function connect() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDb ')
    }
    catch(error){
        console.error('Failed to connect to MongoDB: ',error);
        process.exit(1);
    }
}



const addAdmin = async ()=>{
    const admin = new User({
        email:'crativity.im@gmail.com',
        password:'admin@123#',
        role:'admin',
        permissions:['create','edit','delete','update']
    });
    try{

        const existingEmail = await User.findOne({email:admin.email});
        if(existingEmail){
            console.log('admin user already exist, skipping.');
            return;
        }

        await admin.save();
        console.log('Admin seeded');
    }catch(error){
        console.log(`Error seeding admin. ${error}`)
    }
}

const addUsers = async ()=>{
    let totalUsers = [];
    for(let i = 0;i<100;i++){
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

        // await User.insertMany(totalUsers,{ordered:false}); //This line of code skip password hashing.
        await Promise.all(
        totalUsers.map(user => new User(user).save())
        )
        // .then((val)=>{console.log(val)});
        // console.log(`${totalUsers.length} users seeded successfully.`);
    }catch(error){
        console.error('Error seeding users',error);
    }finally{
        mongoose.connection.close();
        console.log('MongoDB connection closed')
        process.exit(0);
    }
}

(async ()=>{
    await connect();
    await addAdmin();
    await addUsers();
})();

// main().then(addAdmin).catch((error)=>{
//     console.error('Script failed',error);
//     process.exit(1);
// });
// addAdmin();
