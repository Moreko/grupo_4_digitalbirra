var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController')
const sumarProductoMiddleware = require('../middleware/sumarProductoMiddleware');
// const { route } = require('./indexRouter');



/* GET home page. */
router.get('/', productsController.index);

// Carrito
router.get('/carrito', productsController.carrito);

// Sumar producto formulario
router.get('/crear', productsController.createForm);

// Crear producto
router.post("/crear", sumarProductoMiddleware,productsController.sumarProducto)

// Modificar producto
router.get('/modificar', productsController.modificarProducto);

// Panel admin
router.get('/admin', productsController.admin)

// Detalle producto (comentario,detalle, este tipo de rutas nos conviene mandarlas al final)
router.get('/:nombre', productsController.detalle);




module.exports = router;
