import React, {useState} from 'react'
import './Subject.css'
import SubCard from './SubCard'
import AddCard from './AddCard'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function Subject() {

    const [open, setOpen] = useState(false);

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
    
    return (
        <div className='sub-main'>
            <h3>SUBJECTS</h3>
            <hr></hr>
            <div className="cards">
                <SubCard />
                <AddCard open={handleOpen}/> 
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
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Course Code</Label>
                        <Input type="text" name="course_code" id="exampleEmail" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Course Name</Label>
                        <Input type="text" name="course_name" id="exampleEmail" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Course Photo</Label>
                        <Input type="text" name="course_name" id="exampleEmail"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Course Description</Label>
                        <Input type="text" name="course_name" id="exampleEmail" />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Subject
