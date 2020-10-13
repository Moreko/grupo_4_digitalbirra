var express = require('express');
var router = express.Router();
const productsController = require('../controllers/productsController')



/* GET home page. */
router.get('/', productsController.index);

// Carrito
router.get('/carrito', productsController.carrito);

// Sumar producto
router.get('/crear', productsController.createForm);

// Modificar producto
router.get('/modificar', productsController.modificarProducto);

router.get('/admin', productsController.admin)

// Detalle producto (comentario,detalle, este tipo de rutas nos conviene mandarlas al final)
router.get('/:nombre', productsController.detalle);




module.exports = router;
