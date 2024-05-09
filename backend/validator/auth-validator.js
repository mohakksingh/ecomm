const z=require('zod')

const signUpSchema=z.object({
    name:z.string({required_error:"Name is required"}),
    email:z.string({required_error:"Email is required"}).trim().email({message:"Invalid email address"})
    .min(3,{message:"Email must be atleast of 3 characters"})
    .max(255,{message:"Email must be atmost of 255 characters"}),
    password:z.string({required_error:"Password is required"})
    .min(6,{message:"Password must be of atleast 6 characters"})
    .max(1024,{message:"Password must of atmost 1024 characters"})
})

const signInSchema=z.object({
    email:z.string({required_error:"Email is required"}).trim().email({message:"Invalid email address"}),
    password:z.string({required_error:"Password is required"})
})

module.exports={signUpSchema,signInSchema}