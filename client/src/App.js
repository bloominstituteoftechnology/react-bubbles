import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import bubbles from './components/BubblePage';
import "./styles.scss";

import axiosWithAuth from './axiosWithAuth';

import PrivateRoute from './components/PrivateRoute';

function App() {

  // useEffect(() => {

  //   axiosWithAuth().post('/api/login', { username: 'Lambda School', password: 'i<3lambd4' }).catch(err => console.log(err)).then(res => console.log(res));

  // });

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path='/login' component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
          
        */}
        <Link to='/protected'>Bubbles!</Link>
        <PrivateRoute path='/protected' component={bubbles} />
      </div>
    </Router>
  );

}

export default App;
