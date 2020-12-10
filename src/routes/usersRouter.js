var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')
const registerMiddleware = require('../middleware/registerMiddleware')
const loginMiddleware = require('../middleware/loginMiddleware')
const ModifUserMiddleware = require('../middleware/ModifUserMiddleware')
const passMiddleware = require('../middleware/passMiddleware')
const multer = require('multer')
const path = require('path')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img/avatars'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })

var upload = multer({
    storage,
 
    // Validate image
    fileFilter: (req, file, cb) => {
 
       const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
 
       const ext = path.extname(file.originalname);

       if (!acceptedExtensions.includes(ext)) {
          req.file = file;
       }
 
       cb(null, acceptedExtensions.includes(ext));
    }
 });


router.get('/registro', usersController.registro);

router.post('/registrar', upload.single('imagen'), registerMiddleware, usersController.registrar);

router.get('/login', usersController.login);

router.post('/loguear', loginMiddleware, usersController.loguear); 

router.get('/perfil', usersController.perfil)

router.get("/logout", usersController.logout)

router.get('/modifUsuario',usersController.modificarUsuario)

router.post('/modificar', ModifUserMiddleware,usersController.modificar)

router.get('/cambiopass',usersController.modificarPass)

router.put('/cambiopass',passMiddleware, usersController.actualizarPass)


module.exports = router