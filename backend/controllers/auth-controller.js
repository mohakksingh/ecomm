//we are now creating register and signin 
//controllers for our application

const User=require('../models/user')
const bcrypt=require('bcrypt')
const {generateToken}=require('../middlewares/jwt')

const register=async(req,res)=>{
    const {name,email,password}=req.body
    try{
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new User({
            name,
            email,
            password:hashedPassword
        })
        const token=generateToken({newUser})
        await newUser.save()
        res.status(201).json({
            token:token,
            message:"User registered successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body
    try{
        if(!email|| !password){
            return res.status(400).json({
                message:"Please provide email and password"
            })
        }
        const existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(401).json({
                message:"User not found"
            })
        }
        const isPassword=await bcrypt.compare(password,existingUser.password)
        if(!isPassword){
            return res.status(404).json({
                message:"Invalid password"
            })
        }
        const token=generateToken({existingUser})
        res.status(200).json({
            token:token
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}
//TODO:Implement deleting the token
const logout=async(req,res)=>{
    try{
        //blacklist the token
        res.status(200).json({
            message:"User logged out successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const me=async(req,res)=>{
    try{

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports={register,login,logout}