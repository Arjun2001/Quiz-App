import useFetch from "./useFetch";
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
const Markfetch = ({c}) => {
  const classes = useStyles();

    const [state, setstate] = useState([])
var d = window.location.pathname.split("/")[2];

const axios = require('axios')
useEffect(() => {
    console.log("sadsa")
    axios.get('http://localhost:5000/api'+c, {
    params: {
        d
    }
  })
  .then(function (response) {
      setstate(response.data)

    console.log(response);
  })
    
}, [])

const handleSubmit=()=>{
    window.location="/details"
}
  
    // const { error, isPending, data: stud } = useFetch('http://localhost:5000/api/'+c)
    console.log(c,"vghbj")
    
    return (  
        
        <div>
          <Typography variant="h4"  style={{color:"black",marginTop:"2%",marginBottom:"1.5%",fontWeight:"bold"}}>
          UPDATE MARKS
          </Typography>
            {console.log(state.length===0)}
        {(state.length) ? state.map((i)=>{ return <Markmodify q={state,i}/>}):<div></div>}
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
