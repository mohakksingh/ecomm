const express=require('express')
const router=express.Router()
const {jwtAuthMiddleware}=require('../middlewares/jwt')
const { giveOrder, userOrder } = require('../controllers/order-controller')

router.route('/giveorder').post(jwtAuthMiddleware,giveOrder)
router.route('/userOrder/:id').get(jwtAuthMiddleware,userOrder)


module.exports=router