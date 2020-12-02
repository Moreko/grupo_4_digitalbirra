module.exports = {
  "development": {
    "username": "b56efa3421182e",
    "password": "84d3fa21",
    "database": "heroku_d8cd8055dc32488",
    "host": "us-cdbr-east-02.cleardb.com",
    "dialect": "mysql",
    "paranoid": true,
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
