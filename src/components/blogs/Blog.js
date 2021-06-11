import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import "./blog.css";

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });


function createData(name, time,code,start,end) {
return {
    name,
    time,
    history: [{ code: code, start: start, end: end }]
};
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.time}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell>Start Time</TableCell>
                      <TableCell align="right">End Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.code}>
                        <TableCell component="th" scope="row">
                          {historyRow.code}
                        </TableCell>
                        <TableCell>{historyRow.end}</TableCell>
                        <TableCell align="right">{historyRow.end}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

const Blog = (props) =>{

    const [rows, setRows] = useState([]);
    const [len,setLen] = useState(0);


    const getData = async () => {
        try {
            await axios ({
                method:'post',
                url: "http://35.225.238.45:5000/api/contests",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                },
                data: {
                    code:"None"
                }
            }).then(res => {
                let rows1 = []
                for(var i =0;i <res.data.length;i++) {
                    let now = new Date();
                    now = now.toISOString();
                    if ((now < res.data[i].START)) {
                    rows1.push(createData(res.data[i].NAME,duration(res.data[i].START),res.data[i].CODE,convertTime(res.data[i].START),convertTime(res.data[i].END)))
                    }
                }
            setRows(rows1)
            setLen(rows1.length)
            })
        }catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        getData();
    }, [])

    const convertTime = (START) => {
        let time = new  Date(START);
        time = time.toLocaleString("en-SG");
        return time;
    }
    const duration = (a,) => {
        let time1 = new  Date(a);
        let d = (Math.floor(Math.abs(new Date() - time1)/(1000 * 3600 * 24)))
        console.log(d)
        if (d === 0) {
            d = "Today"
        } else {
            d = d + " days"
        }
        console.log(d)
        return d
    }

    return(
        <div className="blogs-container">
            <div className="blog-title">Latest Updates</div>
            <div className="separator"><span style={{opacity:"0.34"}}>{len} item</span></div>
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Contest</TableCell>
                    <TableCell align="right">In</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                <Row key={row.code} row={row} />
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default Blog;