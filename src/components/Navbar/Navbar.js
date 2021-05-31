import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import './Navbar.css'
import {useHistory} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react'

function Navigationbar() {
  const [name ,setName] = useState('No Name')
  useEffect(() => {
    setName(localStorage.getItem('Username'))
  },[])
  const history = useHistory();


  const logout = () => {
    localStorage.clear();
    history.push('/');
  }


  return (
        <>
        <Navbar collapseOnSelect className="navbar-bg" variant="dark">
        <Navbar.Brand href="/home"><img src="https://cdn.pixabay.com/photo/2018/08/31/11/17/quiz-3644414_960_720.png" style={{width:"60px"}} alt="quiz-logo"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>  
          <Nav>
          <Button variant="outline-warning" style={{marginRight:"15px"}} href="/start">Demo</Button>
            <Navbar.Text>
              Signed in as: <strong style={{color:"white"}}>{name}</strong>
            </Navbar.Text>
            <NavDropdown alignRight id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigationbar;