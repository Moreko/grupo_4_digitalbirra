

const {body} = require('express-validator');

module.exports = [
    body('password')
        .isLength({min:6})
        .withMessage('El password debe tener al menos 6 caracteres').bail(),
    body('repassword')
        .custom(function (value, {req}){
            console.log(req.body)
            if (req.body.password == value){
                console.log('hola')
                return true
            }
                return false
        }).withMessage('Los passwords deben coincidir')
]