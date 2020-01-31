import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';

import "./styles.scss";

function App() {
  const token = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  useEffect(() => {
    setLoggedIn(loggedIn === false ? false : true);
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Login} />
          <PrivateRoute exact path = '/bubbles' isLoggedIn = {loggedIn} component = {BubblePage} />
      </div>
    </Router>
  );
}

export default App;
