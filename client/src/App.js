import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BubblePage from './components/BubblePage';
import {ProtectedRoute} from './ProtectedRoute';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  useEffect( () => {
    setIsLoggedIn(isLoggedIn === false ? false : true);
  }, []);
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path="/" component={Login} setIsLoggedIn={setIsLoggedIn} />
        <ProtectedRoute exact path="/bubbles"  isLoggedIn={isLoggedIn} component={BubblePage}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
