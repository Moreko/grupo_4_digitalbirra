const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")

const {body, value, validationResult} = require('express-validator');
const db = require('../database/models')

// const usersFilePath = path.join(__dirname, '../data/dbUsers.json')
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = [
    body('logMail')
        .isEmail()
        .withMessage('Debe ingresar un email válido').bail()
        .custom(async (value, {req})=>{
            
            const usuarioALoguearse =  await db.Usuarios.findOne({ where:{
                email : value
            }
                  
              })
          console.log(usuarioALoguearse)
          if (usuarioALoguearse == null ) {
            return Promise.reject('El email ingresado no es un usuario existente');
          }
        }).bail(),

    body('logPassword')
        .isLength({min:6})
        .withMessage('El password debe tener al menos 6 caracteres').bail()
        .custom(async (value, {req}) =>{

            const elUsuario =  await db.Usuarios.findOne({ 
                where: {
                  email: req.body.logMail
                }
              })
    
            // (bcrypt.compareSync(value, elUsuario.password))
            if(elUsuario.password == value){
                if(elUsuario.admin == "1"){
                    req.session.admin = true;
                }
                
                req.session.usuarioLogueado = elUsuario
                 // //aunque sea hasheado lo saco de lo que se pasa a session
                // delete elUsuario.password, lo intenté pero se rompe todo,  
                //illegal arguments string undefined bcrypt pareciería ser un tema de scopes
                return true
            } else {
                return  Promise.reject('La contraseña es incorrectaaaa')
            }
        })
]