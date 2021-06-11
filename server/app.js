const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const user = require('./public/routes/user');
const api = require('./public/routes/api');
require('dotenv').config();
const path = require("path");

const nodemailer = require('nodemailer');
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("build"));
// app.use(morgan("default"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 
             

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use('/user', user);
app.use('/api', api);


app.post('/forgotpassword', (req,res) => {
  if (req.body.email === 'arjundevpk2001@gmail.com') {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    
    const token = "qwecwervwwcrwex"    

    const mailOptions = {
      from: 'Quiz App',
      to: `${req.body.email}`,
      subject: 'Link To Reset Password',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
      + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
      + `http://localhost:3000/reset/${token}\n\n`
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    }
    console.log('sending email');
    transporter.sendMail(mailOptions, (err,response) => {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        res.status(200).json('Recovery email sent');
      }
    })
  } else {
    res.status(202).json('Email not found in the DB.');
  } 
})

app.get('*',(req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});


const PORT = process.env.PORT || 5000
app.listen(PORT , () => {
    console.log(`Listening to port ${PORT}`);
  });