const moment = require('moment')

module.exports = (sequelize, dataTypes) => {

    let alias = 'Usuarios';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        admin: {
            type: dataTypes.INTEGER
        },
        deleted_at: {
            type: dataTypes.DATE
        },
        imagen: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'usuarios',
        timestamps: false
    }


    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models) {
        Usuario.hasMany(models.Items, {
                as: 'usuario',
                foreignKey: "usuario_id"
            }),
            Usuario.hasMany(models.Carritos, {
                as: 'usuarioCarrito',
                foreignKey: "usuario_id"
            })
    }



    return Usuario

}