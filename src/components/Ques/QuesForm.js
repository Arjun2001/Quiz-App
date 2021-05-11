import { useState } from "react";
import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import Swal from 'sweetalert2';
import {useHistory} from "react-router-dom"

import "../../App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import CheckIcon from "@material-ui/icons/Check";
import ToggleButton from "@material-ui/lab/ToggleButton";
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
  head2: {
    margin:"2% 44%",
    width:"15%",
    borderRadius: "20px 20px 20px 20px",
    fontSize:"110%",
    backgroundColor: "#28b5b5",
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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

const QuesForm = (d) => {
  const history = useHistory();
  const classes = useStyles();
  const [questions, setquestions] = useState(false);
  const [anstype, setanstype] = useState("");
  const [choice, setchoice] = useState("");
  const [nos, setnos] = useState("0");
  const [visibleans, setvisibleans] = useState(false);
  const [nosarr, setnosarr] = useState([]);
  const [selected, setSelected] = useState(false);
  const arr1 = [];

  const handleChange = () => {
    console.log(nos);
    for (var i = 0; i < nos; i++) {
      arr1.push(i);
      setnosarr(arr1);
    }
    setvisibleans(true);
    setquestions(true);
  };


  const submit1 = () => {
    const contest_id = window.location.pathname.substring(6)
    var opt_index = 0
    var choice_index = 0
    var ans_type_index = 0
    for (let i = 0 ; i<d.tot;i++) {
      let ques = {}
      ques["question"] = document.getElementsByName('questions')[i].value
      for (let k=0;k<3;k++) {
        if (document.getElementsByName('choice')[choice_index].checked) {
          ques["choice"] = document.getElementsByName('choice')[choice_index].value
        }
        choice_index += 1
      }
      if (ques["choice"] === "MCQ") {
        ques["num_opt"] = document.getElementsByName('num_opt')[i].value
        ques["options"] = []
        for (let j=0;j<ques["num_opt"];j++) {
          ques["options"].push(document.getElementsByName('options')[opt_index].value)
          opt_index += 1
        }
        for (let m=0;m<2;m++) {
          if (document.getElementsByName('ans_type')[ans_type_index].checked) {
            ques["ans_type"] = document.getElementsByName('ans_type')[ans_type_index].value
          }
          ans_type_index += 1
        }
      }
      ques["answer"] = document.getElementsByName('answer')[i].value
      ques["mark"] = document.getElementsByName('mark')[i].value
      console.log(ques,"se")
      let temp = JSON.stringify(ques)
      try {
        axios ({
            method:'post',
            url: "http://localhost:5000/api/add_questions",
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
              },
              data: {question:temp,id:contest_id}
        }).then(res => {
            console.log(res.data)
            Swal.fire({
              icon: 'success',
              text: "Quiz Questions Added Successfully"
              }).then(results => {
                history.push("/home")
              })
        })
    }catch (err) {
        console.log(err);
    }
    }
  }

  const check = () => {
    if (d.d === d.tot-1) {
      return <Button
      variant="contained"
      color="primary"
      onClick={submit1}
      className={classes.head2}
      endIcon={<SaveAltIcon />}
    >
      Save all Questions
    </Button>
    }
    else {
      return 
    }
  }

  return (
    <form style={{boxShadow:"none",padding:"0px"}}>
    <div className={classes.quebox}>
      <div>
        <TextField
          id="outlined-full-width"
          label={"Question " + (d.d + 1)}
          fullWidth
          name="questions"
          style={{ margin: 8 }}
          InputProps={{
            shrink: 1,

            classes: { notchedOutline: classes.specialOutline },
          }}
          margin="normal"
          variant="outlined"
        />{" "}
        <div>
          <RadioGroup
            aria-label="quiz"
            name="choice"
            value={choice}
            onChange={(e) => setchoice(e.target.value)}
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
        {choice === "MCQ" ? (
          <div>
              <TextField
                id="outlined-full-width"
                label="No of options"
                name="num_opt"
                style={{ margin: 8 }}
                onBlur={(e) => setnos(e.target.value)}
                InputProps={{
                  shrink: 1,

                  classes: { notchedOutline: classes.specialOutline },
                }}
                margin="normal"
                variant="outlined"
              />
              <ToggleButton
                value="check"
                selected={selected}
                style={{ marginTop: "1%" }}
                onChange={() => {
                  setSelected(!selected);
                }}
                onClick={handleChange}
              >
                <CheckIcon />
              </ToggleButton>
          </div>
        ) : (
          <p></p>
        )}
        {choice === "Descriptive" ? (
          <div>
            <TextField
              id="outlined-full-width"
              label="Answer"
              name="answer"
              multiline
              fullWidth
              style={{ margin: 8 }}
              InputProps={{
                shrink: 1,

                classes: { notchedOutline: classes.specialOutline },
              }}
              rows={4}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-full-width"
              label="Mark"
              name="mark"
              style={{ margin: 8, width: "20%" }}
              InputProps={{
                shrink: 1,

                classes: { notchedOutline: classes.specialOutline },
              }}
              margin="normal"
              variant="outlined"
            />
          </div>
        ) : (
          <p></p>
        )}
        {choice === "TandF" ? (
          <div>
            {
              
              <div>
                
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Answer
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="answer"
                  >
                    <MenuItem defaultValue=""></MenuItem>
                    <MenuItem value="True">True</MenuItem>
                    <MenuItem value="False">False</MenuItem>
                  </Select>
                </FormControl>
              </div>
            }
            {
              
              <TextField
                id="outlined-full-width"
                label="Mark"
                name= "mark"
                style={{ margin: 8, width: "20%" }}
                InputProps={{
                  shrink: 1,

                  classes: { notchedOutline: classes.specialOutline },
                }}
                margin="normal"
                variant="outlined"
              />
            }
          </div>
        ) : (
          <p></p>
        )}
        {choice === "MCQ" &&
          nosarr &&
          questions &&
          nosarr.map((index) => {
            return (
              <div>
                
                <TextField
                  id="outlined-full-width"
                  label={"Option" + (index + 1)}
                  name="options"
                  style={{ margin: 8, width: "35%" }}
                  InputProps={{
                    shrink: 1,

                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            );
          })}
        {choice === "MCQ" ? (
          <div>
            {visibleans && (
              <div>
                <RadioGroup
                  aria-label="quiz"
                  name="ans_type"
                  value={anstype}
                  onChange={(e) => setanstype(e.target.value)}
                  className={classes.radiostyle}
                >
                  <FormControlLabel
                    value="SingleAns"
                    control={<Radio />}
                    label="Single Answer"
                    className={classes.radioopt}
                  />
                  <FormControlLabel
                    value="MulAns"
                    control={<Radio />}
                    label="Multiple Answer"
                    className={classes.radioopt}
                  />
                </RadioGroup>
              </div>
            )}
            {anstype && (
              <div>
                
                <TextField
                  id="outlined-full-width"
                  label="Answer"
                  name="answer"
                  style={{ margin: 8, width: "35%" }}
                  InputProps={{
                    shrink: 1,

                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            )}
            {
              
              <TextField
                id="outlined-full-width"
                label="Mark"
                name="mark"
                style={{ margin: 8, width: "20%" }}
                InputProps={{
                  shrink: 1,

                  classes: { notchedOutline: classes.specialOutline },
                }}
                margin="normal"
                variant="outlined"
              />
            }
          </div>
        ) : (
          <p></p>
        )}
        {/* {!submitview && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
            startIcon={<AddIcon />}
          >
            {submit}
          </Button>
        )}
        {submitview && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
            endIcon={<CheckIcon />}
          >
            {submit}
          </Button>
        )} */}
      </div>
    </div>
    {check()}
  </form>
  );
};

export default QuesForm;
