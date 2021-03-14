import React from "react";
import Swal from 'sweetalert2'
import './ForgetPassword.css';

const ResetPassword = () => {

  const changePassword = (e) => {
    e.preventDefault();
    let password = document.getElementById("password").value;
    let cnfpassword = document.getElementById("cnfpassword").value;
    console.log("sfsdfsdfxc", password,cnfpassword)
    document.getElementById("password").value = '';
    document.getElementById("cnfpassword").value = '';
    if (password !== cnfpassword) {
        Swal.fire({
            icon: 'error',
            text: 'Password Mismatch'
          })
    } else {
        Swal.fire({
            icon: 'success',
            text: 'Password Changed'
          })
    }
  }

  return (
      <div>
          <div class="container-center">
        <form>
            <formgroup>
            <input id='password' type="password" name="password"/>
            <label for="email"><br />New Password</label>
            <span>Enter the New Password</span>
            </formgroup>
            <formgroup>
            <input id='cnfpassword' type="password" name="cnfpassword"/>
            <label for="email"><br />Confirm Password</label>
            <span>Confirm The New Password</span>
            </formgroup>
            
        
            <button id="login-btn" onClick={changePassword}>Change Password</button>
        
        
            
        </form>
        
        <p>Did you remember? <a href="/">Sign In</a></p>
        </div>

      </div>
  )
};

export default ResetPassword;