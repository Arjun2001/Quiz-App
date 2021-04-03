import React from "react";
import Swal from 'sweetalert2'
import './ForgetPassword.css';
import axios from 'axios';

const ForgetPassword = () => {

  const sendEmail = (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    document.getElementById("email").value = '';
    axios
      .post('http://localhost:5000/forgotpassword',{email:email})
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            text: res.data
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: res.data
          })
        }
      })
  }

  return (
      <div>
          <div class="container-center">
        <h2>Don't Worry!</h2>
        <form>
            <h4>
            Just provide your email<br /> 
            and we can do the rest
            </h4>
            <formgroup>
            <input id='email' type="text" name="email"/>
            <label for="email"><br />Email</label>
            <span>enter your email</span>
            </formgroup>
            
        
            <button id="login-btn" onClick={sendEmail}>Next</button>
        
        
            
        </form>
        
        <p>Did you remember? <a href="/">Sign In</a></p>
        </div>

      </div>
  )
};

export default ForgetPassword;