const fs = require('fs');
const path = require('path');
const db = require('../../database/models')

const { Op } = require("sequelize");


module.exports = {
    list: async (req,res)=>{

            let cervezas = await db.Beers.findAll(
                {include: [{association:'estilo'}],
                where: {
                    deleted_at:{
                      [Op.is]:null
                    }
                  } 
                }
                )
            
            
                await cervezas.forEach(element => {
                    element.setDataValue('endpoint','/api/birras/'+element.id)
                    
                });

            let respuesta = {
                meta:{
                    status:200,
                    total: cervezas.length
                },
                data: cervezas
            }
            res.json(respuesta)
        
    },
    find: async (req, res) =>{

        let birra = await db.Beers.findByPk(req.params.id,
            {include: [{association:'estilo'}]
          })

      await birra.setDataValue('endpoint','/api/birras/'+birra.id)

      let respuesta = {
        meta:{
            status:200,
        },
        data: birra
    }
       res.json(respuesta)
        
},

    findName: async (req,res)=>{
        let estilos = await db.Estilos.findAll()
        let elestilo = estilos.find(estilo => estilo.nombre == req.query.busqueda)

        if(elestilo != undefined){
        
        let cervezas = await db.Beers.findAll({where:{
            [Op.or]:[{nombre : {
            [Op.like]: '%' + req.query.busqueda + '%'
            }}, {estilo_id : {
            [Op.like]: '%' + elestilo.id + '%'
            }}],
            deleted_at:null
            },
            
        })
        cervezas.forEach(cerveza =>
            cerveza.setDataValue('endpoint','/api/birras/'+cerveza.id))
        let respuesta = {
            meta:{
               status:200,
               total: cervezas.length
              },
             data: cervezas
            }
        res.json(respuesta)
        } else {
        
        let cervezas = await db.Beers.findAll({where:{
            [Op.and]:[{nombre : {
            [Op.like]: '%' + req.query.busqueda + '%'
            }}, {deleted_at:null}]
        }})
        cervezas.forEach(cerveza =>
            cerveza.setDataValue('endpoint','/api/birras/'+cerveza.id))
            let respuesta = {
                meta:{
                   status:200,
                   total: cervezas.length
                  },
                 data: cervezas
                }
            res.json(respuesta)
        }

    }
}

