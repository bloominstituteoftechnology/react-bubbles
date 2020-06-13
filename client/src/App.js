import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";

//components
import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import { PrivateRoute } from './components/PrivateRoute'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          {/* 
            Build a PrivateRoute component that will 
            display BubblePage when you're authenticated 
          */}
          <PrivateRoute exact path='/bubblepage' component={BubblePage} />
      
        </Switch>
      </div>
    </Router>
  );
}

export default App;
