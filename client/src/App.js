import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/bubble-page'>Bubble Page</Link></li>
        </ul>
         <Route exact path="/login" component={Login} />
         {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute exact path='/bubble-page' component={BubblePage} />        
       </div>
    </Router>
  );
}

export default App;
