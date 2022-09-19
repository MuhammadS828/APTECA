const { Router } = require('express')
const { medicamentsController} = require('../controllers/medicaments.controller')

const router = Router()

router.post('/admin/medicaments', medicamentsController.addMed) 
router.delete('/admin/medicaments/:id', medicamentsController.deleteMed) 
router.patch('/admin/medicaments/:id', medicamentsController.updateMed)
router.get('/admin/medicaments', medicamentsController.getAllMed)

router.get('/user/medicaments', medicamentsController.getAllMed)
router.get('/user/medicaments/categories/:categoryId', medicamentsController.getMedByCategory) 
router.get('/user/medicaments/:medicamentId', medicamentsController.getOneMed)


module.exports = router