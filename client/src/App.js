import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";

function App() {
  return (
    <>
    <Switch>
    <PrivateRoute excat path="/protected" component={BubblePage} />
    <Route exact path="/" component={Home} /> 
        <Route exact path="/login" component={Login} />
       <Route component={Login} />
       
    </Switch>
    </>
  );
}

export default App;
