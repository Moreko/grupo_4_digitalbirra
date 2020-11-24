module.exports = {
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql",
    "paranoid":true,
    define:{
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
