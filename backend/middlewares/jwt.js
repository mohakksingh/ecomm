const jwt=require('jsonwebtoken')
require('dotenv').config()

const jwtAuthMiddleware=(req,res,next)=>{
    const authorization=req.headers.authorization

    if(!authorization){
        return res.status(401).json({
            message:"Authorization token missing"
        })
    }
    const token=req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        console.log(req.user);
        next();
    }catch(e){
        console.log('Error authenticating token : ',e);
        res.status(401).json({
            message:"Invalid token"
        })
    }
}

const generateToken=(user)=>{
    return jwt.sign(user,process.env.JWT_SECRET,{expiresIn:30000})
}
module.exports={jwtAuthMiddleware,generateToken}