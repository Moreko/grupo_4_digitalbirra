const fs = require('fs');
const path = require('path');
const db = require('../../database/models')

const { Op } = require("sequelize");



module.exports = {
    list: async (req,res)=>{

            let cervezas = await db.Beers.findAll(
                {include: [{association:'estilo'}]},{ 
                where: {
                  deleted_at:{
                    [Op.is]:null
                  }
                }})
            
            
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

        let birra = await db.Beers.findByPk(req.params.id, {
          include: 
          [
              { association: 'estilo'}
          ]
      })

      await birra.setDataValue('endpoint','/api/birras/'+birra.id)

      let respuesta = {
        meta:{
            status:200,
        },
        data: birra
    }
       res.json(respuesta)
        
}
}

