const {body} = require('express-validator')

module.exports = [
    body('regNombre')
    .isLength({min:2})
    .withMessage('el nombre debe tener al menos 2 caracteres'),
    body('regApellido')
    .isLength({min:2})
    .withMessage('el apellido debe tener al menos 2 caracteres'),
    body('regMail')
    .isEmail()
    .withMessage('este campo debe tener un mail válido'),
    body('regPassword')
    .isLength({min:6})
    .withMessage('el password debe tener al menos 6 caracteres').bail(),
    body('regConfPassword')
        .custom(function (value, {req}){
            if (req.body.regPassword == value){
                return true
            }
                return false
        }).withMessage('los passwords deben coincidir')
]