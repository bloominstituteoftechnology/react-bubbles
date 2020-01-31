import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import BubblePage from "./components/BubblePage"
import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute'
import "./styles.scss";

function App() {
  console.log()
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/protected" component={BubblePage}/>
        
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
      
    </Router>
    
  );
}

export default App;
