require('dotenv').config(); 
module.exports = {
  "development": {
    "username": process.env.DBUSERNAME ,
    "password": process.env.DBPASSWORD ,
    "database": process.env.DBDATABASE ,
    "host": process.env.DBHOST ,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DBUSERNAME ,
    "password": process.env.DBPASSWORD ,
    "database": process.env.DBDATABASE ,
    "host": process.env.DBHOST ,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DBUSERNAME ,
    "password": process.env.DBPASSWORD ,
    "database": process.env.DBDATABASE ,
    "host": process.env.DBHOST ,
    "dialect": "mysql"
  }
};