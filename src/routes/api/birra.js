var express = require('express')
var router = express.Router()
var birraAPIController = require('../../controllers/api/birraAPIController')

router.get('/', birraAPIController.list)

router.get('/buscar', birraAPIController.findName)
router.get('/estilos', birraAPIController.listEstilo)

router.get('/:id?', birraAPIController.find)



module.exports = router