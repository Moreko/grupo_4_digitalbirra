const fs = require('fs');
const path = require('path');
const db = require('../database/models')

const { Op } = require("sequelize");



module.exports = {
    index: async (req,res)=>{
        if(req.cookies.serMayor == undefined){
            res.render('preindex')
        } else{
            let cervezas = await db.Beers.findAll({ 
                where: {
                  deleted_at:{
                    [Op.is]:null
                  }
                }})
            let estilos = req.session.estilos
            let admin = req.session.admin
            res.render('index', { cervezas, eleccion: 'DIGITAL BIRRA', estilos, admin})
        }
    },
    faq:(req,res)=>{
        res.render("faq")
    },
    sobre_nosotros:(req,res)=>{
        res.render('sobre_nosotros')
    },

    filtroHome:async(req,res)=>{
        let admin = req.session.admin
        let estilos = await req.session.estilos
            if(req.body.eleccion == 'mas-vendidas'){
                let cervezas= await db.Beers.findAll({where:{
                    [Op.and]:[{categoria : 'mas-vendidas'},{deleted_at : null }]}
                })

                 res.render('index', {admin, cervezas, eleccion: req.body.eleccion,estilos})
            } else if (req.body.eleccion == 'todas'){
                let cervezas= await db.Beers.findAll({where: {deleted_at: null}})

                res.render('index', {admin,cervezas, eleccion: req.body.eleccion,estilos})
            }

            if(req.body.estilo_id != undefined){
                let tipoCerveza = req.body.estilo_id
                // let cervezas= await db.Beers.findAll({where:{
                //     [Op.and]:[{estilo_id : tipoCerveza},{deleted_at : null }]}
                // })
                let cervezas= await db.Beers.findAll({where:{
                   estilo_id : tipoCerveza, deleted_at:null}
                })
                // let eleccion = await db.Estilos.findByPk(tipoCerveza)
                let eleccion = req.session.estilos.find(element => element.id == tipoCerveza)
                res.render('index', {admin, cervezas, eleccion: eleccion.nombre, estilos})
            }

        }
        
}

