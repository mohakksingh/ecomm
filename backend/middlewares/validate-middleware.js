const z=require('zod')

const validate=(schema)=>async(req,res,next)=>{
    try {
        const parseBody=await schema.parseAsync(req.body)
        req.body=parseBody
        next();
    } catch (e) {
        console.log(e);
        res.status(400).json({
            message: "Invalid data"
        })
    }
}

module.exports=validate