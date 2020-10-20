  const fs = require('fs');
  const path = require('path');

  const {validationResult} = require('express-validator');
const { find } = require('../middleware/registerMiddleware');

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

      formProducto: (req, res) =>{
        if(typeof req.params.id != 'undefined'){
            let elId = req.params.id
            let elProducto  = products.find(element => element.id == elId)
            console.log(elProducto)
            let oldValues = {...elProducto}

            res.render("sumar_producto", {oldValues});
      } else{
            res.render("sumar_producto");
      }},

      // Juan los nombre pitucos en ingles, son para vos
      sumarProducto: (req, res) => {
        let errors = validationResult(req)
        let nameTocheck = req.body.nombre
        if (errors.isEmpty()){
            
            let productToUpdate = products.find(element=> element.nombre == nameTocheck)
            if(productToUpdate){
              let productUpdated = {...productToUpdate, ...req.body}
              let elIndex = products.indexOf(productToUpdate)
              products[elIndex] = productUpdated
              fs.writeFileSync(productsFilePath, JSON.stringify(products, null,2))

              //ir al detalle del producto modificado
              res.redirect('/products/' + productToUpdate.nombre)
            }else{            

            let newProduct = req.body
            newProduct.id = products[products.length -1].id + 1 
            newProduct.imagen = req.file.filename
            let newDB = [...products, newProduct]
            fs.writeFileSync(productsFilePath, JSON.stringify(newDB,null,2))
            //ir al detalle del nuevo producto  no estaria funcionando con redirect y el nombre
            // res.redirect('/products/' + newProduct.nombre) averiguar
            res.redirect('/')
            }
        } else{
            let oldValues = req.body
            res.render("sumar_producto", {registerErrors:errors.errors, oldValues})
        }

      },
      
      carrito: (req, res) =>{
        res.render("carrito");
      },

      admin: (req,res)=>{
        res.render("admin_db")
      }
}

