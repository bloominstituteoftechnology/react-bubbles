import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {PrivateRoute} from './components/privateRoute';

import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Link to ='/BubblePage'>See Bubbles</Link>
        <PrivateRoute path='/BubblePage' component={BubblePage}/>

      </div>
    </Router>
  );
}

export default App;
