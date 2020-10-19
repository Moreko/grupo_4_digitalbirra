const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")

const {body, value, validationResult} = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/dbUsers.json')
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = [
    body('logMail')
        .isEmail()
        .withMessage('Debe ingresar un email válido').bail()
        .custom(function (value, {req}){
            let usuarioALoguearse = users.find(element => element.email == value) 

            if(usuarioALoguearse){
                return true
            } else {
                return false
            }
        }).withMessage('El email ingresado no es un usuario existente')
        .bail(),

    body('logPassword')
        .isLength({min:6})
        .withMessage('El password debe tener al menos 6 caracteres').bail()
        .custom(function (value, {req}){
            //acá con el .find estas pisando al usuario, 
            //creo que podes llamar la propiedad password de UsuarioALoguearse 
            //y ver el compare ahi, deberia ser del mismo usuario, aca podrias poner un usuario valido
            //y una contraseña de otro usuario... creo
            let usuarioALoguearse = users.find(element => bcrypt.compareSync(value, element.password))
            
            // prueba de admin con el amigo bob
            if(usuarioALoguearse.email == "bobisjapanese@gmail.com"){
                req.session.admin = true
            }

            if(usuarioALoguearse){
                req.session.usuarioLogueado = usuarioALoguearse
                return true
            } else {
                return false
            }
        }).withMessage('La contraseña es incorrecta'),
]