import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useState } from "react";
import ReactFontLoader from 'react-font-loader';
import CheckIcon from '@material-ui/icons/Check';
import {
  Button
} from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar'
import QuesForm from'../../components/Ques/QuesForm'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
  head: {
    margin:"0% 45%",
  },
  head1: {
    margin:"2% 46%",
    borderRadius: "20px 20px 20px 20px",
    fontSize:"110%",
    backgroundColor: "#28b5b5",
  },
  head2: {
    margin:"2% 44%",
    width:"15%",
    borderRadius: "20px 20px 20px 20px",
    fontSize:"110%",
    backgroundColor: "#28b5b5",
  },
}));

const QuizQuestions = () => {
  
    const classes = useStyles();
    const [quecount, setquecount] = useState(0);
    const [quecount1, setquecount1] = useState([]);
    const [visible,setvisible]=useState(false)
    const arr=[]
    
    const handleSubmit=()=>{
        console.log(quecount);
        for(var i=0;i<quecount;i++){
            arr.push(i)
            setquecount1(arr)
        }
        
        console.log(quecount1)
        setvisible(true)
    }
    // const i=0
    // const handleSubmit1=()=>{
    //     console.log(quecount-1);
    //     setcount(i)
    //     console.log(count)
    //     setvisible(true)
    // }
    
    return ( 
    <div style={{backgroundColor:"#dbf6e9"}}>
        <Navbar/> 
        <ReactFontLoader url="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&family=Roboto+Slab:wght@300;400;500&display=swap" />

        <form style={{boxShadow:'none'}}>
          <div style={{fontWeight:"500",fontSize:"2.5rem",fontFamily:"Roboto Slab",textAlign:"center",marginBottom:"15px"}}>
        Total Questions</div>
        <TextField
          className={classes.head}
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={(e) => setquecount(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.head1}
          endIcon={<CheckIcon />}
        >
          OK
        </Button>
        </form>
        {console.log(arr)}
        {quecount1 && visible &&(quecount1.map((index)=>{
        
          return <QuesForm d={index} tot={quecount}/> 

        }))}
    </div>
    );
}
 
export default QuizQuestions;