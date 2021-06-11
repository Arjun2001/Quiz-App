import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ReactFontLoader from "react-font-loader";
import Navbar from '../../components/Navbar/Navbar'
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

const QuizDetails = ({ stud,swap }) => {
  console.log(stud)
  const classes = useStyles();
  
  const handleSubmit = (value) => {
    swap(value)
  };
  return (
    <div style={{ backgroundColor: "#FAE2E2" }}>
     
      <Navbar/>
      <br/>
      <br/>
      <ArrowBackIcon style={{margin:"0px 0px 0px 25px",borderRadius:"50%",background:"white",cursor:"pointer",fontSize:"2.5rem"}} onClick={()=>{window.history.back()}}></ArrowBackIcon>
      <br />
      <ReactFontLoader url="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&family=Roboto+Slab:wght@300;400;500&display=swap" />
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
                style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
              >
                {" "}
                ROLL NO
              </StyledTableCell>

              <StyledTableCell
                align="center"
                style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
              >
                {" "}
                NAME
              </StyledTableCell>

              <StyledTableCell
                align="center"
                style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
              >
                {" "}
                SCORE
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
              >
                {" "}
                MAX SCORE
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
              >
                {" "}
                DURATION
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
              >
                {" "}
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
                  style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
                >
                  {row.roll_no}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
                >
                  {row.username}
                </StyledTableCell>
                {row.published === 1? 
                <>
                {(parseInt((row.total/row.max_mark)*100))>=40 ?(<StyledTableCell
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "15px",color: "green", }}
                >
                  {row.total}
                </StyledTableCell>):(
                  <StyledTableCell
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "15px" ,color: "red",}}
                >
                  {row.total}
                </StyledTableCell>
                )}
                </>:<>
                <StyledTableCell
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "15px" ,color: "red",}}
                >
                  {"NP"}
                </StyledTableCell>
                </>}
                
                <StyledTableCell
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
                >
                  {row.max_mark}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ fontFamily: "Roboto Slab", fontSize: "15px" }}
                >
                  {row.time}
                </StyledTableCell>
               
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
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuizDetails;
