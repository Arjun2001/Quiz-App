const express = require('express'),
router = express.Router(),
connection = require('../db/db');

const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    var data;


    let roll = req.body.data.roll_no;
    let password = bcrypt.hashSync(req.body.data.password, 4);
    if (roll[0] === 'F') {
        data = [[roll, req.body.data.dob, req.body.data.phone_no, req.body.data.email, password, "Admin"]]
    } else {
        data = [[roll, req.body.data.dob, req.body.data.phone_no, req.body.data.email, password, "Student"]]
    }
    
    connection.query("insert into users (roll_number,dob,phone_number,email,password,role) values ?", [data], (err, rows) => {
        if (err) {
            res.status(201).json(err);
        } else {
            res.status(200).json("user Registered Successfully")
        }
    })
});


router.post('/signin', (req, res) => {
    console.log(req.body)
    if (req.body.data.roll_no) {
        connection.query("select password from users where roll_number = ?",[req.body.data.roll_no], (err, results, fields) => {
            if (err) {
                res.status(201).json(err);
            }
            if (results.length !== 0) {
                let password = bcrypt.compareSync(req.body.data.password, results[0].password);
                if (password) {
                    res.status(200).json("User Verified")
                } else {
                    res.status(201).json("Incorrect password")
                }
            } else {
                res.status(201).json("User Not Registered")
            }
        })
    } else if (req.body.data.email) {
        connection.query("select * from users where email = ?",[req.body.data.email], (err, results, fields) => {
            if (err) {
                res.status(201).json(err);
            }
            if (results.length !== 0) {
                    res.status(200).json("User Verified")
            } else {
                res.status(201).json("User Not Registered")
            }
        })
    }
})


module.exports = router;