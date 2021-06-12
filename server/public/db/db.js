const mySql = require('mysql');
// 35.238.233.86
var connection = mySql.createConnection({
    host: "35.238.233.86",
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