const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")

const db = require('../database/models')

const {value, validationResult} = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/dbUsers.json')
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = {
    registro:(req,res)=>{
        res.render("registro")
    },
    registrar:async(req,res)=>{

        let errors = validationResult(req)
        let oldValues = req.body

        // Si no tengo errores, registro, sino, mando vista de registro con errores
        if (errors.isEmpty()){
            
            let NewUser = await db.Usuarios.create(req.body)
             //     "password": bcrypt.hashSync(req.body.regPassword, 10)
           
            console.log(NewUser)
            res.render("registroExitoso")
           

        } else{
            res.render("registro", {registerErrors:errors.errors, oldValues})
        }
    
    },

    login:(req,res)=>{
        res.render("login")
    },
    
    loguear: async (req,res)=>{

        let loginErrors = validationResult(req)

        // Guardo usuario en una variable para el ejs

        let usuarioLogueado =  await db.Usuarios.findOne({ 
            where: {
              email: req.body.logMail
            }
          })

        
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
            //habría que mandarle solo algunas cosas y no todo el usuario
            req.session.usuarioLogueado = usuarioLogueado
            res.locals.usuarioActivo =  usuarioLogueado

            res.render("logeoExitoso")
       
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
    },  
    perfil:(req,res)=>{
        res.render("perfilusuario")
      },
    
    modificarUsuario:(req,res)=>{
            res.render('modifUsuario')
        },
     //modificar usuario
    modificar: async (req,res)=>{
        let Usererrors= validationResult(req);
        console.log( req.body)
        if (Usererrors.isEmpty()){
             
        let UserModif = await db.Usuarios.findOne({ where: {
            email: req.session.usuarioLogueado.email
          }})

        await UserModif.update(req.body)
        res.locals.usuarioActivo  = req.body
        //actualizar los datos
        res.render('perfilUsuario')    
        }else{
            res.render('modifUsuario',{Usererrors:Usererrors.errors})
        }
    }           
            
    }
    

