
const moment = require('moment')

module.exports = (sequelize, dataTypes) =>{

let alias =  'Beers';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: dataTypes.STRING
    },
    estilo_id:{
        type: dataTypes.INTEGER
    },
    ibu:{
        type: dataTypes.INTEGER
    },
    alcohol:{
        type: dataTypes.INTEGER
    },
    descripcion:{
        type: dataTypes.STRING
    },
    tamano:{
        type: dataTypes.STRING
    },
    categoria:{
        type: dataTypes.STRING
    },
    precio:{
        type: dataTypes.STRING
    },
    stock:{
        type: dataTypes.STRING
    },
    imagen:{
        type: dataTypes.STRING
    },
    deleted_at:{
        type: dataTypes.DATE
    }
}
    let config = {
    tableName: 'beers',
    timestamps: false
}


const Beer = sequelize.define(alias,cols,config);

Beer.associate = function(models){
    Beer.belongsTo(models.Estilos,{
        as: "estilo",
        foreignKey: "estilo_id"
    })
}

return Beer

}