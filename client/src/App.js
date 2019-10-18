import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BubblePage from './components/BubblePage';
import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <PrivateRoute path="/colors" component={BubblePage} />
        <Route path="/" component={Login} />
        <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
