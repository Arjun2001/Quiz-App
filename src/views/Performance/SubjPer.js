import React from 'react';
import { Pie } from 'react-chartjs-2';
import Navbar from '../../components/Navbar/Navbar'
import ReactFontLoader from "react-font-loader";
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const data = {
  labels: ['Contest1 ', 'Contest2', 'Contest3', 'Contest4', 'Contest5', 'Contest 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132,0.5)',
        'rgba(54, 162, 235,0.5)',
        'rgba(255, 206, 86,0.5)',
        'rgba(75, 192, 192,0.5)',
        'rgba(153, 102, 255,0.5)',
        'rgba(255, 159, 64,0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1.25,
    },
  ],
};

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
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  
const SubjPer = () => {
    const classes = useStyles();

    return ( 
        <div >
            <Navbar/>
            <Grid container spaacing={4} >
            <Grid item xs={6}  >
           <div className='header'>
           <ReactFontLoader url="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&family=Roboto+Slab:wght@300;400;500&display=swap" />
      <div style={{fontStyle:"Roboto Slab",fontSize:"30PX",color:"brown",marginTop:"3%",marginBottom:"5%",marginLeft:"10%"}}>
        SUBJECT:  
      </div>
      
    </div>
    <Container maxWidth="sm">
    <Pie data={data}  /> 
    </Container>
    </Grid>
    <Grid item xs={6} >
    <Container maxWidth="md" style={{marginTop:"12%"}}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">CONTEST NAME</StyledTableCell>
            <StyledTableCell align="center">AVERAGE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <StyledTableRow>
              <StyledTableCell align="center">sdsa</StyledTableCell>
              <StyledTableCell align="center">435</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="center">sdsa</StyledTableCell>
              <StyledTableCell align="center">435</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell align="center">sdsa</StyledTableCell>
              <StyledTableCell align="center">435</StyledTableCell>
            </StyledTableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </Grid>
    </Grid>
        </div>
     );
}
 
export default SubjPer;