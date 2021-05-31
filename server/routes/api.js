const express = require('express'),
router = express.Router(),
connection = require('../db/db');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')

// const authenticateToken = require('../token/verifytoken');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      // console.log(err)
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
    res.status(200).json({roll_no:req.user.roll_no,role:req.role})
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
router.post('/addques',(req,res ) => {
  console.log(req.body)
  var{choice}=req.body
  if(choice=="MCQ"){
    var{question,options,anstype,ans,mark}=req.body
  connection.query(
    `INSERT into question(choice,question,a_options, ans_type,ans,mark) values( "${choice}","${question}","${options}","${anstype}","${ans}","${mark}")`,
    function (err, results1, field) {
      res.send("Added MCQ question");
    }
  );
  }
  if(choice=="Descriptive"){
    var{question,ans,mark}=req.body
    connection.query(
      `INSERT into question(choice,question,ans,mark) values( "${choice}","${question}","${ans}","${mark}")`,
      function (err, results1, field) {
        res.send("Added Descriptive Question");
      }
    );
  }
  if(choice=="TandF"){
    var{question,mark,torf}=req.body
    connection.query(
      `INSERT into question(choice,question,mark,torf) values( "${choice}","${question}","${mark}","${torf}")`,
      function (err, results1, field) {
        res.send("Added True or False Question");
      }
    );
  }
})
router.get("/studData", (req, res) => {
  connection.query(
    "select roll_no,count(question_no)as quesnos,count(mark) as markobtained from attend group by roll_no",
    (req, result) => {
      d = result.length;
      for (i = 0; i < result.length; i++) {
        if (result[i].quesnos == result[i].markobtained) {
          connection.query(
            `select roll_no,sum(mark) as sum from attend where roll_no="${result[i].roll_no}"`,
            (req, result1) => {
              console.log(result1);
              console.log(result1[0].sum);
              console.log(result1[0].roll_no);
              connection.query(
                `Update mark set mark="${result1[0].sum}" where roll_no="${result1[0].roll_no}"`,
                (req, result2) => {
                  console.log("success");
                }
              );
            }
          );
        } else {
          a = "null";
          console.log(result[i].roll_no)
          connection.query(
            `Update mark set mark=null where roll_no="${result[i].roll_no}"`,
            (req, result2) => {
              console.log("fail");
            }
          );
        }
        
      }
        if(d==i){
          connection.query("select * from mark", (req, result) => {
            res.json(result);
          });
        }
          
        
      
    }
  );
});
router.get('/studPass', (req, res) => {
  connection.query("select * from mark where mark>=50",(req,result)=>{
      res.json(result)
  })
  
});
router.get('/studFail', (req, res) => {
  connection.query("select * from mark where mark<50",(req,result)=>{
      res.json(result)
  })
  
});
router.get('/Rollorder', (req, res) => {
  connection.query("select * from mark w order by roll_no asc",(req,result)=>{
      res.json(result)
  })
  
});
router.get('/markfetch', (req, res) => {
  
  const a=req.query.d
  connection.query(`select * from attend where roll_no="${a}"`,(req,result)=>{
      res.json(result)
  })
  
});
router.post('/addmark', (req, res) => {
  var{a,b,mark}=req.body
  console.log(a,b,mark)
  connection.query(`UPDATE attend SET mark="${mark}" WHERE roll_no="${a}" and question_no="${b}"`,(req,result)=>{
    connection.query(
      `select roll_no,sum(mark) as sum from attend where roll_no="${a}"`,
      (req, result1) => {
        connection.query(
          `Update mark set mark="${result1[0].sum}" where roll_no="${a}"`,
          (req, result2) => {
          })
      })
      res.json("Added")
  })
});
 
module.exports = router;