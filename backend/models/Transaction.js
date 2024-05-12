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
    totalAmountToBePaid:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        default:'debit',
        enum:['credit','debit'],
        required:true
    },
    paymentStatus:{
        type:String,
        default:'pending',
        enum:['pending','completed'],
        
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
        

        if(this.type==='credit'){
            order.orderStatus='confirmed'

        }
        if(this.type==='debit'){
            order.orderStatus='delivered'
        }
        await order.save()
        next()

    }catch(e){
        next(e)
    }
})

module.exports=mongoose.model('Transaction',transactionSchema)