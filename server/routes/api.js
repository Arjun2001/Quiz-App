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
    if (req.body.id) {
      let data = [req.body.name,req.body.start,req.body.end,req.body.passcode,true,req.body.id]
      connection.query(`update contest set NAME = ?, START = ?, END = ?, passcode = ?, active = ? WHERE id = ?;`,data,(err, results, fields) => {
        if (err) {
            res.status(201).json(err.sqlMessage);
        } else {
            res.status(200).json("Contest Updated Successfully")
        }
      })
    } else {
      let data = [[req.body.code,req.body.name,req.body.start,req.body.end,req.body.passcode,true]]
      connection.query("insert into contest (code,name,start,end,passcode,ACTIVE) VALUES ?;",[data], (err, results, fields) => {
        if (err) {
            res.status(201).json(err.sqlMessage);
        } else {
            res.status(200).json(results)
        }
      })}
  } else {
      res.status(201).json("UnAuthorized")
    }
});


router.post('/delete_contest',authenticateToken,(req, res) => {
  connection.query("delete from contest where id = ?;",[req.body.id], (err, results, fields) => {
    if (err) {
      console.log(err)  
        res.status(201).json(err.sqlMessage);
    } else {
        res.status(200).json("contest deleted successfully")
    }
  })
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
    connection.query("insert into profile VALUES ?;",[data], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          res.status(200).json("Profile updated successfully")
      }
    })
  });

router.post('/add_questions',authenticateToken,(req,res ) => {
  let data = [[req.body.id,req.body.question]]
    connection.query("insert into questions VALUES ?;",[data], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          res.status(200).json(results);
      }
    });
  }
)
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
 


router.post('/contest_details',authenticateToken,(req,res ) => {
  let output,output1;
    connection.query("select * from contest where id = ?;",[req.body.id], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          output = results;
      }
    })
    
    connection.query("SELECT count(contest) FROM questions WHERE contest = ?;",[req.body.id], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
        output1 = results;
      }
    })
    connection.query("SELECT count(roll_no) FROM result WHERE contest_id = ?;",[req.body.id], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
        res.status(200).json({data:output,check:output1,attended:results});
      }
    })
});

router.get('/get_questions/:id',(req,res ) => {
  let id = req.params.id;
  console.log("sdasd",id)
  let output1;
    connection.query("select * from contest where id = ?;",[id], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          output1 = results;
      }
    })

  
    connection.query("select question from questions where contest = ?;",[id], (err, results, fields) => {
      if (err) {
          res.status(201).json(err.sqlMessage);
      } else {
          let output = {response_code:10,results:[]};
          results.map((ques) => {
            let temp = JSON.parse(ques.question)
            output.results.push(temp)
          })
          res.status(200).json({details:output1,output:output})
      }
    })
});

router.post('/add_result',authenticateToken,(req,res) => {
  let data = [[req.body.roll_no,req.body.contest_id,JSON.stringify(req.body.answer),req.body.publised,req.body.time,req.body.total,req.body.maxMark]]
  connection.query("insert into result (roll_no,contest_id,answer,published,time,total,max_mark) values ?;",[data], (err, results, fields) => {
    if (err) {
      console.log(err)
        res.status(201).json(err.sqlMessage);
    } else {
        res.status(200).json(results);
    }
  })
});

router.post('/get_result',authenticateToken,(req,res) => {
  connection.query("SELECT * FROM RESULT WHERE ROLL_NO = ? AND CONTEST_ID = ?;",[req.body.roll,req.body.id], (err, results, fields) => {
    if (err) {
      console.log(err)
        res.status(201).json(err.sqlMessage);
    } else {
        res.status(200).json(results);
    }
  })
});

router.get('/contest_avg/:id',(req,res) => {
  console.log(req.params.id)
  connection.query("select roll_no,total,max_mark from result where contest_id = ? and published = 1;",[req.params.id], (err, results, fields) => {
    if (err) {
      console.log(err)
        res.status(201).json(err.sqlMessage);
    } else {
        res.status(200).json(results);
    }
  })
});

router.get('/subject_avg/:id',(req,res) => {
  console.log(req.params.id)
  connection.query("select id from contest where code = ?",[req.params.id], (err, results, fields) => {
    if (err) {
      console.log(err)
        res.status(201).json(err.sqlMessage);
    } else {
        console.log(results)
        res.status(200).json(results);
    }
  })
});

module.exports = router;