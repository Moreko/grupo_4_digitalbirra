const fs = require('fs');
const path = require('path');

const {body, value, validationResult} = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/dbUsers.json')
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = [
    body('nombre')
        .isLength({min:2})
        .withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido')
        .isLength({min:2})
        .withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .isEmail()
        .withMessage('Debe ingresar un email válido')
        .custom(function (value, {req}){
            if(value== req.locals.usuarioActivo){
                return false
            }else{

            let mailARegistrarse = users.find(element => element.email == value) 

            if(mailARegistrarse != undefined){
                return false
            } else{
                return true
            };

        }})
        .withMessage('El email ingresado ya existe en la base de datos')
]