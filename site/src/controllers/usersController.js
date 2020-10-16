const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")

const {validationResult} = require('express-validator')

let usersFilePath = path.join(__dirname, '../data/dbUsers.json')
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

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
                "password": req.body.regPassword //Falta encriptar las pw
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
    
    loguear:(req,res)=>{

        console.log(users)
        let elUsuario = users.find(element => element.email == req.body.logMail) 


        if(elUsuario != undefined){
            res.send('todo bien ' + elUsuario.nombre)
        } else{
            res.send('este mail no está')
        }
        // for (let index = 0; index < users.length; index++) {
        //     if(req.body.logMail == users[index].email){ //chequear esto porque no anda!
        //         res.render("logeoExitoso")
        //     } else {
        //         let errorCredenciales = "El email y/o la contraseña son invalidos" + req.body.logMail + users[index].email
        //         res.render("login", {errorCredenciales})
        //     }       
        // }

        // for (let index = 0; index < users.length; index++) {
        //     res.send(users);
            
        // }

        // for (let index = 0; index < users.length; index++) {
        //     res.send(users[index])
            
        // }
        
        
    }
}

