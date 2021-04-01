import React from "react";
import { Navbar, Form, FormControl, Nav, NavDropdown,Button } from "react-bootstrap";
import './Navbar.css'
import {useHistory} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

function Navigationbar({active= 'home'}) {
  const history = useHistory();


  return (
        <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/home"><img src={require('../../img/quiz_icon.jpeg').default} style={{width:"50px"}}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/features">Features</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>  
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            <Navbar.Text>
              Signed in as: <a>Mark Otto</a>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigationbar;