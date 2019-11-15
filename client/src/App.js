import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";
import ColorList from "./components/ColorList";

function App(props) {
  // sessionStorage.clear();
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute>
          <Route path="/bubblePage" component={BubblePage} />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default connect(state => state)(App);
