const { Router } = require('express')
const { categoriesController } = require("../controllers/categories.controller")

const router = Router()

router.post('/admin/categories', categoriesController.addCateg)
router.delete('/admin/categories/:id', categoriesController.deleteCateg) 
router.patch('/admin/categories/:id', categoriesController.updateCateg) 
router.get('/admin/categories', categoriesController.getAllCateg) 



module.exports = router