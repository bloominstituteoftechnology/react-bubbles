import React, { useState } from "react";
import { withRouter, Route } from "react-router-dom";
import { getToken } from './utils/api';
import ProtectedRoute from './components/PrivateRoute';
import Login from "./components/Login";
import Logout from './components/Logout';
import BubblePage from './components/BubblePage';
import Bubbles from './components/Bubbles';
import ColorList from './components/ColorList';

import "./styles.scss";

function App() {
  const signedIn = getToken()

  return (
    <div className="wrapper">
      <div className="App">
        <nav> 
          <Link to='/'>Home</Link>
          {!signedIn && <Link to="/login">Login</Link>}
          {signedIn && <Link to="/logout">Logout</Link>}
          <Link to='/bubblepage'>Bubble Page</Link>
          <Link to='/bubbles'>Bubbles</Link>
          <Link to='/colorlist'>Color List</Link>
        </nav>

        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}

        <PrivateRoute exact path='/bubblepage' component={BubblePage} />
        <PrivateRoute exact path='/bubbles' component={Bubbles} />
        <PrivateRoute exact path='/colorlist' component={ColorList} />
        <PrivateRoute exact path="/logout" component={Logout} />
      </div>
    </div>
  );
}

export default withRouter(App);
