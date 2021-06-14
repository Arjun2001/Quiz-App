import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2';
import Navbar from '../../components/Navbar/Navbar'
import ReactFontLoader from "react-font-loader";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Loader from '../../components/Quiz Host/Loader';
import axios from 'axios'


const SubjPer = () => {
    const[load,setLoad] = useState(true)
    const [data1, setData] = useState({})
    const id = (window.location.pathname.substring(17))
    const randomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const getFetch = () => {
      axios ({
        method:'post',
        url: `http://35.225.238.45:5000/api/subject_avg/${id}`,
        headers: {
            "Authorization":`Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
        }
      }).then((data1) => {
        
        let d = data1.data.res1
        let roll_no = []
        let mark = []
        let bg = []
        let bor = []
        let datas = []
        
        d.map((data,index) => {
          let st = ""
          let st1 = ""
          roll_no.push(data1.data.names[index].name)
          mark.push(parseInt(data.percentage))
          let a,b,c;
          a = (randomInteger(0,255)).toString()
          b = (randomInteger(0,255)).toString()
          c = (randomInteger(0,255)).toString()
          st += "rgba(" + a + ', ' + b + ', ' + c + ', ' + '0.5' + ')'
          st1 += "rgba(" + a + ', ' + b  + ', ' + c + ', ' + '1' + ')'
          bg.push(st)
          bor.push(st1)
        })
        datas = [{label: '# of Marks',data:mark,backgroundColor:bg,borderColor:bor,borderWidth:1.25}]
        let total = {labels:roll_no,datasets:datas}
        console.log(total)
        setData(total)
      })
    }
    

    useEffect(() => {
      getFetch()
      setLoad(false)
    },[1])

    return ( 
        <div >
            <Navbar/>
            {load && <Loader />}
            {!load &&
    <>
    <br />
    <br />
    <Container maxWidth="sm">
    <Pie data={data1}  /> 
    </Container> 
    </>}
        </div>
     );
}
 
export default SubjPer;