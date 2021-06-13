const mySql = require('mysql');
// 35.238.233.86,sdfsa 35.192.26.172

var connection = mySql.createConnection({
    host: "35.192.26.172",
    user: 'root',
    password: "password",
    database: "quiz",    
    port: "3306",
    multipleStatements: true
  })
  
  connection.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log('connected to db');
    }
  });

module.exports = connection;