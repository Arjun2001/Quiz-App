const  connection = require('../db/db');
const bcrypt = require('bcrypt');


    // user table creation
connection.query("CREATE TABLE users (roll_number varchar(255) not null PRIMARY KEY, dob date not null,phone_number bigint not null, email varchar(50) NOT NULL, password varchar(255) not null, role varchar(255) not null); ", (err, rows) => {
    if(err) {
        console.log(err.sqlMessage,'user table error');
    } else{ 
        console.log("table users created");
    }
});

    // admin insertion
var password = bcrypt.hashSync("admin", 4);
var data = [["F18121", '2018-08-01', '9999119119','admin@gmail.com', password, "Admin"]]
connection.query("insert into users (roll_number,dob,phone_number,email,password,role) values ?", [data], (err, rows) => {
    if (err) {
        console.log(err);
    } else {
        console.log("user Registered Successfully")
    }
});

    // student insertion
var password = bcrypt.hashSync("student", 4);
var data = [["18121", '2018-08-01', '9999119119','student@gmail.com', password, "Student"]]
connection.query("insert into users (roll_number,dob,phone_number,email,password,role) values ?", [data], (err, rows) => {
    if (err) {
        console.log(err);
    } else {
        console.log("studenet Registered Successfully")
    }
});

    // course table
connection.query("CREATE TABLE course (code varchar(255) not null PRIMARY KEY,name varchar(255) not null,photo varchar(255) not null,description varchar(255) not null, fac_id varchar(255) not null);", (err, rows) => {
    if(err) {
        console.log(err.sqlMessage,'user table error');
    } else{ 
        console.log("table course created");
    }
});