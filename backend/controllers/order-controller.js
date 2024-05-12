const User=require('../models/user')
const Order=require('../models/Order')
const { login } = require('./auth-controller')

const giveOrder=async(req,res)=>{
    const { products, totalAmount, shippingAddress, paymentMethod }=req.body
    try{
        const userData=req.user.existingUser || req.user.newUser
        //user not found
        if(!userData){
            return res.status(401).json({
                message:"User not found"
            })
        }
        //user is not admin
        if(userData.role ==='admin'){
            return res.status(401).json({
                message:"admins cant give orders"
            })
        }
        const newOrder=new Order({
            user:userData._id,
            totalAmount,    
            shippingAddress,
            paymentMethod
        })
        await newOrder.save()
        res.status(200).json({
            message:"Order given successfully"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports={giveOrder}