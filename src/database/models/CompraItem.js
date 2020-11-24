
const moment = require('moment')

module.exports = (sequelize, dataTypes) =>{

let alias =  'CompraItems';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id:{
        type: dataTypes.INTEGER
    },
    cerveza_id:{
        type: dataTypes.INTEGER
    },
    cantidad:{
        type: dataTypes.INTEGER
    },
    fecha_compra:{
        type: dataTypes.DATE
    },
    deleted_at:{
        type: dataTypes.DATE
    }
}
    let config = {
    tableName: 'compra_items',
    // timestamps: false
}


const CompraItem = sequelize.define(alias,cols,config);

CompraItem.associate = function(models){
    CompraItem.belongsTo(models.Beers,{
      as: 'cerveza',
      foreignKey: 'cerveza_id',
    }),
    CompraItem.belongsTo(models.Usuarios,{
        as: 'usuario',
        foreignKey: 'usuario_id',
      })
}

return CompraItem

}