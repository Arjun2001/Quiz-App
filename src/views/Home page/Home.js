import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Blog from '../../components/blogs/Blog'
import Subject from '../../components/subject/Subject'
import './Home.css'

import axios from 'axios';

function Home() {

    useEffect(() => {
        try {
            axios ({
                method:'get',
                url: "http://localhost:5000/api/who",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                  }
            }).then(res => {
                localStorage.setItem("Roll_no",res.data.roll_no)
                localStorage.setItem("Role",res.data.role)
            })
        }catch (err) {
            console.log(err);
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className="home-main">
                <div className="left-main"><Subject/></div>
                <div className="right-main"><Blog /></div>
            </div>
            
        </div>
    )
}

export default Home
