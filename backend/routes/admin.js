const express=require('express')
const router=express.Router()
const {getAllUsers, getUsers, getAdmins, assignRoles, getTransactions}=require('../controllers/director-controller')
const { jwtAuthMiddleware } = require('../middlewares/jwt')

router.route('/usersAll').get(jwtAuthMiddleware,getAllUsers)
router.route('/users').get(jwtAuthMiddleware,getUsers)
router.route('/admins').get(jwtAuthMiddleware,getAdmins)
router.route('/roleass').put(jwtAuthMiddleware,assignRoles)
router.route('/transactions').get(jwtAuthMiddleware,getTransactions)

module.exports=router   