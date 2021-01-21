const fs = require('fs');
const path = require('path');
const db = require('../../database/models')

const { Op } = require("sequelize");


module.exports = {
    list: async (req,res)=>{

            let usuarios = await db.Usuarios.findAll()
            
            
                await usuarios.forEach(element => {
                    element.setDataValue('endpoint','/api/users/'+element.id)
                });

            let respuesta = {
                meta:{
                    status:200,
                    total: usuarios.length
                },
                data: usuarios
            }
            res.json(respuesta)
        
    },
    find: async (req, res) =>{

        let usuario = await db.Usuarios.findByPk(req.params.id)

      await usuario.setDataValue('endpoint','/api/users/'+birra.id)

      let respuesta = {
        meta:{
            status:200,
        },
        data: usuario
    }
       res.json(respuesta)
        
}
}

