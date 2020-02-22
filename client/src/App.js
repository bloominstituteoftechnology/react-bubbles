import React, { useState } from "react";
import { Route, Link, Switch } from 'react-router-dom';
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles.scss";
import ColorList from "./components/ColorList";
import AddNewColor from "./components/AddNewColor";

function App() {
  return (
    
      <div className="App">
        <Link to="/login">Login</Link>
         <Link to="/protected">Protected Page</Link>
         <Switch>
            <ProtectedRoute exact path ='/protected' component= {BubblePage}  />
            <ProtectedRoute exact path = '/color-list/:id' render ={props => (
              <ColorList {...props} />
            )}/>
            <ProtectedRoute exact path ='/color-list/add' component ={AddNewColor}/>
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
