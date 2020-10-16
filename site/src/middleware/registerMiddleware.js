const {body} = require('express-validator')

module.exports = [
    body('regNombre')
        .isLength({min:2})
            .withMessage('El nombre debe tener al menos 2 caracteres'),
    body('regApellido')
        .isLength({min:2})
            .withMessage('El apellido debe tener al menos 2 caracteres'),
    body('regMail')
        .isEmail()
            .withMessage('Debe ingresar un email válido'),
        // .custom(function (value, {req}){
        //     //hacer esta logica
        //     }).withMessage('El email ingresado ya existe en la base de datos'),
    body('regPassword')
        .isLength({min:6})
            .withMessage('El password debe tener al menos 6 caracteres').bail(),
    body('regConfPassword')
        .custom(function (value, {req}){
            if (req.body.regPassword == value){
                return true
            }
                return false
            }).withMessage('Los passwords deben coincidir')
]