import React from 'react'
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import DefaultUserPic from "../img/team-male.jpeg";
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar/Navbar'


function Userprofile(props) {
    const submit = () => {
        Swal.fire({
            icon: 'success',
            text: "User Profile Updated"
          })
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
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
            
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
