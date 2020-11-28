
const moment = require('moment')

module.exports = (sequelize, dataTypes) =>{

let alias =  'Estilos';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: dataTypes.STRING
    },
    deleted_at:{
        type: dataTypes.DATE
    }
}
    let config = {
    tableName: 'estilos',
    timestamps: false
}


const Estilos = sequelize.define(alias,cols,config);

Estilos.associate = function(models){
    Estilos.hasMany(models.Beers,{
      as: 'estilo',
      foreignKey: 'id',
    })
}



return Estilos

}