import React from 'react'
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import DefaultUserPic from "../img/team-male.jpeg";
const axios = require('axios');


function Userprofile(props) {
    return (
        <div>
            <Container>
                    <Row>
                <Col>
                <img src={DefaultUserPic} alt="profils pic" />
                </Col>
                    <Col>
                        <h1>User Profile</h1>
                        <Form className="form">     
                <p>{"this.state.msg"}</p>
            <Form.Group controlId="formCategory1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue={"this.state.username"}/>
            
            </Form.Group>
            <Form.Group controlId="formCategory2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={"this.state.email"} />
            
            </Form.Group>
            
            <Form.Group controlId="formCategory4">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" name="profileImage" onChange={"this.changeProfileImage"}/>
                </Form.Group>
            <Button variant="primary" onClick={"this.UpdateProfileHandler"}>Update Profile</Button>
            </Form>
            </Col>

                </Row>
            </Container>

        </div>
    )
}

export default Userprofile
