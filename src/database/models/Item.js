
const moment = require('moment')

module.exports = (sequelize, dataTypes) =>{

let alias =  'Items';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    precio:{
        type: dataTypes.INTEGER
    },
    subtotal:{
        type: dataTypes.INTEGER
    },
    estado:{
        type: dataTypes.INTEGER
    },
    cantidad:{
        type: dataTypes.INTEGER
    },
    carrito_id:{
        type: dataTypes.INTEGER
    },
    usuario_id:{
        type: dataTypes.INTEGER
    },
    beer_id:{
        type: dataTypes.INTEGER
    },
    created_at:{
        type: dataTypes.DATE
    },
    updated_at:{
        type: dataTypes.DATE
    },
    deleted_at:{
        type: dataTypes.DATE
    }

}
    let config = {
    tableName: 'items'
}


const Item = sequelize.define(alias,cols,config);

Item.associate = function(models){
    Item.belongsTo(models.Carritos,{
      as: 'carrito',
      foreignKey: 'carrito_id',
    }),
    Item.belongsTo(models.Usuarios,{
        as: 'usuario',
        foreignKey: 'usuario_id',
      }),
    Item.belongsTo(models.Beers,{
        as: 'beer',
        foreignKey: 'beer_id',
      })
}



return Item

}