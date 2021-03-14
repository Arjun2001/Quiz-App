const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
require('dotenv').config();

const nodemailer = require('nodemailer');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(morgan("default"));


app.get('/', (req,res) => {
  res.json("hellooo")
})

app.post('/forgotpassword', (req,res) => {
  if (req.body.email === 'arjundevpk2001@gmail.com') {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arjunsmart2001@gmail.com',
        pass: 'gmailpassword',
      },
    });
    
    const token = "qwecwervwwcrwex"    
    // random token has to be generated

    const mailOptions = {
      from: 'arjunsmart2001@gmail.com',
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

const PORT = 5000 || process.env.PORT
app.listen(PORT , () => {
    console.log(`Listening to port ${PORT}`);
  });