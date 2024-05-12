const User=require('../models/user') 
const Product=require('../models/Product')
const { login } = require('./auth-controller')
const Manufacturer = require('../models/Manufacturer')
const Category = require('../models/Category')


//TODO:Implement it in director-controller.js
//TODO:Add category and manufacturer
const postProduct=async(req,res)=>{
    const {name,description,price,image,inStock,rating,features}=req.body
    try{
        const userData=req.user.newUser || req.user.existingUser
        if(userData.role !=='admin' || userData.role !=='SuperAdmin'){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const newProduct=new Product({
            name,
            description,
            price,
            image,
            inStock,
            rating,
            features
        })
        await newProduct.save()
        res.status(200).json({
            message:"Product added successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}



const postManufacturer=async(req,res)=>{
    const {name,description}=req.body
    try{
        const userData= req.user.existingUser|| req.user.newUser
        if(userData.role !=='admin' || userData.role !=='SuperAdmin'){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const newManufacturer=new Manufacturer({
            name,
            description
        })
        await newManufacturer.save()
        console.log(newManufacturer);
        res.status(200).json({
            message:"Manufacturer added successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const postCategory=async(req,res)=>{
    const {name,description}=req.body
    try{
        const userData= req.user.existingUser|| req.user.newUser
        if(userData.role !=='admin' || userData.role !=='SuperAdmin'){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const newCategory=new Category({
            name,
            description
        })
        await newCategory.save()
        res.status(200).json({
            message:"Category added successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    
    }
}

module.exports={postProduct,postManufacturer,postCategory}