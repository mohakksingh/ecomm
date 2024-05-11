const User=require('../models/user')
const bcrypt=require('bcrypt')
const {generateToken}=require('../middlewares/jwt')
const user = require('../models/user')

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

module.exports={getAllUsers,getUsers,getAdmins}

