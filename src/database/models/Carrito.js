
const moment = require('moment')

module.exports = (sequelize, dataTypes) =>{

let alias =  'Carritos';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad_items:{
        type: dataTypes.INTEGER
    },
    usuario_id:{
        type: dataTypes.INTEGER
    },
    total:{
        type: dataTypes.INTEGER
    }

}
    let config = {
    tableName: 'carritos'
}


const Carrito = sequelize.define(alias,cols,config);

Carrito.associate = function(models){
    Carrito.hasMany(models.Items,{
      as: 'carrito',
      foreignKey: 'id',
    })
}



return Carrito

}