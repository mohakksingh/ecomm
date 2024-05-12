const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    manufacturer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Manufacturer",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:[{
        type:String,
        required:true
    }],
    inStock:{   
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    features:{
        type:String
    }

})

const Product=mongoose.model('Product',productSchema) 

module.exports=Product  