import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute.js';
import BubblePage from './components/BubblePage.js';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);


  const updateColors = color => {
    setColorList([...colorList, color])
  }


  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute path='/bubbles' component={props => <BubblePage {...props} updateColors={updateColors}  />} />
      </div>
    </Router>
  );
}

export default App;
