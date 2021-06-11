import { useState,useEffect } from "react";
import CheckIcon from "@material-ui/icons/Check";
import { Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

// import Summa from "./Summa";
import Markmodify from "./Markmodify";
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: "41%",
    borderRadius: "20px 20px 20px 20px",
    fontSize: "110%",
    backgroundColor: "#28b5b5",
  },
}))
const Markfetch = ({stud,roll,id}) => {
const classes = useStyles();
const handleSubmit=()=>{
  try {
    axios ({
      method:'post',
      url: "http://35.225.238.45:5000/api/update_published",
      headers: {
          "Authorization":`Bearer ${localStorage.getItem('Token')}`,
          "Content-Type": "application/json"
      },
      data: {
            roll:roll,id:id
      }
      }).then(res => {
        console.log(res)
        window.location=`/details/${id}`
      })
      }catch (err) {
      console.log(err)
    }
}
    
    return (  
        
        <div>
          <Typography variant="h4"  style={{color:"black",marginTop:"2%",marginBottom:"1.5%",fontWeight:"bold"}}>
          UPDATE MARKS
          </Typography>
        {(stud.length) ? stud.map((i,index)=>{ return <Markmodify item={i} index={index} roll={roll} id={id}/>}):<div></div>}
        <div>
        <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
            endIcon={<CheckIcon />}
            style={{marginBottom:"1.5%"}}
          >
            GO BACK TO VIEW MARKS
          </Button>
        </div>
        </div>
    );
}

 
export default Markfetch
