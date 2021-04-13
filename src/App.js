import './App.css';
import React from 'react';
import LoginSignup from './views/login-signup/Login_signup'
import Home from './views/Home page/Home'
import ForgetPassword from './views/Reset password/ForgetPassword'
import ResetPassword from './views/Reset password/ResetPassword'
import Userprofile from './views/Userprofile'
import { BrowserRouter,Route, Switch } from "react-router-dom";
import PrivateRoute from "./Protected";
import Contests from './components/Contests/Contest'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
        <Route exact path='/' component={LoginSignup} />
        <PrivateRoute  path='/home' component={Home} />
        <Route  path='/forgot' component={ForgetPassword} />
        <Route  path='/profile' component={Userprofile} />
        <Route  path='/contest/:id' component={Contests} />
        <Route  path='/reset/:id' component={ResetPassword} />
      </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
