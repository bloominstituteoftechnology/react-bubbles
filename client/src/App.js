import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import  PrivateRoute  from './components/PrivateRoute'
import BubblePage from './components/BubblePage'
import Login from "./components/Login";
import "./styles.scss";


function App() {
  return (
    <Router>
      <div className="App">
        <Link exact to ='/login'>Login Here</Link>
        <Switch>
        <PrivateRoute exact path ='/bubblepage' component ={BubblePage}/>
        <Route exact path="/login" component={Login} />
        </Switch> 
      </div>
    </Router>
  );
}

export default App;
