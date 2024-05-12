if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const stripeSecretKey=process.env.STRIPE_SECRET_KEY
const stripePublicKey=process.env.STRIPE_PUBLIC_KEY

const express=require('express')
const app=express();
const db=require('./db')
const redis=require('./redis')

const authRoutes=require('./routes/auth')
const superRoutes=require('./routes/director')
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin')

app.use(express.json())
app.use('/auth',authRoutes)
app.use('/super',superRoutes)
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

app.get('/',(req,res)=>{
    res.send("Hi there")
})

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("Listening on PORT 3000");
})