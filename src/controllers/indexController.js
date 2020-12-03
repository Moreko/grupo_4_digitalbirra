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
                }, limit:8})
            const estilos =  await db.Estilos.findAll()
            let admin = req.session.admin
            res.render('index', { cervezas ,eleccion: 'DIGITAL BIRRA', admin, estilos})
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
        const estilos =  await db.Estilos.findAll()
            if(req.body.eleccion == 'mas-vendidas'){
                let cervezas= await db.Beers.findAll({where:
                    {categoria: 'mas-vendidas', 
                    deleted_at: null}}
                    )

                 res.render('index', {admin, cervezas, eleccion: req.body.eleccion,estilos})
            } else if (req.body.eleccion == 'todas'){
                let cervezas= await db.Beers.findAll({where: {deleted_at: null}}, {include:{all:true}})

                res.render('index', {admin,cervezas, eleccion: req.body.eleccion,estilos})
            }

            if(req.body.estilo_id != undefined){
                let tipoCerveza = req.body.estilo_id
                let cervezas= await db.Beers.findAll({where:{estilo_id: tipoCerveza ,deleted_at: null }}, {include:{all:true}})
                let eleccion = await db.Estilos.findByPk(tipoCerveza)
                res.render('index', {admin, cervezas, eleccion: eleccion.nombre, estilos})
            }

        }
        
}

