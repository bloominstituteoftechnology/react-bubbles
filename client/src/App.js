import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute'
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import "./styles.scss";

function App() {

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to='/'>Login</Link></li>
          <li><Link to='/bubblepage'>Bubbles</Link></li>
        </ul>
      </nav>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path='/bubblepage' component={BubblePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
