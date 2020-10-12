var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/registro', usersController.registro);

router.post('/registrar', usersController.registrar);

router.get('/login', usersController.login);

router.post('/loguear', usersController.loguear); 

module.exports = router



