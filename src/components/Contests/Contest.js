import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import './Contest.css'
import {useHistory} from "react-router-dom";

import Navbar from '../Navbar/Navbar'


const Table = () => {
    const [contest, setContest] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            await axios ({
                method:'post',
                url: "http://35.225.238.45:5000/api/contests",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                },
                data: {
                    code:window.location.pathname.substring(9)
                }
            }).then(res => {
                
                setContest(res.data)
            })
        }catch (err) {
            console.log(err);
        }
    }
    

    const convertTime = (START) => {
        console.log()
        const time1 = new Date(START).toLocaleTimeString('en',
                 { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
        return START.substring(0,10) + ", " + time1;
    }

    const EditQuiz = (id) => {
        history.push(`/quiz/${id}`)
    }

    const Details = (id) => {
        history.push(`/stats/${id}`)
    }

    const details_p = (id) => {
        history.push(`/details/${id}`)
    }
    
    const Average = (id) => {
        history.push(`/performance/${id}`)
    }
                // hast ot chenges when linked with average

    const joinQuiz = (e) => {
        try {
            axios ({
                method:'post',
                url: "http://35.225.238.45:5000/api/contest_details",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                  },
                  data: {
                    id:e,roll_no:localStorage.getItem('Roll_no')
                }
              }).then(res => {
                let time = convertTime1(new Date());
                let st_time = res.data.data[0].START
                let end_time = res.data.data[0].END
                console.log(res.data)
                if (res.data.attended[0]['count'] >= 1) {
                    Swal.fire({
                        icon: 'error',
                        text: "You have already attempted the Quiz!"
                        })
                }
                
                else if ( st_time <= time && end_time > time ) {
                    Swal.fire({
                        title: 'Enter the passcode',
                        html: `<input type="password" id="pin" class="swal2-input">`,
                        confirmButtonText: 'Join',
                        focusConfirm: false,
                        preConfirm: () => {
                          const pin = Swal.getPopup().querySelector('#pin').value
                          if (!pin) {
                            Swal.showValidationMessage(`Please enter the passcode`)
                          }
                          return pin
                        }
                      }).then((result) => {
                          console.log(result , res.data.data[0].passcode)
                        if (result.value === res.data.data[0].passcode) {
                            Swal.fire({
                            icon: 'success',
                            text: "Passcode is correct"
                            }).then(results => {
                                history.push(`/join/${e}`)
                            })
                        } else {
                            Swal.fire({
                            icon: 'error',
                            text: "Passcode is incorrect"
                            })
                        }
                    })
                } else {
                    Swal.fire({
                        icon: 'info',
                        text: "Contest has not started yet"
                        })
                }
              })
            }catch (err) {
                console.log(err);
            }
    }


    const renderHeader = () => {
        let headerElement = ['ID', 'Course Code', 'Name', 'Start Time', 'End Time','action']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const convertTime1 = (time1) => {
        var date = new Date(time1).toLocaleString();
        date = date.split(',')
        var time = date[1];
        var mdy = date[0];
  
        // We then parse  the mdy into parts
        mdy = mdy.split('/');
        var day = parseInt(mdy[0]);
        if (day <= 9) {day = "0"+day}
        var month = parseInt(mdy[1]);
        if (month <= 9) {month = "0"+month}
        var year = parseInt(mdy[2]);
  
        // Putting it all together
        var formattedDate = year + '-' + month + '-' + day + 'T' + time.substring(1);
        return formattedDate
      }

    const renderPresent = () => {
        return contest && contest.map(({CODE,END,START,NAME,ID},index) => {
            
            if ((convertTime1(new Date()) >= START) && (convertTime1(new Date()) < END)) {
                return (
                    <tr key={ID}>
                        <td>{ID}</td>
                        <td>{CODE}</td>
                        <td>{NAME}</td>
                        <td>{convertTime(START)}</td>
                        <td>{convertTime(END)}</td>
                        <td className='opration'>
                        {localStorage.getItem('Role') === "Admin" ? <button className='button' onClick={() => {EditQuiz(ID)}}>Edit</button>:<button className='button' onClick={() => {joinQuiz(ID)}}>Join</button>}
                        </td>
                    </tr>
                )
            }
        })
    }

    const renderPast = () => {
        return contest && contest.map(({CODE,END,START,NAME,ID},index) => {
            let now = convertTime1(new Date())
            // now = (new Date(now).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}))
            
            if (now > START) {
                return (
                    <tr key={ID}>
                        <td>{ID}</td>
                        <td>{CODE}</td>
                        <td>{NAME}</td>
                        <td>{convertTime(START)}</td>
                        <td>{convertTime(END)}</td>
                        <td className='opration'>
                        {localStorage.getItem('Role') === "Admin" ? <><button className='button' onClick={() => {EditQuiz(ID)}}>Edit</button><button className='button' onClick={() => {details_p(ID)}}>Details</button></>:<div></div>}
                            {localStorage.getItem('Role') === "Student" ?<button className='button' onClick={() => {Details(ID)}}>Details</button> : <button className='button' onClick={() => {Average(ID)}}>Average</button>}
                        </td>
                    </tr>
                )
            }
        })
    }

    const renderFuture = () => {
        return contest && contest.map(({CODE,END,START,NAME,ID},index) => {
            let now = convertTime1(new Date())
            // now = (new Date(now).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}))
            console.log(now < START,now,START)
            if (now < START) {
                return (
                    <tr key={ID}>
                        <td>{ID}</td>
                        <td>{CODE}</td>
                        <td>{NAME}</td>
                        <td>{convertTime(START)}</td>
                        <td>{convertTime(END)}</td>
                        <td className='opration'>
                            {localStorage.getItem('Role') === "Admin" ? <button className='button' onClick={() => {EditQuiz(ID)}}>Edit</button>:<div></div>}
                        </td>
                    </tr>
                )
            }
        })
    }

    const create = () => {
        Swal.fire({
            title: 'Create Contest',
            html: `<label for="name">Contest Name</label><input type="text" id="name" class="swal2-input" placeholder="Contest Name">
            <label for="start">Start Time</label><input type="datetime-local" id="start" class="swal2-input" placeholder="Start Time">
            <label for="end">End Time</label><input type="datetime-local" id="end" class="swal2-input" placeholder="End Time">
            <label for="passcode">Passcode</label><input type="text" id="passcode" class="swal2-input" placeholder="Passcode">`,
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
                        code:window.location.pathname.substring(9),
                        name:result.value.name,
                        start:result.value.start,
                        end:result.value.end,
                        passcode:result.value.passcode
                    }
                }).then(res => {
                    getData();
                    Swal.fire({
                        icon: 'success',
                        text: "Contest Created successfully"
                    })
                })
            }catch (err) {
                console.log(err);
            }
          })
    }

    return (
        <>
        <Navbar />
        <div style={{display:"flex", flexDirection:'column', margin:"50px 75px"}}>
            {localStorage.getItem('Role') === "Admin" ?<Button variant="primary" size="lg" block onClick={create}>
                CREATE CONTEST
            </Button> : <div></div>}
            <h4 id='title'>Present Contests</h4>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderPresent()}
                </tbody>
            </table>
            <h4 id='title'>Future Contests</h4>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderFuture()}
                </tbody>
            </table>
            <h4 id='title'>Past Contests</h4>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderPast()}
                </tbody>
            </table>
        </div>
        </>
    )
}


export default Table