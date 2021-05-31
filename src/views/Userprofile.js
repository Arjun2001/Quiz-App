import React from 'react'
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import DefaultUserPic from "../img/team-male.jpeg";
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar/Navbar'
import {useHistory} from "react-router-dom"
import axios from 'axios';
import mindImg from '../img/mind.svg';


function Userprofile() {
    const history = useHistory();
    const submit = (e) => {
        e.preventDefault()
        var elements = e.target.form
        var obj ={};
        obj['username'] = elements[0].value
        obj['section'] = elements[1].value
        obj['roll_no'] = localStorage.getItem('Roll_no')
        axios ({
            method:'post',
            url: "http://localhost:5000/api/update_profile",
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                "Content-Type": "application/json"
              },
              data: obj
        })
        .then(res => {
            console.log(res)
        if (res.status === 200) {
            Swal.fire({
            icon: 'success',
            text: res.data
            }).then((response) => {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-success',
                      cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                  })
                  swalWithBootstrapButtons.fire({
                    title: 'Try a Demo Quiz?',
                    imageUrl: mindImg,
                    icon: 'question',
                    imageAlt: 'Custom image',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Try it!',
                    cancelButtonText: 'Skip',
                    reverseButtons: true    
                  }).then((result)=> {
                      if (result.isConfirmed) {
                        history.push('/start')
                      } else {
                        history.push('/home') 
                      }
                  })
            })
        } else {
            Swal.fire({
            icon: 'error',
            text: res.data
            })
        }
        });
    }
    return (
        <div>
            <Navbar />
            <div style={{marginTop:'30px'}}></div>
            <Container>
                    <Row>
                <Col>
                <img src={DefaultUserPic} alt="profils pic" />
                </Col>
                    <Col>
                        <h1>User Profile</h1>
            <Form className="form">     
                <p>{"Update Details"}</p>
            <Form.Group controlId="formCategory1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" />
            
            </Form.Group>
            <Form.Group controlId="formCategory2">
                <Form.Label>Section</Form.Label>
                <Form.Control as="select">
                    <option>Default select</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="formCategory4">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" name="profileImage" onChange={"this.changeProfileImage"}/>
                </Form.Group>
            <Button variant="primary" onClick={submit}>Update Profile</Button>
            </Form>
            </Col>

                </Row>
            </Container>

        </div>
    )
}

export default Userprofile
