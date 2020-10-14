  const fs = require('fs');
  const path = require('path');

  const {validationResult} = require('express-validator')

  const productsFilePath = path.join(__dirname, '../data/dbProducts.json')
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  

  module.exports = {
      index: (req,res)=>{
        res.render('producto', {birra : products[1]})
      },

      detalle: (req, res) =>{
        let birra = products.find(unaBirra => unaBirra.nombre == req.params.nombre)
        res.render('producto', { birra: birra })
      },

      createForm: (req, res) =>{
        res.render("sumar_producto");
      },

      sumarProducto: (req, res) => {
        let errors = validationResult(req)
        let oldValues = req.body
        if (errors.isEmpty()){
            res.send('todo bien')
        } else{
            res.render("sumar_producto", {registerErrors:errors.errors, oldValues})
        }

      },

      modificarProducto: (req, res) =>{
        res.render("modif_producto");
      },
      
      carrito: (req, res) =>{
        res.render("carrito");
      },

      admin: (req,res)=>{
        res.render("admin_db")
      }
}

