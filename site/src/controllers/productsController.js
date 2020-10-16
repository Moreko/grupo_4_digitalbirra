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

      formProducto: (req, res) =>{
        if(typeof req.params.id != 'undefined'){
        let elId = req.params.id
        let elProducto  = products.find(element => element.id == elId)
        console.log(elProducto)
        let oldValues = {id: elProducto.id,
                        nombreProducto: elProducto.nombre,
                        tipo: elProducto.tipo,
                        descripProducto: elProducto.descripcion,
                        graduacion: elProducto.graduacion,
                        ibu: elProducto.ibu,
                        mililitros: elProducto.mililitros,
                        categoria: elProducto.categoria,
                        precio: elProducto.precio,
                        imagenProducto: elProducto.imagen }

        res.render("sumar_producto", {oldValues});
      } else{
        res.render("sumar_producto");
      }},
      
      carrito: (req, res) =>{
        res.render("carrito");
      },

      admin: (req,res)=>{
        res.render("admin_db")
      }
}

