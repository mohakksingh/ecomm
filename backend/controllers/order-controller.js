const User=require('../models/user')
const Order=require('../models/Order')
const { login } = require('./auth-controller')
const Transaction = require('../models/Transaction')

//TODO:there are products to add still
const giveOrder = async (req, res) => {
    const { user, products, totalAmount, shippingAddress, paymentMethod } = req.body;

    try {
        const userData = req.user.existingUser || req.user.newUser;

        if (!userData) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        if (userData.role === 'admin') {
            return res.status(401).json({
                message: "Admins can't give orders"
            });
        }

        const newOrder = new Order({
            user: userData._id,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        await newOrder.save();

        const newTransaction = new Transaction({
            user: userData._id,
            order: newOrder_.id,
            type: 'debit', // Assuming this is a debit transaction for placing an order
            totalAmountToBePaid: totalAmount, // Assuming totalAmountToBePaid is same as totalAmount for now
            paymentStatus: 'pending'
        });

        await newTransaction.save();

        res.status(200).json({
            message: "Order given successfully"
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = { giveOrder };


const userOrder=async(req,res)=>{
    try{
        const id=req.params.id
        const userData=req.user.existingUser || req.user.newUser
        if(!userData){
            return res.status(401).json({
                message:"User not found"
            })
        }
        if(userData._id !==id){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const orders=await Order.find({user:userData._id})
        res.status(200).json({
            orders
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports={giveOrder,userOrder}