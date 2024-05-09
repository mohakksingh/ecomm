const mongoose=require('mongoose')

const manufacturerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    }
})

const Manufacturer=mongoose.model('Manufacturer',manufacturerSchema)