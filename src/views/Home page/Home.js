import React,{useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Blog from '../../components/blogs/Blog'
import Subject from '../../components/subject/Subject'
import './Home.css'
import axios from 'axios';
import Swal from 'sweetalert2';

function Home() {

    const summa = async() => {
        try {
            const output = await axios ({
                method:'GET',
                url: "http://localhost:5000/api/name",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                  }
            })
            console.log(output);
            if (output.status === 200) {
                Swal.fire({
                  icon: 'success',
                  text: output.data
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  text: output
                })
              }
        }catch (err) {
            Swal.fire({
                icon: 'error',
                text: err
            })
        }
    }

    useEffect(async() => {
        // let suma = await summa();
    })


    return (
        <div>
            <Navbar />
            <div className="home-main">
                <div className="left-main"><Subject /></div>
                <div className="right-main"><Blog /></div>
            </div>
            
        </div>
    )
}

export default Home
