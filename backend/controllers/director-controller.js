const User=require('../models/user')        
const bcrypt=require('bcrypt')
const {generateToken}=require('../middlewares/jwt')
const user = require('../models/user')
const Transaction = require('../models/Transaction')
const Order = require('../models/Order')
const moment = require('moment');


const getAllUsers=async(req,res)=>{
    try{
        const userData=req.user.newUser || req.user.existingUser
        if(userData.role!=='SuperAdmin'){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const users=await User.find()
        res.status(200).json({
            users:users
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const getUsers=async(req,res)=>{
    try{
        const userData=req.user.existingUser || req.user.newUser
        console.log(userData);
        if(userData.role !=='SuperAdmin' && userData.role !=='admin'){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const users=await User.find({role:'user'})
        console.log(users);
        res.status(200).json({
            users
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const getAdmins=async(req,res)=>{
    try{
        const userData=req.user.existingUser || req.user.newUser
        console.log(userData);
        if(userData.role !=='SuperAdmin'){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const admins=await User.find({role:'admin'})
        console.log(admins);
        res.status(200).json({
            admins
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

//assign roles to other users
const assignRoles=async(req,res)=>{
    try{
        const userData=req.user.existingUser || req.user.newUser
        if(userData.role !=='SuperAdmin'){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const {email,role}=req.body
        const user =await User.findOne({email:email})
        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }
        user.role=role
        await user.save()
        res.status(200).json({
            message:"Role assigned successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const getTransactions=async(req,res)=>{
    try{
        const userData=req.user.existingUser ||req.user.newUser
        if(userData.role !=='SuperAdmin'){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const transactions=await Transaction.find()
        res.status(200).json({
            transactions
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

//TODO: • View or filter expenses list ~ section for company expenses. 
// const getCompanyExpenses=async(req,res)=>{
//     try{
//         const userData=req.user.existingUser || req.user.newUser
//         if(!userData){
//             return res.status(404).json({
//                 message:"User not found"
//             })
//         }
//         if(userData.role !=='SuperAdmin'){
//             return res.status(401).json({
//                 message:"Unauthorized"
//             })
//         }
//     }catch(e){
//         console.log(e);
//         res.status(500).json({
//             message:"Internal Server Error"
//         })
    
//     }
// }


const getDailySales=async(req,res)=>{
    try {
        const today = moment().startOf('day');
        const dailySales = await Transaction.aggregate([
          {
            $match: {
              createdAt: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate(),
              },
              paymentStatus: 'completed',
            },
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: '$totalAmountToBePaid' },
            },
          },
        ]);
        console.log(dailySales[0]);
        res.status(200).json(dailySales[0] || {totalSales: 0});
      } catch (err) {
        res.status(500).json({ message: 'Error fetching daily sales', error: err.message });
      }

}

const getWeeklySales=async(req,res)=>{
    try {
        const startOfWeek= moment().startOf('week');
        const endOfWeek= moment().endOf('week');
        const weeklySales = await Transaction.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfWeek.toDate(),
                $lte: endOfWeek.toDate(),
              },
              paymentStatus: 'completed',
            },
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: '$totalAmountToBePaid' },
            },
          },
        ]);
        res.status(200).json(weeklySales[0] || {totalSales: 0});
      } catch (err) {
        res.status(500).json({ message: 'Error fetching weekly sales', error: err.message });
      }

}
const getMonthlySales=async(req,res)=>{
    try {
        const startOfMonth= moment().startOf('month');
        const endOfMonth= moment().endOf('month');
        const monthlySales = await Transaction.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfMonth.toDate(),
                $lte: endOfMonth.toDate(),
              },
              paymentStatus: 'completed',
            },
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: '$totalAmountToBePaid' },
            },
          },
        ]);
        res.status(200).json(monthlySales[0] || {totalSales: 0});
      } catch (err) {
        res.status(500).json({ message: 'Error fetching weekly sales', error: err.message });
      }

}


module.exports={getAllUsers,getUsers,getAdmins,assignRoles,getTransactions,getDailySales,getWeeklySales,getMonthlySales}



//Super-Admin (Director) functionalities in admin panel Super-Admin will be able to; 
// • . Assign roles to other. 
// • Check list of all transactions 
// • View or filter expenses list ~ section for company expenses. 
// • View daily, weekly ahd monthly sales. 
// • Check sales and purchasing ratio i.e. Graphical Representation 
// • Keep a check balance on his/her employees 
// • Keep a check on his/her customer to pay his remaining balance amount: 
// • Check list of orders that are place to vendors 
// • Check total products insight and performance