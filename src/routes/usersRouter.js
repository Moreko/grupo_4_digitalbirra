var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')
const registerMiddleware = require('../middleware/registerMiddleware')
const loginMiddleware = require('../middleware/loginMiddleware')
const ModifUserMiddleware = require('../middleware/ModifUserMiddleware')

router.get('/registro', usersController.registro);

router.post('/registrar', registerMiddleware, usersController.registrar);

router.get('/login', usersController.login);

router.post('/loguear', loginMiddleware, usersController.loguear); 

router.get('/perfil', usersController.perfil)

router.get("/logout", usersController.logout)

router.get('/modifUsuario',usersController.modificarUsuario)

router.post('/modificar', ModifUserMiddleware,usersController.modificar)

router.get('/cambiopass',usersController.modificarPass)

router.put('/cambiopass',usersController.actualizarPass)


module.exports = router