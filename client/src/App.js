import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* PrivateRoute Component: will display private BubblePage or redirect to login page */}
        <Switch>
          <PrivateRoute exact path ="/protected" component={BubblePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
