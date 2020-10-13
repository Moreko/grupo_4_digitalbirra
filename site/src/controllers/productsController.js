  const fs = require('fs');
  const path = require('path');


  const productsFilePath = path.join(__dirname, '../data/db.json')
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

