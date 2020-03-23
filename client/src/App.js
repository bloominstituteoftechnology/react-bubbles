import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, Link } from 'react-router-dom'
import BubblePage from './components/BubblePage'
import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from './components/PrivateRoute';
import ColorList from './components/ColorList'

function App() {
  return (
    <Router>
      {/* <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/">Bubbles Page</Link>
        </li>
      </ul> */}
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* <Route exact path="/" component={ColorList} /> */}
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <Switch>
          <PrivateRoute exact path='/' component={BubblePage} />
          {/* <Route path='/login' component={Login} /> */}
          {/* <Route component={Login} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
