const express = require('express'),
router = express.Router(),
connection = require('../db/db');
const jwt = require('jsonwebtoken');

// const authenticateToken = require('../token/verifytoken');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err,user)
  
      if (err) return res.status(403).json(err);
  
      req.user = user
  
      next()
    })
  }

router.get('/home',authenticateToken, (req,res) => {
    res.status(200).json('welcome to the quiz app')
});

module.exports = router;