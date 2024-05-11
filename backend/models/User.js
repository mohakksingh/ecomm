const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin','SuperAdmin'],
        default:'user',
        
    },
    cart:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ]
})

// userSchema.methods.addToCart=async function(productId){
//     const productIndex=this.cart.findIndex(cp=>{
//         return cp.product.toString()===productId.toString()
//     })
//     if(productIndex>=0){
//         this.cart[productIndex].quantity++
//     }else{
//         this.cart.push({product:productId})
//     }
//     return this.save()
// }

// userSchema.methods.removeFromCart=async function(productId){
//     this.cart=this.cart.filter(cp=>{
//         return cp.product.toString()!==productId.toString()
//     })
//     return this.save()
// }

module.exports=mongoose.model('User',userSchema)
