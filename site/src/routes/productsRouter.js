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

// Detalle producto
router.get('/:nombre', productsController.detalle);






module.exports = router;
