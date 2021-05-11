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
                url: "http://localhost:5000/api/contests",
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
        let time = new  Date(START);
        time = time.toLocaleString("en-SG");
        return time;
    }

    const EditQuiz = (id) => {
        history.push(`/quiz/${id}`)
    }


    const renderHeader = () => {
        let headerElement = ['ID', 'Course Code', 'Name', 'Start Time', 'End Time','action']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderPresent = () => {
        return contest && contest.map(({CODE,END,START,NAME,ID},index) => {
            let now = new Date();
            now = now.toISOString();
            let myDate = new Date(now)
            myDate.setDate(myDate.getDate() + parseInt(1));
            myDate.toISOString();
            let sdf = new  Date(myDate).toISOString();
            if ((now < START) && (sdf > START)) {
                return (
                    <tr key={ID}>
                        <td>{ID}</td>
                        <td>{CODE}</td>
                        <td>{NAME}</td>
                        <td>{convertTime(START)}</td>
                        <td>{convertTime(END)}</td>
                        <td className='opration'>
                        {localStorage.getItem('Role') === "Admin" ? <button className='button' onClick={() => {EditQuiz(ID)}}>Edit</button>:<div></div>}
                            <button className='button'>Details</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    const renderPast = () => {
        return contest && contest.map(({CODE,END,START,NAME,ID},index) => {
            let now = new Date();
            now = now.toISOString();
            if (now > START) {
                return (
                    <tr key={ID}>
                        <td>{index}</td>
                        <td>{CODE}</td>
                        <td>{NAME}</td>
                        <td>{convertTime(START)}</td>
                        <td>{convertTime(END)}</td>
                        <td className='opration'>
                        {localStorage.getItem('Role') === "Admin" ? <button className='button' onClick={() => {EditQuiz(ID)}}>Edit</button>:<div></div>}
                            <button className='button'>Details</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    const renderFuture = () => {
        return contest && contest.map(({CODE,END,START,NAME,ID},index) => {
            let now = new Date();
            now = now.toISOString();
            if (now < START) {
                return (
                    <tr key={ID}>
                        <td>{index}</td>
                        <td>{CODE}</td>
                        <td>{NAME}</td>
                        <td>{convertTime(START)}</td>
                        <td>{convertTime(END)}</td>
                        <td className='opration'>
                            {localStorage.getItem('Role') === "Admin" ? <button className='button' onClick={() => {EditQuiz(ID)}}>Edit</button>:<div></div>}
                            <button className='button'>Details</button>
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
                    url: "http://localhost:5000/api/create_contest",
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