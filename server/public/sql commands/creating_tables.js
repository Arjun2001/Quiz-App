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
// var password = bcrypt.hashSync("admin", 4);
// var data = [["F18121", '2018-08-01', '9999119119','admin@gmail.com', password, "Admin"]]
// connection.query("insert into users (roll_number,dob,phone_number,email,password,role) values ?", [data], (err, rows) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("user Registered Successfully")
//     }
// });
    // student insertion
// var password = bcrypt.hashSync("student", 4);
// var data = [["18121", '2018-08-01', '9999119119','student@gmail.com', password, "Student"]]
// connection.query("insert into users (roll_number,dob,phone_number,email,password,role) values ?", [data], (err, rows) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("studenet Registered Successfully")
//     }
// });
    // course table
connection.query("CREATE TABLE course (code varchar(255) not null PRIMARY KEY,name varchar(255) not null,photo varchar(255) not null,description varchar(255) not null, fac_id varchar(255) not null);", (err, rows) => {
    if(err) {
        console.log(err.sqlMessage,'user table error');
    } else{ 
        console.log("table course created");
    }
});
    //  contest table
connection.query('CREATE TABLE contest(ID INT not null AUTO_INCREMENT PRIMARY KEY,CODE VARCHAR(255) not null,NAME VARCHAR(255) not null,START DATETIME not null,END DATETIME not null,passcode varchar(255) not null,active bool);',(err, rows) => {
    if(err) {
        console.log(err.sqlMessage,'contest table error');
    } else{ 
        console.log("table contest created");
    }
});


//  profile table
connection.query('create table profile(roll_no varchar(255) not null PRIMARY KEY,username VARCHAR(255) not null,section VARCHAR(255) not null);',(err, rows) => {
    if(err) {
        console.log(err.sqlMessage,'profile table error');
    } else{ 
        console.log("table profile created");
    }
});

//  questions table
connection.query('create table questions(contest varchar(255) not null,question JSON not null);',(err, rows) => {
    if(err) {
        console.log(err.sqlMessage,'questions table error');
    } else{ 
        console.log("questions table created");
    }
});

//  result table

connection.query('CREATE TABLE result(roll_no INT not null,contest_id int not null,answer JSON,published bool,time varchar(255),max_mark INT,total INT,PRIMARY KEY(roll_no,contest_id));',(err, rows) => {
    if(err) {
        console.log(err.sqlMessage,'result table error');
    } else{ 
        console.log("result table created");
    }
});