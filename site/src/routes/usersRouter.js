var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')
const registerMiddleware = require('../middleware/registerMiddleware')
const loginMiddleware = require('../middleware/loginMiddleware')


router.get('/registro', usersController.registro);

router.post('/registrar', registerMiddleware, usersController.registrar);

router.get('/login', usersController.login);

router.post('/loguear', loginMiddleware, usersController.loguear); 

router.get('/perfil', usersController.perfil)

module.exports = router



