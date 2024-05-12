const express=require('express')
const router=express.Router()
const {jwtAuthMiddleware}=require('../middlewares/jwt')
const { giveOrder } = require('../controllers/order-controller')

router.route('/giveorder').post(jwtAuthMiddleware,giveOrder)

module.exports=router