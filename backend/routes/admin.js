const express=require('express')
const router=express.Router()
const {getAllUsers, getUsers, getAdmins}=require('../controllers/director-controller')
const { jwtAuthMiddleware } = require('../middlewares/jwt')

router.route('/usersAll').get(jwtAuthMiddleware,getAllUsers)
router.route('/users').get(jwtAuthMiddleware,getUsers)
router.route('/admins').get(jwtAuthMiddleware,getAdmins)

module.exports=router   