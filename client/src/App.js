import React, { useState } from "react";
import { Route, Link, Switch } from 'react-router-dom';
import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles.scss";
import ColorList from "./components/ColorList";
import AddNewColor from "./components/AddNewColor";

function App() {
  //  const handleDelete = (props) => {
  //   return (
  //     localStorage.removeItem("token"),
  //     props.history.push("/")
  //   )
  // }
  return (
    
      <div className="App">
       <nav >
         <h1>React Bubbles</h1>
       <div className="nav-links">
         <Link to="/login">Login</Link>
         <Link to="/protected">Protected Page</Link>
         {/* <button onClick={handleDelete}>Log Out</button> */}
       </div>
     
       </nav>
         <Switch>
            <ProtectedRoute exact path ='/protected' component= {BubblePage}  />  
            {/* <ProtectedRoute exact path = '/color-list/:id' render ={props => (
              <ColorList {...props} />
            )}/> */}
            {/* <ProtectedRoute exact path ='/color-list/add' component ={AddNewColor}/> */}
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
