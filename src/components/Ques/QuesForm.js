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

const QuesForm = (d) => {
  const classes = useStyles();
  console.log(d.d);
  const [questions, setquestions] = useState(false);
  const [question, setquestion] = useState(false);
  const [anstype, setanstype] = useState("");
  const [multipleanscnt, setmultipleanscnt] = useState(false);
  const [choice, setchoice] = useState("");
  const [ans, setans] = useState("");
  const [nos, setnos] = useState("0");
  const [visiblenos, setvisiblenos] = useState(true);
  const [visibleans, setvisibleans] = useState(false);
  const [nosarr, setnosarr] = useState([]);
  const [options, setoptions] = useState([]);
  const [mark, setmark] = useState("");
  const [selected, setSelected] = useState(false);
  const [submit, setsubmit] = useState("Add");
  const [submitview, setsubmitview] = useState(false);
  const [torf, settorf] = useState("");
  const [all, setall] = useState([{}]);
  const [a, seta] = useState(true);
  const arr1 = [];
  const arr2 = [];
  const handleChange = () => {
    console.log(nos);
    for (var i = 0; i < nos; i++) {
      arr1.push(i);
      console.log("hi ");
      setnosarr(arr1);
    }
    console.log(nosarr);
    setvisiblenos(false);
    setvisibleans(true);
    setquestions(true);
  };

  const handleSubmit = () => {
    setsubmitview(true);
    setsubmit("Added");
    console.log(nos);
    console.log(question);
    console.log(choice);
    if (choice == "MCQ") {
      console.log(options);
      console.log(anstype);
    }
    if (choice == "TandF") {
      console.log(torf);
    }
    if (choice == "MCQ" || choice == "Descriptive") {
      console.log(ans);
    }

    console.log(mark);

    if (choice == "MCQ") {
      axios
        .post("http://localhost:5000/api/addques ", {
          choice,
          question,
          options,
          anstype,
          ans,
          mark,
        })
        .then(function (response) {
          console.log(response.data);
        });
    }
    if (choice == "Descriptive") {
      axios
        .post("http://localhost:5000/api/addques ", {
          choice,
          question,
          ans,
          mark,
        })
        .then(function (response) {
          console.log(response.data);
        });
    }
    if (choice == "TandF") {
      axios
        .post("http://localhost:5000/api/addques ", {
          choice,
          question,
          mark,
          torf,
        })
        .then(function (response) {
          console.log(response.data);
        });
    }
  };
  return (
    <div className={classes.quebox}>
      <div>
        <TextField
          id="outlined-full-width"
          label={"Question " + (d.d + 1)}
          fullWidth
          style={{ margin: 8 }}
          onChange={(e) => setquestion(e.target.value)}
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
        {choice == "MCQ" ? (
          <div>
            {visiblenos && (
              <TextField
                id="outlined-full-width"
                label="No of options"
                style={{ margin: 8 }}
                onBlur={(e) => setnos(e.target.value)}
                InputProps={{
                  shrink: true,

                  classes: { notchedOutline: classes.specialOutline },
                }}
                margin="normal"
                variant="outlined"
              />
            )}
            {visiblenos && (
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
            )}
          </div>
        ) : (
          <p></p>
        )}
        {choice == "Descriptive" ? (
          <div>
            <TextField
              id="outlined-full-width"
              label="Answer"
              multiline
              fullWidth
              style={{ margin: 8 }}
              onChange={(e) => setans(e.target.value)}
              InputProps={{
                shrink: true,

                classes: { notchedOutline: classes.specialOutline },
              }}
              rows={4}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-full-width"
              label="Mark"
              style={{ margin: 8, width: "20%" }}
              onChange={(e) => setmark(e.target.value)}
              InputProps={{
                shrink: true,

                classes: { notchedOutline: classes.specialOutline },
              }}
              margin="normal"
              variant="outlined"
            />
          </div>
        ) : (
          <p></p>
        )}
        {choice == "TandF" ? (
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
                    // value={age}
                    // onChange={handleChange}
                    onChange={(e) => {
                      settorf(e.target.value);
                    }}
                  >
                    <MenuItem value=""></MenuItem>
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
                style={{ margin: 8, width: "20%" }}
                onChange={(e) => setmark(e.target.value)}
                InputProps={{
                  shrink: true,

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
        {choice == "MCQ" &&
          nosarr &&
          questions &&
          nosarr.map((index) => {
            return (
              <div>
                
                <TextField
                  id="outlined-full-width"
                  label={"Option" + (index + 1)}
                  //   className={classes.textField}
                  style={{ margin: 8, width: "35%" }}
                  // onBlur={(e)=>AddQues(e,index)}
                  onBlur={(e) => setoptions((arr) => [...arr, e.target.value])}
                  InputProps={{
                    shrink: true,

                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </div>
            );
          })}
        {choice == "MCQ" ? (
          <div>
            {visibleans && (
              <div>
                <RadioGroup
                  aria-label="quiz"
                  name="quiz"
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
                  //   className={classes.textField}
                  style={{ margin: 8, width: "35%" }}
                  onChange={(e) => setans(e.target.value)}
                  InputProps={{
                    shrink: true,

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
                //   className={classes.textField}
                style={{ margin: 8, width: "20%" }}
                onChange={(e) => setmark(e.target.value)}
                InputProps={{
                  shrink: true,

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
        {!submitview && (
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
        )}
      </div>
    </div>
  );
};

export default QuesForm;
