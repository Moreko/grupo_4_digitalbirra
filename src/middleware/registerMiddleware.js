const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")

const {body} = require('express-validator');

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

            let mailARegistrarse = users.find(element => element.email == value) 

            if(mailARegistrarse != undefined){
                return false
            } else{
                return true
            };

        }).withMessage('El email ingresado ya existe en la base de datos'),
    body('password')
        .isLength({min:6})
        .withMessage('El password debe tener al menos 6 caracteres').bail(),
    body('regConfPassword')
        .custom(function (value, {req}){
            if (req.body.password == value){
                return true
            }
                return false
        }).withMessage('Los passwords deben coincidir')
]