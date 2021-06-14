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
    console.log("inseide")
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
router.post("/attended_students", (req, res) => {
  console.log(req.body)
  connection.query("select a.*,b.username from result a,profile b where b.roll_no = a.roll_no and a.contest_id = ?;",[req.body.id], (err, results, fields) => {
    if (err) {
        res.status(201).json(err.sqlMessage);
    } else {
        res.status(200).json(results);
    }
  });
});

router.post('/update_mark', (req, res) => {
  connection.query("update result set total = total + ? where roll_no = ? and contest_id= ?;",[req.body.mark,req.body.roll,req.body.id], (err, results, fields) => {
    if (err) {
        res.status(201).json(err.sqlMessage);
    } else {
      res.status(200).json("Updated Successfully!!");
    }
  })
});

router.post('/update_published', (req, res) => {
  connection.query("update result set published = 1  where roll_no = ? and contest_id= ?;",[req.body.roll,req.body.id], (err, results, fields) => {
    if (err) {
        res.status(201).json(err.sqlMessage);
    } else {
      res.status(200).json("Updated Successfully!!");
    }
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

router.post('/contest_avg/:id',authenticateToken,(req,res) => {
  connection.query("select t1.roll_no,t1.contest_id,t1.total/t1.max_mark * 100 as mark,t2.a/t1.max_mark * 100  as avrg_m,t2.m/t1.max_mark * 100 as high_m,t1.published from result t1 inner join (select contest_id,avg(total) a,max(total) m,published from result where published = 1 and contest_id = ? group by contest_id,published)t2 on t1.contest_id = t2.contest_id and t1.published = t2.published;",[req.params.id], (err, results, fields) => {
    if (err) {
      console.log(err)
        res.status(201).json(err.sqlMessage);
    } else {
        res.status(200).json(results);
    }
  })
});


router.post('/subject_avg/:id',authenticateToken,(req,res) => {
  connection.query("select t1.contest_id,avg(t1.total)/t1.max_mark * 100 as percentage from result t1 where published = 1 and contest_id in (select id from contest t2 where code=?) group by contest_id,max_mark;",[req.params.id], (err, results, fields) => {
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