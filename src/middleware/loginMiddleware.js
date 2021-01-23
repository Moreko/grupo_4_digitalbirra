const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")

const {body} = require('express-validator');
const db = require('../database/models')

module.exports = [
    body('logMail')
    .isEmail()
    .withMessage('Debe ingresar un email válido').bail()
    .custom(async (value, {req})=>{
        
        const usuarioALoguearse =  await db.Usuarios.findOne({ where:{
            email : value
        }
        
    })
    if (usuarioALoguearse == null ) {
        // return Promise.reject('El email ingresado no es un usuario existente')
    } else {
        return true
    }
}).bail(),

body('logPassword')
.isLength({min:1})
.withMessage('El password debe tener al menos 4 caracteres').bail()
.custom(async (value, {req}) =>{
    
    const elUsuario =  await db.Usuarios.findOne({ 
        where: {
            email: req.body.logMail
        }
    })    
    
    if (elUsuario != null)  {
        if(bcrypt.compareSync(value, elUsuario.password)){
            if(elUsuario.admin == "1"){
                req.session.admin = true;
            }
            delete elUsuario.password
            delete elUsuario.admin
            req.session.usuarioLogueado = elUsuario
            return true
        } 
    } 
    
    return Promise.reject('Las credenciales son incorrectas')
    
})
]