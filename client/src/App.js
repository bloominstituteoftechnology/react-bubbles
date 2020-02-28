import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Bubbles from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";

function App() {
  return (
    <>
    <Switch>
        <Route exact path="/login" component={Login} />
       <Route path="/" component={Home} />
       <Route path="/protected" component={Bubbles} />
       <PrivateRoute excat path="/protected" />
    </Switch>
    </>
  );
}

export default App;
