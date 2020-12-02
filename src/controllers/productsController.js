  const fs = require('fs');
  const path = require('path');
  const moment = require('moment')

  const {validationResult} = require('express-validator');

  const db = require('../database/models')


  const productsFilePath = path.join(__dirname, '../data/dbProducts.json')
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  

  module.exports = {
      index: (req,res)=>{
        // const birras= db.beers.findAll()
        res.render('producto', {birra : products[1]})
        // res.render('producto', {birras})
      },

      detalle: async (req, res) =>{
        // let admin = req.session.admin
        // let birra = products.find(unaBirra => unaBirra.nombre == req.params.nombre)
        // res.render('producto', { birra: birra, admin })

        let admin = req.session.admin

        let birra = await db.Beers.findOne({ where: { nombre: req.params.nombre } }, {include:{all:true}})
        res.render('producto', { birra: birra, admin })
      },

      createForm: async (req, res) =>{
        const estilos =  await db.Estilos.findAll()
        console.log(estilos);
        res.render("sumar_producto", {estilos});
      },

      sumarProducto: async (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()){
          let infoApasar = req.body
          infoApasar.imagen = req.file.filename
          const newBeer = await db.Beers.create(infoApasar)
          res.render("creacionExitosa", {newBeer})  

        } else{
          const estilos =  await db.Estilos.findAll()
            let oldValues = req.body
            res.render("sumar_producto", {registerErrors:errors.errors, oldValues, estilos})
        }

      },

      modificarForm: async (req, res) =>{
        const estilos =  await db.Estilos.findAll()
        const birraId= req.params.id
        const modifbirra= await db.Beers.findByPk(birraId,{include: {all:true}})

        res.render("modificar_producto",{estilos,modifbirra});
      },

      modificarProducto: async (req, res) =>{
        let errors = validationResult(req)
        const estilos =  await db.Estilos.findAll()
        if(errors.isEmpty()){
          const birramodif= await db.Beers.findByPk(req.params.id)
          
          console.log(req.params.id)
          console.log(birramodif)
          await birramodif.update(req.body)
            console.log(birramodif)
      
            res.redirect("/");
           } else{
            let oldValues = req.body
            const modifbirra= await db.Beers.findByPk(req.params.id,{include: {all:true}})
            res.render("modificar_producto",{registerErrors:errors.errors,oldValues,estilos,modifbirra});
      }
    },

      
      borrar: async(req,res) =>{
          const birraBorrar = await db.Beers.findByPk(req.params.id)
          console.log(birraBorrar)
          // por ahora lo dejo con update, no me estaria tomando el paranoid
          await birraBorrar.update({deleted_at: moment().format()})
          res.render('borraste', {birraBorrar})
        },


      nborrar: (req,res)=>{
        registerErrors = [{
          msg:'no estarías borrando nada'
      }]
          res.render("sumar_producto",{registerErrors})
      },
      
      carrito: (req, res) =>{
        res.render("carrito");
      },

      admin: (req,res)=>{
        res.render("admin_db")
      }
}

