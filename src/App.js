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
import QuizQuestions from './views/QuizQuestions/QuizQuestions';
import QuizDet from './views/QuizDetails/QuizDet';
import Markfetch from './views/QuizDetails/Markfetch';
import Navbar from './components/Navbar/Navbar';
import StartQuiz from './components/Quiz Host/QuizStart/QuizStart';
import Student_join from './components/Student_join/StudentJoin'
import Performance from './views/Performance/Performance'
import SubjPer from './views/Performance/SubjPer';
// import Per1 from './views/Performance/Per1'
import Result from './components/Student_join/Result'

function App() {
  const a="/studData"
  const b="/studPass"
  const d="/studFail"
  const e="/Rollorder"
  const f="/markfetch"
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
        <Route  path='/quiz' component={QuizQuestions} />
        <Route  path='/details/:id'>
        <QuizDet c={a}/>
        </Route>
        <Route  path='/testdetails/:id'>
          <Navbar/>
        <Markfetch c={f}/>
        </Route>
        <Route  path='/quiz/:id' component={QuizQuestions} />
        <Route  path='/start' component={StartQuiz} />
        <Route  path='/join/:id' component={Student_join} />
        <Route  path='/performance/:id'>
        <Performance/>
        </Route>
        <Route  path='/subjperformance'>
        <SubjPer/>
        </Route>
        <Route  path='/stats/:id' component={Result} />

      </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
