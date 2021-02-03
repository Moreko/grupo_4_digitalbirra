module.exports = {
    "development": {
        "username": process.env.elusername,
        "password": process.env.password,
        "database": process.env.database,
        "host": process.env.host,
        "dialect": process.env.dialect,
        define: {
            paranoid: true,
            underscored: true
        }
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}