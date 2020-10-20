const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")

const {value, validationResult} = require('express-validator');
//que onda esto?
const { isUndefined } = require('util');

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
            //modificar usuario
            
            // if(typeof usuarioActivo.nombre!="undefined"){
            //     let UserModif= users.find(element=>element.nombre==usuarioActivo.nombre)
            //     let Modif={...UserModif, ...req.body}
            //     let elIndex=user.indexOf(UserModif)
            //     users[elIndex]=Modif
            //     fs.writeFileSync(usersFilePath, JSON.stringify(users, null,2))
            //     console.log(usuarioActivo)

            // }else{
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
            // }

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
            
            // Si apretan checkbox recordame, crea una cookie que dura 1 año
            if(req.body.recordarme) {
                res.cookie("recordarme", usuarioLogueado.email, {maxAge: 1000 * 60 * 60 * 24 * 365}) 
            }
            //todavia no entiendo por qué hay que mandarlo acá primero cuando tenemos el mw de apliación
            if(req.session.admin) {
                res.locals.usuarioAdmin = req.session.admin
            }
            
            res.render("logeoExitoso", {usuarioLogueado})
       
         } else {
             res.render("login", {loginErrors:loginErrors.errors})
            }
        },

    logout:(req,res)=>{
        res.locals.usuarioActivo = false;
        res.locals.usuarioAdmin = false;
        // Cierro session
        req.session.destroy();

        // Borro cookie
        res.clearCookie("recordarme")

        res.render("deslogeoExitoso")
    }  
        
    }
    

