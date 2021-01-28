  const moment = require('moment')
  const {validationResult} = require('express-validator');
  const db = require('../database/models')
  const { Op } = require("sequelize");

  module.exports = {
      index:  (req,res)=>{

        res.redirect('/')

      },  

      detalle: async (req, res) =>{

        let admin = req.session.admin

        let birra = await db.Beers.findByPk(req.params.id, {
          include: 
          [
              { association: 'estilo'}
          ]
      })
       res.render('producto', { birra, admin })
      },

      createForm: async (req, res) =>{
        let estilos =  req.session.estilos
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
            let estilos =  req.session.estilos
            let oldValues = req.body
            res.render("sumar_producto", {registerErrors:errors.errors, oldValues, estilos})
        }

      },

      modificarForm: async (req, res) =>{
        let estilos =  req.session.estilos
        const birraId= req.params.id
        const modifbirra= await db.Beers.findByPk(birraId,{include: {all:true}})
        res.render("modificar_producto",{estilos,modifbirra});
      },

      modificarProducto: async (req, res) =>{
        let errors = validationResult(req)
        let estilos =  req.session.estilos
        if(errors.isEmpty()){
          const birramodif= await db.Beers.findByPk(req.params.id)
          
     
          await birramodif.update(req.body)
     
      
            res.redirect("/");
           } else{
            let oldValues = req.body
            const modifbirra= await db.Beers.findByPk(req.params.id,{include: {all:true}})
            res.render("modificar_producto",{registerErrors:errors.errors,oldValues,estilos,modifbirra});
      }
    },

      
      borrar: async(req,res) =>{
          const birraBorrar = await db.Beers.findByPk(req.params.id)
          let estilos =  req.session.estilos
          await birraBorrar.destroy()
          res.render('borraste', {birraBorrar, estilos})
        },


      nborrar: (req,res)=>{
        registerErrors = [{
          msg:'no estarías borrando nada'
      }]
          res.render("sumar_producto",{registerErrors})
      },
      
      carrito: async (req, res) =>{
        let items = await db.Items.findAll({
          include: 
          
              { association: 'beer'}
        
      ,where:{
          [Op.and]:[{usuario_id: req.session.usuarioLogueado.id}, {estado:1}]
        }})
        
        let itemsFiltro = []
        await items.forEach(element => { 
        let des =  ((({ cantidad, subtotal, beer, id  }) => ({ cantidad, subtotal, beer, id }))(element))
          itemsFiltro.push(des)
        });

        let cantidad = 0
        let total = 0
        await items.forEach(element => {
          cantidad += element.cantidad
          total += element.subtotal
        });
        // res.send(itemsFiltro)
        // itemsFiltro.shift()
        res.render("carrito",{itemsFiltro, cantidad, total});
      },

      admin: (req,res)=>{
        res.render("admin_db")
      },

      labusqueda: async (req,res)=>{
        let estilos =  req.session.estilos
        let admin = req.session.admin
        let elestilo = estilos.find(estilo => estilo.nombre == req.body.labusqueda)
        
        if(elestilo != undefined){
          
          let cervezas = await db.Beers.findAll({where:{
             [Op.or]:[{nombre : {
               [Op.like]: '%' + req.body.labusqueda + '%'
             }}, {estilo_id : {
               [Op.like]: '%' + elestilo.id + '%'
             }}],
             deleted_at:null
            },
             
           })

           res.render('index', { cervezas ,eleccion: 'DIGITAL BIRRA', admin, estilos})
        } else {
          
          let cervezas = await db.Beers.findAll({where:{
            [Op.and]:[{nombre : {
              [Op.like]: '%' + req.body.labusqueda + '%'
            }}, {deleted_at:null}]
          }})
          res.render('index', { cervezas ,eleccion: 'DIGITAL BIRRA', admin, estilos})

        }

      },
      agregarcarrito: async (req,res)=>{
 
          const producto = await db.Beers.findByPk(req.body.beer_id)
         

          let usuario_id = req.session.usuarioLogueado.id
          let item = {    precio: producto.precio,
                          usuario_id:usuario_id,
                          estado: 1,
                          cantidad: req.body.cantidad,
                          beer_id:producto.id,
                          subtotal: producto.precio*req.body.cantidad
                         }
//habrá mejor manera de pasar el subtotal?
          await db.Items.create(item)
          res.redirect('/')
       
      },
    comprar: async(req,res)=>{
      let items = await db.Items.findAll({
        include: 
        
            { association: 'beer'}
      
        ,where:{
        [Op.and]:[{usuario_id: req.session.usuarioLogueado.id}, {estado:1}]
      }})

      let cantidad = 0
      let total = 0
      items.forEach(element => {
        cantidad += element.cantidad
        total += element.subtotal
      });

      await db.Carritos.create({
        cantidad_items:cantidad,
        usuario_id: req.session.usuarioLogueado.id,
        total:total
      })
      
      let uCarrito = await db.Carritos.findOne({
        limit: 1,
        order: [ [ 'created_at', 'DESC' ]]
      })
        
      console.log(uCarrito)
      await items.forEach(element => {
          element.update({estado:0})
          element.update({carrito_id: uCarrito.id})
        });
        res.render('compraExitosa')
      },
      sacar: async (req,res)=>{
        await db.Items.destroy({where: {id:req.body.id}})
        res.redirect('/products/carrito')
      }
    }

