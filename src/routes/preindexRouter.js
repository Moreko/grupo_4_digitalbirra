var express = require('express');
var router = express.Router();
const preindexController = require('../controllers/preindexController')


router.get('/', preindexController.index)

router.post('/', preindexController.mostrar)

module.exports = router;