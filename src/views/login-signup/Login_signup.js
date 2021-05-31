import React, { useEffect, useState } from 'react'
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import './Login_signup.css'
import firebaseConfig  from '../../firebaseConfig';
import firebase from "firebase/app";
import PhoneOtp from './PhoneOtp'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function Login_signup() {
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

    const history = useHistory();

    const signup = (e) => {
        e.preventDefault();
        var elements = e.target.elements
        var obj ={};
        for(var i = 0 ; i < elements.length ; i++){
            var item = elements.item(i);
            obj[item.name] = item.value;
        }
        // // validation
        // if (obj.roll_no) {
        //     if (obj.roll_no.length !== 6) Swal("Roll Number Is Of 6 Digit");
        // } else { Swal("Roll Number Is Not Provided")}
        // if (obj.dob) {
        //     let now = Date();
        //     now.setHours(0,0,0,0);
        //     if (obj.dob > now) Swal("Invalid Date Of Birth")
        // }else { Swal("Date Of Birth Is Not Provided")}
        // if (obj.phone_no) {
        //     let phoneno = /^\d{10}$/;
        //     if(!(obj.phone_no.match(phoneno))) Swal("Invalid Phone Number");
        // }else {Swal("Phone Number Is Not Provided")}
        // if (obj.email) {
        //     if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(obj.email))) Swal("Invalid Phone Number");
        // }else {Swal("Email Is Not Provided")}
        // if (obj.password) {
        //     if (obj.password.length < 4) Swal("Password Is Of Atleast 4 digits");
        // }else {Swal("Password Is Not Provided")}
        // // validation
        axios
        .post('http://localhost:5000/user/signup',{data:obj})
        .then(res => {
            localStorage.setItem("Token", res.data.token)
            localStorage.setItem("Roll_no", res.data.roll_no)
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            text: res.data.message
          }).then((response) => {
            history.push('/profile')
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: res.data
          })
        }
      })
    }

    const signin = (e) => {
        e.preventDefault();
        var elements = e.target.elements
        var obj ={};
        for(var i = 0 ; i < elements.length ; i++){
            var item = elements.item(i);
            if (item.name === 'rememberMe') {
                obj[item.name] = item.checked;
            } else {
                obj[item.name] = item.value;
            }
        }
        axios
        .post('http://localhost:5000/user/signin',{data:obj})
        .then(res => {
            localStorage.setItem('Token',res.data.token)
            localStorage.setItem('Roll_no',res.data.roll_no)
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            text: res.data.message
          }).then((response) => {
            history.push('/home')
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: res.data
          })
        }
      })
    }

    const forget = () => {
        history.push('/forgot')
    }
    
    const google = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }else {
            firebase.app(); // if already initialized, use that one
         }
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result)
                /** @type {firebase.auth.OAuthCredential} */
                axios
                .post('http://localhost:5000/user/signin',{data:{email :result.user.email}})
                .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        text: res.data
                }).then((response) => {
                    history.push('/home')
                })
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: res.data
                    })
                }
            })
                // var credential = result.credential;
                // var token = credential.accessToken;
                // var user = result.user;
            }).catch((error) => {
                console.log(error)
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // var email = error.email;
                // var credential = error.credential;
            });
        }

    const facebook = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }else {
            firebase.app(); // if already initialized, use that one
        }
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result)
                /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential;
                // var user = result.user;
                // var accessToken = credential.accessToken;
            })
            .catch((error) => {
                console.log(error)
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // var email = error.email;
                // var credential = error.credential;
            });
    }

    useEffect(() => {
        var overlay = document.getElementById("overlay");

        // Buttons to 'switch' the page
        var openSignUpButton = document.getElementById("slide-left-button");
        var openSignInButton = document.getElementById("slide-right-button");

        // The sidebars
        var leftText = document.getElementById("sign-in");
        var rightText = document.getElementById("sign-up");

        // The forms
        var accountForm = document.getElementById("sign-in-info")
        var signinForm = document.getElementById("sign-up-info");

        // Open the Sign Up page
        const openSignUp = () =>{
        // Remove classes so that animations can restart on the next 'switch'
        leftText.classList.remove("overlay-text-left-animation-out");
        overlay.classList.remove("open-sign-in");
        rightText.classList.remove("overlay-text-right-animation");
        // Add classes for animations
        accountForm.className += " form-left-slide-out"
        rightText.className += " overlay-text-right-animation-out";
        overlay.className += " open-sign-up";
        leftText.className += " overlay-text-left-animation";
        // hide the sign up form once it is out of view
        setTimeout(function(){
            accountForm.classList.remove("form-left-slide-in");
            accountForm.style.display = "none";
            accountForm.classList.remove("form-left-slide-out");
        }, 700);
        // display the sign in form once the overlay begins moving right
        setTimeout(function(){
            signinForm.style.display = "flex";
            signinForm.classList += " form-right-slide-in";
        }, 200);
        }

        // Open the Sign In page
        const openSignIn = () =>{
        // Remove classes so that animations can restart on the next 'switch'
        leftText.classList.remove("overlay-text-left-animation");
        overlay.classList.remove("open-sign-up");
        rightText.classList.remove("overlay-text-right-animation-out");
        // Add classes for animations
        signinForm.classList += " form-right-slide-out";
        leftText.className += " overlay-text-left-animation-out";
        overlay.className += " open-sign-in";
        rightText.className += " overlay-text-right-animation";
        // hide the sign in form once it is out of view
        setTimeout(function(){
            signinForm.classList.remove("form-right-slide-in")
            signinForm.style.display = "none";
            signinForm.classList.remove("form-right-slide-out")
        },700);
        // display the sign up form once the overlay begins moving left
        setTimeout(function(){
            accountForm.style.display = "flex";
            accountForm.classList += " form-left-slide-in";
        },200);
        }

        // When a 'switch' button is pressed, switch page
        openSignUpButton.addEventListener("click", openSignUp, false);
        openSignInButton.addEventListener("click", openSignIn, false);
    })
    

    return (
        <div>
            <div className="container1">
            <div className="overlay" id="overlay">
                <div className="sign-in" id="sign-in">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="switch-button" id="slide-right-button">Sign In</button>
                </div>
                <div className="sign-up" id="sign-up">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start a journey with us</p>
                <button className="switch-button" id="slide-left-button">Sign Up</button>
                </div>
            </div>
            <div className="form">
                <div className="sign-in" id="sign-in-info">
                <h1>Sign In</h1>
                <div className="social-media-buttons">
                    <button className="icon" onClick={facebook}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#000000" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
                    </svg>
                    </button>
                    <button className="icon" onClick={google}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#000000" d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z" />
                    </svg>
                    </button>
                    <button className="icon" onClick={handleOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                    </svg>
                    </button>
                </div>
                <p className="small">or use your email account:</p>
                <form id="sign-in-form" onSubmit={signin}>      
                    <input type="text" placeholder="Roll Number" name="roll_no" required/>
                    <input type="password" placeholder="Password" name="password" required/>
                    <div className="checkbox">
                        <input type="checkbox" id="rememberMe" name="rememberMe" /> Remember me
                    </div>
                    <p className="forgot-password" style={{pointer:"cursor"}} onClick={forget}>Forgot your password?</p>
                    <button className="control-button in" type="submit">Sign In</button>
                </form>
                </div>
                <div className="sign-up" id="sign-up-info">
                <h1>Create Account</h1>
                <form id="sign-up-form" onSubmit={signup}>
                    <input type="text" placeholder="Roll Number" name ="roll_no" required size="6"/>
                    <input type="date" name="dob" required max="2021-04-13"/>
                    <input type="number" placeholder="Phone Number" name="phone_no" required pattern="[0-9]{10}"/>
                    <input type="email" placeholder="Email" name="email" required/>
                    <input type="password" placeholder="Password" name="password" required/>
                    <button className="control-button up" type="submit">Sign Up</button>
                </form>
                </div>
            </div>
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
                    <PhoneOtp />
                </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Login_signup
