import './App.css';
import React from 'react';
import LoginSignup from './views/login-signup/Login_signup'
import Home from './views/Home page/Home'
import { BrowserRouter,Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
        <Route exact path='/' component={LoginSignup} />
        <Route  path='/home' component={Home} />
      </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
