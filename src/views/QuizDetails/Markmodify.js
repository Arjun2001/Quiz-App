import { useState } from "react";
import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import Swal from 'sweetalert2'


import "../../App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";


const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto Slab"].join(","),
    fontWeight: 500,
    fontSize: 18,
  },
});
const useStyles = makeStyles((theme) => ({
  quebox: {
    marginLeft: "15%",
    marginRight: "15%",
    backgroundColor: "#9ddfd3",
    padding: "5% 5% 5% 5%",
    borderRadius: "20px",
    marginBottom: "2%",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    fontFamily: "Roboto Slab !important",
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  specialOutline: {
    borderColor: "#548e87",
    borderWidth: 3,
  },
  radiostyle: {
    flexDirection: "row !important",
  },

  radioopt: {
    marginLeft: "1%",

    marginRight: "5%",
  },
  button: {
    marginLeft: "91%",
    borderRadius: "20px 20px 20px 20px",
    fontSize: "110%",
    backgroundColor: "#28b5b5",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    border: "2px solid #548e87",
  },
}));


const Markmodify = ({item,index,roll,id}) => {
  const classes = useStyles();
  const [mark,setmark] = useState(0)
  const [submitview, setsubmitview] = useState(false);
  const [view, setview] = useState(true);

  

  const handleSubmit = () => {
    setview(false)
    setsubmitview(true);
    try {
        axios ({
          method:'post',
          url: "http://35.225.238.45:5000/api/update_mark",
          headers: {
              "Authorization":`Bearer ${localStorage.getItem('Token')}`,
              "Content-Type": "application/json"
          },
          data: {
              mark:mark,roll:roll,id:id
          }
      }).then(res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          text: res.data
        })
      })
  }catch (err) {
    Swal.fire({
      icon: 'error',
      text: err
    })
  }
   
  };
  return (
    <div className={classes.quebox}>
      <div>Question {index+1}</div>
      <div>
        {/* <label>Question+{d.q[0].question_no}</label> */}
        <TextField
          disabled
          id="outlined-full-width"
          // label={"Question " + (d.d + 1)}
          fullWidth
          style={{ margin: 8 }}
          value={item.question}
          // onChange={(e) => setquestion(e.target.value)}
          InputProps={{
            shrink: true,
            
            classes: { notchedOutline: classes.specialOutline },
          }}
          margin="normal"
          variant="outlined"
        />{" "}
        <div>
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            value={item.q_type}
            className={classes.radiostyle}
          >
            <ThemeProvider theme={theme}>
              <FormControlLabel
                value="MCQ"
                control={<Radio />}
                label="MCQ"
                className={classes.radioopt}
              />

              <FormControlLabel
                value="Descriptive"
                control={<Radio />}
                label="Descriptive"
                className={classes.radioopt}
              />
              <FormControlLabel
                value="TandF"
                control={<Radio />}
                label="True or False"
                className={classes.radioopt}
              />
            </ThemeProvider>
          </RadioGroup>
        </div>
          {(item.q_type)=="MCQ"&&<div>
          
            <TextField
              disabled
              id="outlined-full-width"
              //   className={classes.textField}
              style={{ margin: 8, width: "35%" }}
              value={item.user_answer}

              // onChange={(e) => setans(e.target.value)}
              InputProps={{
                shrink: true,

                classes: { notchedOutline: classes.specialOutline },
              }}
              margin="normal"
              variant="outlined"
            />
          </div>}
          {(item.q_type)=="TandF"&&<div>
          
            <TextField
              disabled
              id="outlined-full-width"
              //   className={classes.textField}
              style={{ margin: 8, width: "35%" }}
              value={item.user_answer}

              // onChange={(e) => setans(e.target.value)}
              InputProps={{
                shrink: true,

                classes: { notchedOutline: classes.specialOutline },
              }}
              margin="normal"
              variant="outlined"
            />
          </div>}
          {(item.q_type)=="Descriptive"&&<div>
              
            <TextField
              disabled
              id="outlined-full-width"
              label="Answer"
              multiline
              fullWidth
              style={{ margin: 8 }}
              value={item.user_answer}
              InputProps={{
                shrink: true,

                classes: { notchedOutline: classes.specialOutline },
              }}
              rows={4}
              margin="normal"
              variant="outlined"
            />
          </div>}
          <div>
            <TextField
              
              id="outlined-full-width"
              disabled = {item.q_type === "Descriptive" ? false: true}
              style={{ margin: 8, width: "20%" }}
              onChange={(e) => setmark(e.target.value)}
              defaultValue={item.q_type === "Descriptive" ? 0: item.point}
              InputProps={{
                shrink: true,
                classes: { notchedOutline: classes.specialOutline },
              }}
              margin="normal"
              variant="outlined"
            />
          </div>
        {(item.q_type === "Descriptive") && (view)&&(
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Update
          </Button>
        )}
        {(item.q_type !== "Descriptive")&&(
          <Button
            variant="contained"
            color="primary"
            // onClick={handleSubmit}
            className={classes.button}
            endIcon={<CheckIcon />}
          >
            Updated
          </Button>
        )}
        {(submitview)&&(
          <Button
            variant="contained"
            color="primary"
            // onClick={handleSubmit}
            className={classes.button}
            endIcon={<CheckIcon />}
          >
            Updated
          </Button>
        )}
      </div>
    </div>
  );
};

export default Markmodify;
