import Navbar from '../../components/Navbar/Navbar'
import React, { useState, useEffect } from 'react'
import { Bar} from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import ReactFontLoader from "react-font-loader";
import Loader from '../../components/Quiz Host/Loader';
import axios from 'axios'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const Performance = () => {
  const[load,setLoad] = useState(true)
  const [data1, setData] = useState({})
  const id = window.location.pathname.substring(13);
  const getFetch = () => {
    axios ({
      method:'post',
      url: `http://localhost:5000/api/contest_avg/${id}`,
      headers: {
          "Authorization":`Bearer ${localStorage.getItem('Token')}`,
          "Content-Type": "application/json"
      }
    }).then(result => {
      let d = result.data
      let roll_no = []
      let datas = []
      let mark = []
      let a_mark = []
      let m_mark = []
      d.map(data => {
        roll_no.push(data.roll_no)
        mark.push(data.mark)
        a_mark.push(data.avrg_m)
        m_mark.push(data.high_m)
      })
      datas.push({label: 'Mark obtained',data:mark,backgroundColor: 'rgb(255, 99, 132)'})
      datas.push({label: 'Average Mark',data:a_mark,backgroundColor: 'rgb(54, 162, 235)'})
      datas.push({label: 'Highest Mark',data:m_mark,backgroundColor: 'rgb(75, 192, 192)'})
      let total = {labels:roll_no,datasets:datas}
      setData(total)
    })
    }

  useEffect(() => {
    getFetch()
    setLoad(false)
  },[1])

    
    var options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return (
        <div >
            <Navbar/>
            {load && <Loader />}

            {!load && 
            <>
            <ArrowBackIcon style={{margin:"25px 0px 0px 25px",borderRadius:"50%",background:"white",cursor:"pointer",fontSize:"2.5rem"}} onClick={()=>{window.history.back()}}></ArrowBackIcon>
            <Container maxWidth="md">
            <ReactFontLoader url="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&family=Roboto+Slab:wght@300;400;500&display=swap" />
            <div style={{fontStyle:"Roboto Slab",fontSize:"40px",color:"brown",marginTop:"3%",marginBottom:"5%"}}>
            </div>
            <Bar data={data1} options={options} />
            </Container>
          </>
          }
        </div>
      
      );
}
 
export default Performance;