const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    shippingAddress:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        zipCode:{
            type:String,
            required:true
        }
    },
    paymentMethod:{
        type:String,
        required:true
    },
    orderStatus:{
        type:String,
        enum:['pending','confirmed','shipped','delivered','cancelled'],
        default:'pending'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Order=mongoose.model('Order',orderSchema)

module.exports=Order