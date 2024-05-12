const mongoose=require('mongoose')

const vendorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    }
})

const Manufacturer=mongoose.model('Manufacturer',vendorSchema)