  const fs = require('fs');
  const path = require('path');
  const moment = require('moment')

  const {validationResult} = require('express-validator');

  const db = require('../database/models')
  const {Beers, Estilos, Usuarios} = require("../database/models")


  const productsFilePath = path.join(__dirname, '../data/dbProducts.json')
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  

  module.exports = {
      index: (req,res)=>{
        res.render('producto', {birra : products[1]})
      },

      detalle: async (req, res) =>{
        // let admin = req.session.admin
        // let birra = products.find(unaBirra => unaBirra.nombre == req.params.nombre)
        // res.render('producto', { birra: birra, admin })

        let admin = req.session.admin

        let birra = await db.Beers.findOne({ where: { nombre: req.params.nombre } }, {include:{all:true}})
        res.render('producto', { birra: birra, admin })
      },

      createForm: (req, res) =>{
        res.render("sumar_producto");
      },

      sumarProducto: async (req, res) => {
        let errors = validationResult(req)
        let nameTocheck = req.body.nombre
        if (errors.isEmpty()){
            
          const newBeer = await Beers.create(req.body)
          console.log(req.body)
          res.render("creacionExitosa", {newBeer})  

        } else{
            let oldValues = req.body
            res.render("sumar_producto", {registerErrors:errors.errors, oldValues})
        }

      },

      modificarForm: (req, res) =>{
        res.render("modificar_producto");
      },

      modificarProducto: (req, res) =>{
        if(typeof req.params.id != 'undefined'){
            let elId = req.params.id
            let elProducto  = products.find(element => element.id == elId)
            console.log(elProducto)
            let oldValues = {...elProducto}

            res.render("modificar_producto", {oldValues});
      } else{
            res.render("modificar_producto");
      }},

      
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

