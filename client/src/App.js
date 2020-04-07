import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

import BubblePage from './components/BubblePage.js';
import PrivateRoute from './routes/PrivateRoutes.js';

function App() {
  const [colorList, setColorList]=useState([]);

  return (
    <Router>
      <div className="App">
        <Switch>
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
          <PrivateRoute path='/colors' component={BubblePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
