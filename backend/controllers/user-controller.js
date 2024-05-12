const User=require('../models/user') 
const Product=require('../models/Product')
const Manufacturer = require('../models/Manufacturer')
const Category = require('../models/Category')

const getProducts=async(req,res)=>{
    try{
        const userData=req.user.existingUser || req.user.newUser
        if(!userData){
            return res.status(401).json({
                message:"User not found"
            })
        }
        const products=await Product.find()
        res.status(200).json({
            products
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const getManufacturer=async(req,res)=>{
    try{
        const userData=req.user.existingUser || req.user.newUser
        if(!userData){
            return res.status(401).json({
                message:"User not found"
            })
        }
        const manufacturers=await Manufacturer.find()
        res.status(200).json({
            manufacturers
        
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}


const getCategory=async(req,res)=>{
    try{
        const userData=req.user.existingUser || req.user.newUser
        if(!userData){
            return res.status(401).json({
                message:"User not found"
            })
        }
        const category=await Category.find()
        res.status(200).json({
            category
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}


module.exports={getProducts,getManufacturer,getCategory}
