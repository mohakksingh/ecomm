const express=require('express')
require('dotenv').config()
const app=express();
const db=require('./db')
const redis=require('./redis')

const authRoutes=require('./routes/auth')
const superRoutes=require('./routes/admin')

app.use(express.json())
app.use('/auth',authRoutes)
app.use('/super',superRoutes)

app.get('/',(req,res)=>{
    res.send("Hi there")
})

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("Listening on PORT 3000");
})