const express=require('express')
const router = require('./user')
const { jwtAuthMiddleware } = require('../middlewares/jwt')
const { postProduct, postManufacturer, postCategory } = require('../controllers/admin-controller')
const app=express()

router.route('/product').post(jwtAuthMiddleware,postProduct)
router.route('/manufacturer').post(jwtAuthMiddleware,postManufacturer)
router.route('/category').post(jwtAuthMiddleware,postCategory)

module.exports=router