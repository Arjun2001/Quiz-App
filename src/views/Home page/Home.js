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
                url: "http://35.225.238.45:5000/api/who",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                  }
            }).then(res => {
                localStorage.setItem("Roll_no",res.data.roll_no)
                localStorage.setItem("Role",res.data.role)
                localStorage.setItem("Username",res.data.username)
                console.log(res.data)
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
