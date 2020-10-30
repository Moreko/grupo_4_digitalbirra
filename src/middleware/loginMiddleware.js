const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")

const {body, value, validationResult} = require('express-validator');
const e = require('express');

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
            console.log(req.body.logMail)
            let elUsuario = users.find(element => element.email == req.body.logMail )
    
            console.log(elUsuario)
            if(bcrypt.compareSync(value, elUsuario.password)){
                if(elUsuario.email == "bobisjapanese@gmail.com"){
                    req.session.admin = true;
                }
            
                req.session.usuarioLogueado = elUsuario
                 // //aunque sea hasheado lo saco de lo que se pasa a session
                // delete elUsuario.password, lo intenté pero se rompe todo,  
                //illegal arguments string undefined bcrypt pareciería ser un tema de scopes

                return true
            } else {
                return false
            }
        }).withMessage('La contraseña es incorrecta'),
]