import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <a>
            <Link to="/login">Login</Link>
          </a>
          <a>
            <Link to="/bubbles">Bubbles</Link>
          </a>
        </nav>

        <Switch>
          <PrivateRoute exact path ="/bubbles" component={BubblePage} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} />
          {/* 
            Build a PrivateRoute component that will 
            display BubblePage when you're authenticated 
          */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
