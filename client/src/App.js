import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import BubblePage from './components/BubblePage';


import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>

      <div className="App">
        <Link to="/protected">protected contect</Link>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/protected" component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
