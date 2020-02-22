import React, { useState } from "react";
import { Route, Link, Switch } from 'react-router-dom';
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles.scss";

function App() {
  return (
    
      <div className="App">
        <Link to="/login">Login</Link>
         <Link to="/protected">Protected Page</Link>
         <Switch>
            <ProtectedRoute exact path ='/protected' component= {BubblePage}/>
            <Route path='/login' component ={Login} />
            <Route component={Login} />
          </Switch>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
  
  );
}

export default App;
