import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <>
    <Switch>
        <Route exact path="/login" component={Login} />
       <Route path="/" component={Home} />
    </Switch>
    </>
  );
}

export default App;
