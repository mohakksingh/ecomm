const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        enum:['credit','debit'],
        required:true
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'pending'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

transactionSchema.pre('save',async function(next){
    try{
        const Order=require('./Order')
        const order=await Order.findById(this.order)
        if(!order){
            throw new Error('Order not found')
        }
        if(order){
            this.totalAmount=order.totalAmount
        }

        if(this.type==='credit'){
            order.status='confirmed'
        }
        if(this.type==='debit'){
            order.status='delivered'
        }
        if(order){
            this.createdAt=order.createdAt
        }
        await order.save()
        next()

    }catch(e){
        next(e)
    }
})

module.exports=mongoose.model('Transaction',transactionSchema)