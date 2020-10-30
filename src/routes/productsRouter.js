var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController')
const sumarProductoMiddleware = require('../middleware/sumarProductoMiddleware');
const serAdminRouteMw = require('../middleware/serAdminRouteMw');
const multer = require('multer')
const path = require('path')
const { route } = require('./indexRouter');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img/products'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })
   
//   var upload = multer({ storage: storage })

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




/* GET home page. */
router.get('/', productsController.index);

// Carrito
router.get('/carrito', productsController.carrito);

// Acceder a agregar, modificar, borrar producto
router.get('/form/:id?', serAdminRouteMw, productsController.formProducto);

// Crear o modificar producto
router.post("/crear", upload.single('imagen'), sumarProductoMiddleware, productsController.sumarProducto)

// Borrar producto
router.delete("/form/:id/borrar", productsController.borrar )

router.post("/form/nborrar", productsController.nborrar )

// Panel admin
router.get('/admin', productsController.admin)

// Detalle producto (comentario,detalle, este tipo de rutas nos conviene mandarlas al final)
router.get('/:nombre', productsController.detalle);




module.exports = router;
