
const moment = require('moment')

module.exports = (sequelize, dataTypes) =>{

let alias =  'Usuarios';

let cols ={
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: dataTypes.STRING
    },
    apellido:{
        type: dataTypes.STRING
    },
    email:{
        type: dataTypes.STRING
    },
    password:{
        type: dataTypes.STRING
    },
    admin:{
        type: dataTypes.INTEGER
    },
    deleted_at:{
        type: dataTypes.DATE
    }
}
    let config = {
    tableName: 'usuarios',
    timestamps: false
}


const Usuarios = sequelize.define(alias,cols,config);

// Usuario.associate = function(models){
//     Usuario.belongsToMany(models.CompraItems,{
//         as: 'compraItem',
//         through: "CompraItems",
//         foreignKey: 'id',
//         other: 'usuario_id',
//         timestamps: false
//       })
// }



return Usuarios

}