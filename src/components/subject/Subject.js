import React, {useState, useEffect} from 'react'
import './Subject.css'
import SubCard from './SubCard'
import AddCard from './AddCard'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function Subject(props) {
    const [open, setOpen] = useState(false);
    const [cardData, setCardData] = useState([]);

    const summa = async() => {
        if (props.role === "Student") {}
        try {
            const output = await axios ({
                method:'POST',
                url: "http://localhost:5000/api/courses",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                  }
            })
            return output.data
        }catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function fetchdata() {
            let suma = await summa();
            setCardData(suma);
        }
        fetchdata();
    },[open])

    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      const classes = useStyles();
    const handleOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const formSubmit = async(e) => {
        e.preventDefault();
        var elements = e.target.elements
        var obj ={};
        for(var i = 0 ; i < elements.length ; i++){
            var item = elements.item(i);
            obj[item.name] = item.value;
        }
        try {
            const output =  await axios ({
                method:'POST',
                url: "http://localhost:5000/api/insert_course",
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('Token')}`,
                    "Content-Type": "application/json"
                },
                data : { data : obj },
            })
            if (output.status === 200) {
                Swal.fire({
                  icon: 'success',
                  text: output.data
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  text: output.data
                })
              }
        }catch (err) {
            Swal.fire({
                icon: 'error',
                text: err
            })
        }
        handleClose();
    }

    const fetchCards = () => {
        return (
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {cardData ?cardData.map((item, index) => {
                    return <SubCard 
                    key = {index}
                    code = {item.code}
                    name = {item.name}
                    desc = {item.description}
                    photo = {item.photo}
                    />
                }): <></>}
                {localStorage.getItem('Role')==='Admin'?<AddCard open={handleOpen}/> : <div></div>}
            </div>
        )
    }
    
    return (
        <div className='sub-main'>
            <h3>SUBJECTS</h3>
            <hr></hr>
            <div className="cards">
                {fetchCards()}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                <Form onSubmit={formSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">Course Code</Label>
                        <Input type="text" name="code" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Course Name</Label>
                        <Input type="text" name="name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Course Photo</Label>
                        <Input type="text" name="photo"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Course Description</Label>
                        <Input type="textarea" name="description" />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Subject
