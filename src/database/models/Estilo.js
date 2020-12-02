
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


const Estilo = sequelize.define(alias,cols,config);

Estilo.associate = function(models){
    Estilo.hasMany(models.Beers,{
        as: "estilo",
        foreignKey: "id",
    })
}




return Estilo

}