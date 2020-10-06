var express = require('express');
var router = express.Router();
const productosController = require('../controllers/productosController')



/* GET home page. */
router.get('/', productosController.index );

// Sumar producto
router.get('/crear', productosController.createForm);

// Modificar producto
router.get('/modificar', productosController.modificarProducto);

// Detalle producto
router.get('/:nombre', productosController.detalle);



module.exports = router;
