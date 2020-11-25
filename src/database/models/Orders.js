
const moment = require('moment')

module.exports = (sequelize, dataTypes) =>{

let alias =  'Orders';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha:{
        type: dataTypes.DATE
    },
    cantidad_items:{
        type: dataTypes.INTEGER
    },
    monto:{
        type: dataTypes.INTEGER
    }

}
    let config = {
    tableName: 'orders',
    timestamps: false
}


const Order = sequelize.define(alias,cols,config);

Order.associate = function(models){
    Order.hasMany(models.CompraItems,{
      as: 'order',
      foreignKey: 'id',
    })
}



return Order

}