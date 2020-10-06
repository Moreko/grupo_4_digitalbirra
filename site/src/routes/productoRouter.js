var express = require('express');
var router = express.Router();
const productosController = require('../controllers/productosController')



/* GET home page. */
router.get('/', productosController.index );
router.get('/:nombre', productosController.elegir );

module.exports = router;
