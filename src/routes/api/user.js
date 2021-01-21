var express = require('express')
var router = express.Router()
var userAPIController = require('../../controllers/api/userAPIController')

router.get('/', userAPIController.list)

router.get('/:id?', userAPIController.find)



module.exports = router