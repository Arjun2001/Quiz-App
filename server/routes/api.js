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
      if (err) return res.status(403).json(err);
  
      req.user = user
      if (user.roll_no.substring(0,1) === 'F') {
        req.role = 'Admin'
      } else {
        req.role = 'Student'
      }
      next()
    })
  }

router.get('/who',authenticateToken, (req,res) => {
  connection.query("select username from profile where roll_no = ?", [req.user.roll_no], (err, result) => {
    if (err) {
        res.status(201).json(err.sqlMessage);
    } else {
      console.log(result[0].username)
      res.status(200).json({roll_no:req.user.roll_no,role:req.role,username:result[0].username})
    }
  })
});

router.post('/insert_course', authenticateToken, (req,res) => {
  if (req.role === "Admin") {
    let data = [[req.body.data.code,req.body.data.name,req.body.data.photo,req.body.data.description,req.user.roll_no]];
    connection.query("insert into course values ?", [data], (err, rows) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          res.status(200).json("Added succesfully")
      }
    })
  } else {
    res.status(201).json("UnAuthorized")
  }
});

router.post('/courses', authenticateToken, (req,res) => {
  if (req.role === 'Admin') {
    connection.query("select * from course where fac_id = ?", [req.user.roll_no], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          res.status(200).json(results)
      }
    })
  } else {
    connection.query("select * from course", (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          res.status(200).json(results)
      }
    })
  }
});

router.post('/create_contest',authenticateToken,(req, res) => {
  if (req.role === "Admin") {
      let data = [[req.body.code,req.body.name,req.body.start,req.body.end,req.body.passcode,true]]
      connection.query("insert into contest (code,name,start,end,passcode,ACTIVE) VALUES ?;",[data], (err, results, fields) => {
        if (err) {
            res.status(201).json(err.sqlMessage);
        } else {
            res.status(200).json(results)
        }
      })
    } else {
      res.status(201).json("UnAuthorized")
    }
  });
  

router.post('/contests',authenticateToken, (req,res ) => {
  if (req.body.code !== "None") {
    connection.query("select * from contest where code = ?;",[req.body.code], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          res.status(200).json(results)
      }
    })
  } else {
    connection.query("select * from contest;", (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          res.status(200).json(results)
      }
    })
  }
    
});

router.post('/update_profile',authenticateToken,(req, res) => {
    let data = [[req.body.roll_no,req.body.username,req.body.section]]
    console.log(data)
    connection.query("insert into profile VALUES ?;",[data], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          res.status(200).json("Profile updated successfully")
      }
    })
  });

router.post('/add_questions',(req,res ) => {
  let data = [[req.body.id,req.body.question]]
    console.log(data)
    connection.query("insert into questions VALUES ?;",[data], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
        console.log(results)
          res.status(200).json(results);
      }
    })
});

module.exports = router;