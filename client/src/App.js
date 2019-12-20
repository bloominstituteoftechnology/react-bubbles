import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Context from './components/Context'
import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/Private";
import axiosWithAuth from './auth/axiosWithAuth'
import BubblePage from './components/BubblePage'

function App() {
  const addColor = newColor => {
    axiosWithAuth()
      .post('/colors', newColor)
      .then(res => {console.log('res', res)})
      .catch(error => console.log('res', error));
  };
  return (
    <Router>
      <div className="App">
        <Context.Provider value={{addColor}}>
          <Switch>
          <PrivateRoute exact path = '/bubblepage' component = {BubblePage} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
          </Switch>
        </Context.Provider>
      </div>

    </Router>
  );
}

export default App;
