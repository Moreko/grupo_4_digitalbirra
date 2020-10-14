var express = require('express');
var router = express.Router();


const indexController = require("../controllers/indexController")

/* GET home page. */

router.get('/', indexController.index);

router.post('/',indexController.filtroHome)

router.get('/faq', indexController.faq);

router.get('/sobre_nosotros', indexController.sobre_nosotros);


module.exports = router;
