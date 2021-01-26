var express = require('express');
var router = express.Router();
const estilosMw = require('../middleware/estilosMw');

const indexController = require("../controllers/indexController")

/* GET home page. */

router.get('/', estilosMw, indexController.index);

router.post('/', indexController.filtroHome)

router.get('/faq', indexController.faq);

router.get('/sobre_nosotros', indexController.sobre_nosotros);


module.exports = router;