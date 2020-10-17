const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")

const {value, validationResult} = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/dbUsers.json')
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = {
    registro:(req,res)=>{
        res.render("registro")
    },
    registrar:(req,res)=>{

        let errors = validationResult(req)
        let oldValues = req.body

        // Si no tengo errores, registro, sino, mando vista de registro con errores
        if (errors.isEmpty()){
            
            // Creo usuario con contraseña encriptada
            let nuevoUsuario = {
                "id": users[users.length-1].id+1,
                "nombre": req.body.regNombre,
                "apellido": req.body.regApellido,
                "email": req.body.regMail,
                "password": bcrypt.hashSync(req.body.regPassword, 10)
            }

            // Creo variable con base de datos vieja y le sumo el usuario nuevo
            let newDB = [...users, nuevoUsuario]

            // Lo hago Json
            newDBJson = JSON.stringify(newDB, null, 2);

            // Lo escribo en el json de base de datos
            fs.writeFileSync(usersFilePath, newDBJson)

            res.render("registroExitoso")


        } else{
            res.render("registro", {registerErrors:errors.errors, oldValues})
        }
    },

    login:(req,res)=>{
        res.render("login")
    },
    perfil:(req,res)=>{
      res.render("perfilusuario")
    },
    
    loguear:(req,res)=>{

        let loginErrors = validationResult(req)

        // Guardo usuario en una variable para el ejs
        let usuarioLogueado = users.find(element => element.email == req.body.logMail);
        
        // Si no tengo errores, mando logeoExitoso, sino, vuelve a vista login con los errores
        if (loginErrors.isEmpty()){
            console.log(usuarioLogueado)
            res.render("logeoExitoso", {usuarioLogueado})
       
         } else {
             res.render("login", {loginErrors:loginErrors.errors})
            }
        }

        // for (let index = 0; index < users.length; index++) {
        //     res.send(users[index])
            
        // }
        
        
    }
    

