
const moment = require('moment')

module.exports = (sequelize, dataTypes) =>{

let alias =  'ItemOrders';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad:{
        type: dataTypes.INTEGER
    },
    order_id:{
        type: dataTypes.INTEGER
    },
    usuario_id:{
        type: dataTypes.INTEGER
    },
    beer_id:{
        type: dataTypes.INTEGER
    }

}
    let config = {
    tableName: 'itemorders',
    timestamps: false
}


const ItemOrder = sequelize.define(alias,cols,config);

ItemOrder.associate = function(models){
    ItemOrder.belongsTo(models.Orders,{
      as: 'order',
      foreignKey: 'order_id',
    }),
    ItemOrder.belongsTo(models.Usuarios,{
        as: 'usuario',
        foreignKey: 'usuario_id',
      }),
    ItemOrder.belongsTo(models.Beers,{
        as: 'beer',
        foreignKey: 'beer_id',
      })
}



return ItemOrder

}