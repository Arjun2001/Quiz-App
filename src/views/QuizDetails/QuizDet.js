import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuizDetails from "./QuizDetails"
import Loader from '../../components/Quiz Host/Loader'
import Markfetch from './Markfetch'

const QuizDet = ({c}) => {

    const [loading, setLoading] = useState(true);
    const [res, setRes] = useState()
    const [change, setChange] = useState(true)
    const [roll, setRoll] = useState('')
    const [ans, setAns] = useState([])
    
    const swap = (val) => {
        setRoll(val)
        setChange(!change)
        res.map(item => {
            if (item.roll_no === val) {
                setAns(JSON.parse(item.answer))
                console.log(item.answer)
            }
        })
    }

    useEffect(() => {
        getData();
      },[1])

    const getData = () => {
        try {
            axios ({
                method:'post',
                url: "http://35.225.238.45:5000/api/attended_students",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                },
                data: {
                    id:window.location.pathname.substring(9)
                }
            }).then(res => {
                setRes(res.data)
                setLoading(false)
            })
        }catch (err) {
            console.log(err);
        }
    }

    return (  
        <div>
            {loading && <Loader />}  
            { !loading && change === true && <QuizDetails stud={res} swap={swap} /> }
            { !loading && change === false && <Markfetch stud={ans} roll={roll} id={window.location.pathname.substring(9)}/> }
        </div>
    );
}
 
export default QuizDet
