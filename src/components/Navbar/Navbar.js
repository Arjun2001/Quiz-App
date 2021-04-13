import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import './Navbar.css'
import {useHistory} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';

function Navigationbar() {
  const history = useHistory();

  const name = () => {
    let text = 'Signed in as:' + <strong style={{color:"white"}}>{localStorage.getItem('Roll_no')}</strong>;
    return text;
  }

  const logout = () => {
    localStorage.clear();
    history.push('/');
  }


  return (
        <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/home"><img src={require('../../img/quiz_icon.jpeg').default} style={{width:"50px"}}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>  
          <Nav>
            <Navbar.Text>
              Signed in as: <strong style={{color:"white"}}>{localStorage.getItem('Roll_no')}</strong>
            </Navbar.Text>
            <NavDropdown alignRight title={name} id="basic-nav-dropdown">
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