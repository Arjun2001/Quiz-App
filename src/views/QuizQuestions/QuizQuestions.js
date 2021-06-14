import React ,{ useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import ReactFontLoader from 'react-font-loader';
import CheckIcon from '@material-ui/icons/Check';
import {Button} from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar'
import QuesForm from'../../components/Ques/QuesForm'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios'
import Swal from 'sweetalert2'

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
    const [contest_details,setContestDetails] = useState([])
    const [ stored,setStored ] = useState(0)
    const arr=[]

    useEffect(() => {
      
      const contest_id = window.location.pathname.substring(6)
      try {
          axios ({
              method:'post',
              url: "http://35.225.238.45:5000/api/contest_details",
              headers: {
                  "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                  "Content-Type": "application/json"
                },
                data: {
                  id:contest_id
              }
          }).then(res => {
            setStored(res.data.check[0]["count(contest)"])
            console.log("comtest details :,", res.data.data[0])
            setContestDetails(res.data.data[0])
          })
      }catch (err) {
          console.log(err);
      }
    },[1])
    
    const handleSubmit=()=>{
        console.log(quecount);
        for(var i=0;i<quecount;i++){
            arr.push(i)
            setquecount1(arr)
        }
        
        console.log(quecount1)
        setvisible(true)
    }
    const goBack =() => {
      window.history.back();
    }

    const convertTime = (da) => {
      let date = new Date(da);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate()-1;

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        date = (year+'-' + month + '-'+dt);
      const time2 = new Date(da).toLocaleTimeString('en',
                 { timeStyle: 'short', hour12: false, timeZone: 'UTC' });

      // Putting it all together
      var formattedDate = date + 'T' + time2;
      return formattedDate
    }

    const deleteContest = () => {
      const contest_id = window.location.pathname.substring(6)
      Swal.fire({
        title: 'Are you sure to delete the contest?',
        showDenyButton: true,
        denyButtonText: `Yes`,
        confirmButtonText: `No`,
      }).then((result) => {
        if (result.isDenied) {
          try {
            axios ({
                method:'post',
                url: "http://35.225.238.45:5000/api/delete_contest",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                  },
                  data: {
                    id:contest_id
                }
              }).then(res => {
                Swal.fire('Deleted!', '', 'success').then(result => {
                window.history.back();
              })
              })
            }catch (err) {
                console.log(err);
            }
        } else if (result.isConfirmed) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
    }
      
    const create = () => {
      Swal.fire({
          title: 'Create Contest',
          html: `<label for="name">Contest Name</label><input type="text" id="name" class="swal2-input" placeholder="Contest Name" value=${contest_details.NAME}>
          <label for="start">Start Time</label><input type="datetime-local" id="start" class="swal2-input" value =${convertTime(contest_details.START)}>
          <label for="end">End Time</label><input type="datetime-local" id="end" class="swal2-input" placeholder="End Time" value=${convertTime(contest_details.END)}>
          <label for="passcode">Passcode</label><input type="text" id="passcode" class="swal2-input" placeholder="Passcode" value=${contest_details.passcode}>`,
          confirmButtonText: 'Submit',
          focusConfirm: false,
          preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value
            const start = Swal.getPopup().querySelector('#start').value
            const end = Swal.getPopup().querySelector('#end').value
            const passcode = Swal.getPopup().querySelector('#passcode').value
            if (!name || !start || !end || !passcode) {
              Swal.showValidationMessage(`Please enter all the details`)
            }
            return { name: name, start: start, end: end , passcode: passcode}
          }
        }).then((result) => {
          try {
              axios ({
                  method:'post',
                  url: "http://35.225.238.45:5000/api/create_contest",
                  headers: {
                      "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                      "Content-Type": "application/json"
                    },
                    data: {
                      id:contest_details.ID,
                      name:result.value.name,
                      start:result.value.start,
                      end:result.value.end,
                      passcode:result.value.passcode
                  }
              }).then(res => {
                  Swal.fire({
                      icon: 'success',
                      text: res.data
                  })
              })
          }catch (err) {
              console.log(err);
          }
        })
  }
    
    return ( 
    <div style={{backgroundColor:"#dbf6e9"}}>
        
        <Navbar/> 
        <ReactFontLoader url="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&family=Roboto+Slab:wght@300;400;500&display=swap" />

        <form style={{boxShadow:'none'}}>
          <ArrowBackIcon style={{margin:"25px 0px 0px 25px",borderRadius:"50%",background:"white",cursor:"pointer",fontSize:"2.5rem"}} onClick={goBack}></ArrowBackIcon>
          <div style ={{display: "flex",flexDirection:"column",justifyContent: "space-evenly",margin: "0 auto",width:"265px",height:"100px"}}>
          <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={deleteContest}
        >
          Delete Contest
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditIcon />}
          onClick={create}
        >
          Edit Contest
        </Button>
          </div>
        {stored ===0 ? <div>
          <hr></hr>
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
        </div>
        :
        <div style={{fontWeight:"500",fontSize:"2.5rem",fontFamily:"Roboto Slab",textAlign:"center",marginBottom:"15px"}}><h1>Questions have been uploaded!!</h1>
        <div >
        Total Questions: {stored}</div>
        {console.log(contest_details)}</div>}
        </form>
        {quecount1 && visible &&(quecount1.map((index)=>{
        
          return <QuesForm d={index} tot={quecount}/> 

        }))}
    </div>
    );
}
 
export default QuizQuestions;