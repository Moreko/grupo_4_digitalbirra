const fs = require('fs');
const path = require('path');
var bcrypt = require("bcryptjs")
const db = require('../database/models')
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");


// const usersFilePath = path.join(__dirname, '../data/dbUsers.json')
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = {
    registro: (req, res) => {
        res.render("registro")
    },
    registrar: async(req, res) => {

        let errors = validationResult(req)
        let oldValues = req.body

        // Si no tengo errores, registro, sino, mando vista de registro con errores
        if (errors.isEmpty()) {

            req.body.password = (bcrypt.hashSync(req.body.password, 10))
            let usuarioACrear = req.body
            usuarioACrear.imagen = req.file.filename
            await db.Usuarios.create(usuarioACrear)

            res.render("registroExitoso")


        } else {
            res.render("registro", { registerErrors: errors.errors, oldValues })
        }

    },

    login: (req, res) => {
        res.render("login")
    },

    loguear: async(req, res) => {

        let loginErrors = validationResult(req)

        // Si no tengo errores, mando logeoExitoso, sino, vuelve a vista login con los errores
        if (loginErrors.isEmpty()) {

            // Si apretan checkbox recordame, crea una cookie que dura 1 año
            if (req.body.recordarme) {
                let usuarioLogueado = await req.session.usuarioLogueado
                res.cookie("recordarme", usuarioLogueado.email, { maxAge: 1000 * 60 * 60 * 24 * 365 })
            }

            if (req.session.admin) {
                res.locals.usuarioAdmin = req.session.admin
            }
            //habría que mandarle solo algunas cosas y no todo el usuario
            res.locals.usuarioActivo = req.session.usuarioLogueado
            res.render("logeoExitoso")

        } else {
            res.render("login", { loginErrors: loginErrors.errors })
        }
    },

    logout: (req, res) => {
        res.locals.usuarioActivo = false;
        res.locals.usuarioAdmin = false;
        // Cierro session
        req.session.destroy();

        // Borro cookie
        res.clearCookie("recordarme")

        res.render("deslogeoExitoso")
    },
    perfil: async(req, res) => {
        let compras = await db.Carritos.findAll({
            where: {
                [Op.and]: [{ usuario_id: req.session.usuarioLogueado.id }]
            }
        })

        let usuario = await db.Usuarios.findOne({ where: { id: req.session.usuarioLogueado.id } })
        res.render("perfilusuario", { compras, usuario })
    },

    modificarUsuario: (req, res) => {
        res.render('modifUsuario')
    },
    //modificar usuario
    modificar: async(req, res) => {
        let Usererrors = validationResult(req);

        if (Usererrors.isEmpty()) {

            let UserModif = await db.Usuarios.findOne({
                where: {
                    email: req.session.usuarioLogueado.email
                }
            })

            await UserModif.update(req.body)
            req.session.usuarioLogueado = await {...res.locals.usuarioActivo, ...req.body }
            res.redirect('/')
        } else {
            res.render('modifUsuario', { Usererrors: Usererrors.errors })
        }
    },
    modificarPass: (req, res) => {
        res.render("modifPass")
    },
    actualizarPass: async(req, res) => {
        let Usererrors = validationResult(req);

        if (Usererrors.isEmpty()) {
            let elUsuario = await db.Usuarios.findOne({ where: { email: req.session.usuarioLogueado.email } })
            let nuevacont = bcrypt.hashSync(req.body.password, 10)
            console.log(nuevacont)
            await elUsuario.update({ password: nuevacont })
            res.redirect('/')
        } else {
            res.render('modifPass', { Usererrors: Usererrors.errors })
        }
    }

}