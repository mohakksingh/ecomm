const express=require('express')
const router=express.Router()
const {getAllUsers, getUsers, getAdmins, assignRoles, getTransactions, getDailySales, getWeeklySales, getMonthlySales}=require('../controllers/director-controller')
const { jwtAuthMiddleware, issuperAdmin } = require('../middlewares/jwt')

router.route('/usersAll').get(jwtAuthMiddleware,getAllUsers)
router.route('/users').get(jwtAuthMiddleware,getUsers)
router.route('/admins').get(jwtAuthMiddleware,getAdmins)
router.route('/roleass').put(jwtAuthMiddleware,assignRoles)
router.route('/transactions').get(jwtAuthMiddleware,getTransactions)
router.route('/getDaily').get(jwtAuthMiddleware,issuperAdmin,getDailySales)
router.route('/getWeekly').get(jwtAuthMiddleware,issuperAdmin,getWeeklySales)
router.route('/getMonthly').get(jwtAuthMiddleware,issuperAdmin,getMonthlySales)
module.exports=router   