const express = require('express'),
router = express.Router(),
connection = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const nodemailer = require('nodemailer');

function generateAccessToken(username,expire) {
    if(expire) {
        return jwt.sign({roll_no:username}, process.env.TOKEN_SECRET, {});
    } else {
        return jwt.sign({roll_no:username}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    }
  }
  

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
            res.status(201).json(err.sqlMessage);
        } else {
            let token = generateAccessToken(roll,false);
            const mailOptions = {
                from: 'Quiz App',
                to: `${req.body.data.email}`,
                subject: 'Account created successfully',
                text: 'You are receiving this because you (or someone else) have created an quiz app account.\n\n'
                + 'Thank you for registering with us.\n\n'
                + 'Stay connected for more updates\n',
              }
              console.log('sending email');
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.GMAIL_USER,
                  pass: process.env.GMAIL_PASS,
                },
              });
              transporter.sendMail(mailOptions, (err,response) => {
                if (err) {
                  console.error('there was an error: ', err);
                } else {
                  console.log('Successfull registration mail sent');
                }
              })
            res.status(200).json({message:"User Registered Successfully",token: token,roll_no:data[0][0],role:data[0][5]})
        }
    })
});


router.post('/signin', (req, res) => {
    if (req.body.data.roll_no) {
        connection.query("select password from users where roll_number = ?",[req.body.data.roll_no], (err, results, fields) => {
            if (err) {
                res.status(201).json(err);
            }
            if (results.length !== 0) {
                let password = bcrypt.compareSync(req.body.data.password, results[0].password);
                if (password) {
                    let token = generateAccessToken(req.body.data.roll_no,req.body.data.rememberMe);
                    res.status(200).json({message:"User Verified", token: token,roll_no:req.body.data.roll_no})
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
                let token = generateAccessToken(req.body.data.email,false);
                res.status(200).json({message:"User Verified",token:token})
            } else {
                res.status(201).json("User Not Registered")
            }
        })
    }
});



module.exports = router;