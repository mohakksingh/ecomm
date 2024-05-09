const express=require('express')
const router=express.Router()
const register=require('../controllers/auth-controller')
const validate=require('../middlewares/validate-middleware')
const {signUpSchema,signInSchema}=require('../validator/auth-validator')

router.route('/register').post((validate(signUpSchema)),register.register)
router.route('/login').post((validate(signInSchema)),register.login)
module.exports=router   