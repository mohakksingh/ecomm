const mongoose=require('mongoose')
require('dotenv').config()

const url=process.env.MONGODB_URL
mongoose.connect(url)

const db=mongoose.connection

db.on('connected',()=>{
    console.log("connected to database");
})

db.on('disconnected',()=>{
    console.log("disconnected to database");
})

db.on('error',()=>{
    console.log('Error in connecting to database');
})

module.exports=db