const mySql = require('mysql');

var connection = mySql.createConnection({
    host: "localhost",
    user: 'root',
    password: "root",
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