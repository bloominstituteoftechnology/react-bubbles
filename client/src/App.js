import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import axiosWithAuth from './utils/axiosWithAuth';
import styled from 'styled-components'

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute'
import "./styles.scss";

function App() {
  return (
    <>
    <WrapHeadings><h1>Welcome to Tiny Bubbles ... </h1>
      <h3>Log in to update & delete to the colors of your choice.</h3>
      </WrapHeadings>

    <Router>
      <div className="App">
        <Switch>
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}

        <PrivateRoute exact path = '/'component = {Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
