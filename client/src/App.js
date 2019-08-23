import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'

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
        <PrivateRoute path='/bubbles' component={props => <BubblePage {...props} updateColors={updateColors} />} />
      </div>
    </Router>
  );
}

export default App;
