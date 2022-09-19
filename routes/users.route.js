const { Router } = require('express')
const { usersController } = require('../controllers/users.controller')


const router = Router()


router.post('/admin/users', usersController.addUser)
router.delete('/admin/users/:id', usersController.deleteUser) 
router.patch('/admin/users/:id', usersController.updateUser)
router.get('/admin/users', usersController.getAllUsers)


router.patch('/users/:userId/wallet/add/:money', usersController.topUpWallet)
router.patch('/users/:userId/medicines/:medicamentId/cart/add', usersController.addToCart)
router.patch('/users/:userId/medicines/:medicamentId/cart/delete', usersController.deleteToCart)
router.patch('/users/:userId/cart/buy', usersController.buy)


module.exports = router