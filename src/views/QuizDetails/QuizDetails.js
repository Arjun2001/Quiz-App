import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

import ImportExportIcon from "@material-ui/icons/ImportExport";
import IconButton from "@material-ui/core/IconButton";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ClearIcon from "@material-ui/icons/Clear";
import ReactFontLoader from "react-font-loader";
import Navbar from '../../components/Navbar/Navbar'
import { StepButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
 
  button: {
    marginLeft: "2%",
    borderRadius: "0px 20px 20px 0px",
    backgroundColor: "black",
  },
});

const QuizDetails = ({ stud }) => {
  console.log(stud)
  const classes = useStyles();
  
  const handleSubmit = (value) => {
    console.log(value);
    console.log("hi");

    window.location="/testdetails/"+value
  };
  return (
    <div style={{ backgroundColor: "#FAE2E2" }}>
     
      <Navbar/>
      <ReactFontLoader url="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&family=Roboto+Slab:wght@300;400;500&display=swap" />
      <div style={{fontStyle:"Roboto Slab",fontSize:"40px",marginLeft:"15%",color:"brown",marginTop:"2%",marginBottom:"1%"}}>
        CONTEST NAME :  
      </div>
      <TableContainer
        component={Paper}
        style={{
          width: "70%",
          align: "center",
          marginLeft: "auto",
          marginRight: "auto",
          border: "5px solid black",
        }}
      >

        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                style={{ fontFamily: "Roboto Slab", fontSize: "25px" }}
              >
                {" "}
                Roll no
              </StyledTableCell>

              <StyledTableCell
                align="center"
                style={{ fontFamily: "Roboto Slab", fontSize: "25px" }}
              >
                {" "}
                Student Name
              </StyledTableCell>

              <StyledTableCell
                align="center"
                style={{ fontFamily: "Roboto Slab", fontSize: "25px" }}
              >
                {" "}
                Mark
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ fontFamily: "Roboto Slab", fontSize: "25px" }}
              >
                {" "}
                Proceed
              </StyledTableCell>
                 
            </TableRow>
          </TableHead>
          <TableBody>
            
            {stud.map((row) => (
              <StyledTableRow >
               
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "25px" }}
                >
                  {row.roll_no}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "25px" }}
                >
                  {row.name}
                </StyledTableCell>
                {row.mark>=50 ?(<StyledTableCell
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "25px",color: "green", }}
                >
                  {row.mark}
                </StyledTableCell>):(
                  <StyledTableCell
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "25px" ,color: "red",}}
                >
                  {row.mark}
                </StyledTableCell>
                )}
               
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<SendIcon />}
                      onClick={() => handleSubmit(row.roll_no)}
                      style={{fontSize:"15px"}}
                    >
                      Proceed
                    </Button>
                </StyledTableCell>
              
              </StyledTableRow>
              ))}
            {/* ))} */}
          </TableBody>
        </Table>
        <div style={{ marginLeft: "82%" }}>
          <IconButton color="inherit" aria-label="menu">
            <Link to="/order" className={classes.lg1}>
              <ImportExportIcon />
            </Link>
          </IconButton>

          <IconButton color="inherit" aria-label="menu">
            <Link to="/pass" className={classes.lg}>
              <DoneOutlineIcon />
            </Link>
          </IconButton>
          <IconButton color="inherit" aria-label="menu">
            <Link to="/fail" className={classes.lg}>
              <ClearIcon />
            </Link>
          </IconButton>
        </div>
      </TableContainer>
    </div>
  );
};

export default QuizDetails;
