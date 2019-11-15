import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import  PrivateRoute  from './components/PrivateRoute'
import BubblePage from './components/BubblePage'


import Login from "./components/Login";
import "./styles.scss";


function App() {
  return (
    <Router>
      <Switch> 
      <div className="App">
        
        <Link exact to ='/login'>Login Here</Link>
        <Route exact path="/login" component={Login} />
      
        <PrivateRoute>
          <Route path ='/bubbles' component ={BubblePage}/> 
          </PrivateRoute>
        
      </div>
      </Switch> 
    </Router>
  );
}

export default App;
