const express=require('express')
const router=express.Router()
const register=require('../controllers/auth-controller')
const validate=require('../middlewares/validate-middleware')
const {signUpSchema,signInSchema}=require('../validator/auth-validator')
const { jwtAuthMiddleware } = require('../middlewares/jwt')

router.route('/register').post((validate(signUpSchema)),register.register)
router.route('/login').post((validate(signInSchema)),register.login)
router.route('/logout').post(register.logout)
router.route('/profile').get(jwtAuthMiddleware,register.profile)
module.exports=router   