var express = require('express');
var router = express.Router();
const registroController = require('../controllers/registroController')

router.get('/', registroController.index );

router.post('/', registroController.registrar) 

module.exports = router