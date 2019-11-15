import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";
import ColorList from "./components/ColorList";

function App(props) {
  console.log(props.data.length);
  // sessionStorage.clear();
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute>
          <Route path="/bubblePage" component={BubblePage} />
          {/* {props.data.length > 0 ? <ColorList /> : null} */}
        </PrivateRoute>
      </Switch>
      {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
    </div>
  );
}

export default connect(state => state)(App);
