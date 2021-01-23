const fs = require('fs');
const path = require('path');
const db = require('../database/models')

const {body, value, validationResult} = require('express-validator');

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
        .custom(async function (value, {req}){
            if(value == req.session.usuarioLogueado.email){
                return true
            }else{

            let mailARegistrarse = await db.Usuarios.findOne({ where: {
                    email: value
                  }})

            if(mailARegistrarse != undefined){
                return Promise.reject('El email ingresado ya existe en la base de datos');
            } else{
                return true
            };

        }})
]