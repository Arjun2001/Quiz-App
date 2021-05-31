import { useState } from "react";
import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";

import "../../App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import CheckIcon from "@material-ui/icons/Check";
import ToggleButton from "@material-ui/lab/ToggleButton";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";

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

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const Markmodify = (d) => {
  const classes = useStyles();
  console.log("hi");
  console.log(d.q)
  const [mark, setmark] = useState("");
  const [submitview, setsubmitview] = useState(false);
  const [view, setview] = useState(true);

  

  const handleSubmit = () => {
    setview(false)
    setsubmitview(true);

    // setsubmit("Updated");
    const a=d.q.roll_no
    const b=d.q.question_no
    console.log(a)
    console.log(b)
    console.log(mark);

   
      axios
        .post("http://localhost:5000/api/addmark ", {
          a,b,mark

        })
        .then(function (response) {
          console.log(response.data);
        });
   
   
  };
  return (
    <div className={classes.quebox}>
      <div>Question {d.q.question_no}</div>
      <div>
        {/* <label>Question+{d.q[0].question_no}</label> */}
        <TextField
          disabled
          id="outlined-full-width"
          // label={"Question " + (d.d + 1)}
          fullWidth
          style={{ margin: 8 }}
          value={d.q.ques}
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
            value={d.q.type}
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
          {(d.q.type)=="MCQ"&&<div>
          
            <TextField
              disabled
              id="outlined-full-width"
              //   className={classes.textField}
              style={{ margin: 8, width: "35%" }}
              value={d.q.answer}

              // onChange={(e) => setans(e.target.value)}
              InputProps={{
                shrink: true,

                classes: { notchedOutline: classes.specialOutline },
              }}
              margin="normal"
              variant="outlined"
            />
          </div>}
          {(d.q.type)=="Descriptive"&&<div>
              
            <TextField
              disabled
              id="outlined-full-width"
              label="Answer"
              multiline
              fullWidth
              style={{ margin: 8 }}
              value={d.q.answer}
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
              
              style={{ margin: 8, width: "20%" }}
              value={d.q.mark}
              onChange={(e) => setmark(e.target.value)}
              InputProps={{
                shrink: true,

                classes: { notchedOutline: classes.specialOutline },
              }}
              margin="normal"
              variant="outlined"
            />
          </div>
        {!(d.q.mark) && (view)&&(
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
        {(d.q.mark)&&(
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
