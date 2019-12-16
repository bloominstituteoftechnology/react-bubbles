import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';
import BubblePage from './components/BubblePage';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path = "/protected" component={BubblePage}/>
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
