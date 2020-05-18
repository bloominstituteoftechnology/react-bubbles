import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BubblePage from './components/BubblePage';
import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <switch>
          <PrivateRoute exact path='/BubblePage' component={BubblePage} />
          <Route path='/Login' component={Login} />
          <Route component={Login} />
        </switch>
      </div>
    </Router>
  );
}

export default App;
