var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Hay que ver que hacemos con cada una de estas rutas
router.get('/faq', function(req, res, next) {
  res.render('faq');
});
router.get('/sobre_nosotros', function(req, res, next) {
  res.render('sobre_nosotros');
});
router.get('/carrito', function(req, res, next) {
  res.render('carrito');
});



module.exports = router;
