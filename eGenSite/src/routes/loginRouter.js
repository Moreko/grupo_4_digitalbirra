var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController')

router.get('/', loginController.index );

router.post('/', loginController.loguear) 

module.exports = router