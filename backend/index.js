const express=require('express')
require('dotenv').config()
const app=express();
const db=require('./db')
const redis=require('./redis')

const authRoutes=require('./routes/auth')

app.use(express.json())
app.use('/auth',authRoutes)

app.get('/',(req,res)=>{
    res.send("Hi there")
})

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("Listening on PORT 3000");
})